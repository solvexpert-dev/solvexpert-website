import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, ArrowRight, ArrowLeft, Loader2, Check } from 'lucide-react';
import { osLeadsSupabase } from '../lib/osLeadsSupabase';
import {
  BUDGET_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  PAIN_POINT_OPTIONS,
  SERVICE_OPTIONS,
  SERVICE_QUESTIONS,
  TIMELINE_OPTIONS,
  buildOsLeadPayload,
  getBrowserTimezone,
  serviceAnswersExplainIssue,
  type BudgetValue,
  type PreferredContactMethod,
  type ServiceInterest,
  type TimelineValue,
} from '../lib/leadQualification';

interface LeadCaptureFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  serviceInterest: ServiceInterest | '';
  serviceAnswers: Record<string, string>;
  painPoints: string[];
  biggestBottleneck: string;
  budget: BudgetValue | '';
  timeline: TimelineValue | '';
  bookAudit: boolean;
  preferredContactMethod: PreferredContactMethod | '';
  timezone: string;
};

const TOTAL_STEPS = 7;

const defaultValues: FormData = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  websiteUrl: '',
  serviceInterest: '',
  serviceAnswers: {},
  painPoints: [],
  biggestBottleneck: '',
  budget: '',
  timeline: '',
  bookAudit: true,
  preferredContactMethod: '',
  timezone: '',
};

export default function LeadCaptureForm({ isOpen, onClose }: LeadCaptureFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<FormData>({
    defaultValues,
  });

  const selectedService = watch('serviceInterest');
  const serviceQuestions =
    selectedService && selectedService in SERVICE_QUESTIONS
      ? SERVICE_QUESTIONS[selectedService as ServiceInterest]
      : [];

  useEffect(() => {
    if (isOpen) {
      setValue('timezone', getBrowserTimezone());
    }
  }, [isOpen, setValue]);

  const resetForm = () => {
    reset(defaultValues);
    setStep(1);
    setIsSuccess(false);
    setStepError(null);
    setValue('timezone', getBrowserTimezone());
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validatePainPoints = (painPoints: string[], data: FormData): boolean | string => {
    if (painPoints.length > 0) {
      return true;
    }

    if (
      data.serviceInterest === 'NOT_SURE' &&
      serviceAnswersExplainIssue('NOT_SURE', data.serviceAnswers)
    ) {
      return true;
    }

    return 'Select at least one current problem.';
  };

  const nextStep = async () => {
    setStepError(null);
    let isValid = false;

    if (step === 1) {
      isValid = await trigger(['fullName', 'email', 'phone']);
    }

    if (step === 2) {
      isValid = await trigger(['serviceInterest']);
    }

    if (step === 3 && selectedService) {
      const fields = serviceQuestions.map(
        (question) => `serviceAnswers.${question.id}` as `serviceAnswers.${string}`,
      );
      isValid = fields.length > 0 ? await trigger(fields) : true;
    }

    if (step === 4) {
      isValid = await trigger(['painPoints']);
      const painPoints = getValues('painPoints');
      const painCheck = validatePainPoints(painPoints, getValues());
      if (isValid && painCheck !== true) {
        setStepError(typeof painCheck === 'string' ? painCheck : 'Select at least one current problem.');
        return;
      }
    }

    if (step === 5) {
      isValid = await trigger(['biggestBottleneck']);
    }

    if (step === 6) {
      isValid = await trigger(['budget', 'timeline']);
    }

    if (step === 7) {
      isValid = true;
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStepError(null);
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    if (!data.serviceInterest) {
      setStepError('Please select what you need.');
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    setStepError(null);

    try {
      const payload = buildOsLeadPayload({
        fullName: data.fullName,
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
        websiteUrl: data.websiteUrl,
        serviceInterest: data.serviceInterest,
        serviceAnswers: data.serviceAnswers,
        painPoints: data.painPoints,
        biggestBottleneck: data.biggestBottleneck,
        budget: data.budget || undefined,
        timeline: data.timeline || undefined,
        bookAudit: data.bookAudit,
        preferredContactMethod: data.preferredContactMethod,
        timezone: data.timezone || getBrowserTimezone(),
      });

      const { error } = await osLeadsSupabase.from('leads').insert([payload]);
      if (error) throw error;

      setIsSuccess(true);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/90 backdrop-blur-md p-4">
      <div className="bg-surface border border-borderLine w-full max-w-2xl relative shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-borderLine">
          <div className="font-playfair text-xl">
            Custom System <span className="text-gold italic">Audit</span>
          </div>
          <button onClick={handleClose} className="text-muted hover:text-primary transition-colors" type="button">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center h-full">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-gold" />
              </div>
              <h2 className="font-playfair text-3xl mb-4">Request Received.</h2>
              <p className="text-primary/70 mb-8 max-w-md">
                We'll review your operational bottlenecks and reach out within 24 hours to schedule your audit.
              </p>
              <button
                onClick={handleClose}
                className="bg-bg border border-borderLine text-primary px-6 py-3 hover:bg-white/[0.02]"
                type="button"
              >
                Return to site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
              <div className="w-full bg-bg h-1 mb-8">
                <div
                  className="bg-gold h-1 transition-all duration-300"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>

              {stepError && (
                <div className="mb-6 border border-red-500/40 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                  {stepError}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6 flex-1">
                  <h3 className="font-playfair text-2xl mb-2">Basic Details</h3>
                  <p className="text-sm text-primary/60 mb-6">Where should we send your system plan?</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-muted">Full Name *</label>
                      <input
                        {...register('fullName', { required: 'Full name is required' })}
                        className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-muted">Company Name</label>
                      <input
                        {...register('companyName')}
                        className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-muted">Email *</label>
                      <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                        placeholder="john@acme.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-muted">Phone *</label>
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                        placeholder="+44 7700 900000"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-muted">Website URL</label>
                    <input
                      type="url"
                      {...register('websiteUrl')}
                      className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 flex-1">
                  <h3 className="font-playfair text-2xl mb-2">What do you need?</h3>
                  <p className="text-sm text-primary/60 mb-6">Choose the service that best matches what you are looking for.</p>

                  <div className="space-y-3">
                    {SERVICE_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-4 border border-borderLine bg-bg cursor-pointer hover:border-gold/50 transition-colors"
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...register('serviceInterest', { required: 'Please select a service' })}
                          className="accent-gold w-4 h-4"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && selectedService && (
                <div className="space-y-6 flex-1">
                  <h3 className="font-playfair text-2xl mb-2">Service-specific questions</h3>
                  <p className="text-sm text-primary/60 mb-6">
                    Help us understand what you need for {SERVICE_OPTIONS.find((option) => option.value === selectedService)?.label}.
                  </p>

                  <div className="space-y-4">
                    {serviceQuestions.map((question) => (
                      <div key={question.id} className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-muted">{question.label} *</label>
                        {question.type === 'select' ? (
                          <select
                            {...register(`serviceAnswers.${question.id}`, { required: 'This field is required' })}
                            className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                          >
                            <option value="">Select an option...</option>
                            {question.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : question.type === 'textarea' ? (
                          <textarea
                            {...register(`serviceAnswers.${question.id}`, { required: 'This field is required' })}
                            rows={4}
                            className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors resize-none"
                            placeholder={question.placeholder}
                          />
                        ) : (
                          <input
                            {...register(`serviceAnswers.${question.id}`, { required: 'This field is required' })}
                            className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                            placeholder={question.placeholder}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 flex-1">
                  <h3 className="font-playfair text-2xl mb-2">Current Problems</h3>
                  <p className="text-sm text-primary/60 mb-6">
                    Select all the issues currently holding back your growth.
                  </p>

                  <div className="space-y-3">
                    {PAIN_POINT_OPTIONS.map((point) => (
                      <label
                        key={point}
                        className="flex items-center gap-3 p-4 border border-borderLine bg-bg cursor-pointer hover:border-gold/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          value={point}
                          {...register('painPoints')}
                          className="accent-gold w-4 h-4"
                        />
                        <span className="text-sm">{point}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6 flex-1">
                  <h3 className="font-playfair text-2xl mb-2">Biggest Bottleneck</h3>
                  <p className="text-sm text-primary/60 mb-6">
                    In your own words, what is the biggest bottleneck in your business right now?
                  </p>

                  <textarea
                    {...register('biggestBottleneck', { required: 'Please describe your biggest bottleneck' })}
                    rows={6}
                    className="w-full bg-bg border border-borderLine p-4 text-sm focus:border-gold outline-none transition-colors resize-none"
                    placeholder="E.g. We spend 10 hours a week copying data between systems and leads are dropping out because we cannot reply fast enough."
                  />
                </div>
              )}

              {step === 6 && (
                <div className="space-y-8 flex-1">
                  <div>
                    <h3 className="font-playfair text-2xl mb-2">Budget</h3>
                    <p className="text-sm text-primary/60 mb-4">What is your allocated budget for this project?</p>
                    <div className="space-y-3">
                      {BUDGET_OPTIONS.map((budget) => (
                        <label
                          key={budget.value}
                          className="flex items-center gap-3 p-4 border border-borderLine bg-bg cursor-pointer hover:border-gold/50 transition-colors"
                        >
                          <input
                            type="radio"
                            value={budget.value}
                            {...register('budget', { required: 'Please select a budget' })}
                            className="accent-gold w-4 h-4"
                          />
                          <span className="text-sm">{budget.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-playfair text-2xl mb-2">Timeline</h3>
                    <p className="text-sm text-primary/60 mb-4">When do you want to get started?</p>
                    <div className="space-y-3">
                      {TIMELINE_OPTIONS.map((timeline) => (
                        <label
                          key={timeline.value}
                          className="flex items-center gap-3 p-4 border border-borderLine bg-bg cursor-pointer hover:border-gold/50 transition-colors"
                        >
                          <input
                            type="radio"
                            value={timeline.value}
                            {...register('timeline', { required: 'Please select a timeline' })}
                            className="accent-gold w-4 h-4"
                          />
                          <span className="text-sm">{timeline.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-6 flex-1">
                  <h3 className="font-playfair text-2xl mb-2">Book Audit / Submit</h3>
                  <p className="text-sm text-primary/60 mb-6">Final details before we review your request.</p>

                  <label className="flex items-start gap-4 p-6 border border-gold bg-gold/5 cursor-pointer">
                    <input type="checkbox" {...register('bookAudit')} className="accent-gold w-5 h-5 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">Yes, I want to book a free structural audit.</div>
                      <div className="text-sm text-primary/70">
                        A 30-minute intense review mapping out 3 automation systems you can implement immediately.
                      </div>
                    </div>
                  </label>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted">Preferred Contact Method</label>
                    <select
                      {...register('preferredContactMethod')}
                      className="w-full bg-bg border border-borderLine p-4 text-sm focus:border-gold outline-none transition-colors"
                    >
                      <option value="">No preference</option>
                      {CONTACT_METHOD_OPTIONS.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted">Your Timezone</label>
                    <input
                      readOnly
                      {...register('timezone')}
                      className="w-full bg-bg border border-borderLine p-4 text-sm text-primary/70"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-8 mt-8 border-t border-borderLine">
                <button
                  type="button"
                  onClick={step === 1 ? handleClose : prevStep}
                  className="px-6 py-3 border border-transparent hover:border-borderLine text-sm transition-colors text-muted hover:text-primary flex items-center min-h-[44px]"
                >
                  {step === 1 ? 'Cancel' : (
                    <>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </>
                  )}
                </button>

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gold text-[#0A0A0A] font-medium px-8 py-3 hover:brightness-90 transition-colors flex items-center text-sm min-h-[44px]"
                  >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gold text-[#0A0A0A] font-medium px-8 py-3 hover:brightness-90 transition-colors flex items-center text-sm disabled:opacity-50 min-h-[44px]"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Submit Request'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
