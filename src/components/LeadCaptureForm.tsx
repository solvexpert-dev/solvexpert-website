import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, ArrowRight, ArrowLeft, Loader2, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeadCaptureFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  painPoints: string[];
  biggestBottleneck: string;
  automationNeeds: string[];
  budget: string;
  bookAudit: boolean;
  timezone: string;
};

const PAIN_POINTS = [
  'Manual work taking up too much time',
  'Repetitive tasks that should be automated',
  'No visibility or automated reporting',
  'Systems do not talk to each other',
  'Losing clients due to slow follow-ups'
];

const AUTOMATION_NEEDS = [
  'CRM Setup & Sync',
  'Lead Routing & Automation',
  'Email Workflows',
  'Social Media Posting',
  'Inventory / Asset Tracking',
  'AI Chatbot / Support',
  'Other'
];

const BUDGETS = [
  'Under £1k',
  '£1k - £5k',
  '£5k - £10k',
  '£10k+',
  'Not sure yet'
];

export default function LeadCaptureForm({ isOpen, onClose }: LeadCaptureFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      painPoints: [],
      automationNeeds: [],
      bookAudit: true,
      budget: ''
    }
  });

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) isValid = await trigger(['fullName', 'companyName', 'email', 'phone']);
    if (step === 2) isValid = await trigger(['painPoints']);
    if (step === 3) isValid = await trigger(['biggestBottleneck']);
    if (step === 4) isValid = await trigger(['automationNeeds']);
    if (step === 5) isValid = await trigger(['budget']);
    if (step === 6) isValid = await trigger(['timezone']);

    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: data.fullName,
            company_name: data.companyName,
            email: data.email,
            phone: data.phone,
            pain_points: data.painPoints,
            biggest_bottleneck: data.biggestBottleneck,
            automation_needs: data.automationNeeds,
            budget: data.budget,
            book_audit: data.bookAudit,
            timezone: data.timezone,
          }
        ]);

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
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-borderLine">
          <div className="font-playfair text-xl">
            Custom System <span className="text-gold italic">Audit</span>
          </div>
          <button onClick={onClose} className="text-muted hover:text-primary transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
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
                onClick={onClose}
                className="bg-bg border border-borderLine text-primary px-6 py-3 hover:bg-white/[0.02]"
              >
                Return to site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
              
              {/* Progress Bar */}
              <div className="w-full bg-bg h-1 mb-8">
                <div 
                  className="bg-gold h-1 transition-all duration-300"
                  style={{ width: `${(step / 6) * 100}%` }}
                ></div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="font-playfair text-2xl mb-2">Basic Details</h3>
                  <p className="text-sm text-primary/60 mb-6">Where should we send your system plan?</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-muted">Full Name</label>
                      <input 
                        {...register('fullName', { required: true })} 
                        className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-muted">Company Name</label>
                      <input 
                        {...register('companyName', { required: true })} 
                        className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-muted">Email</label>
                      <input 
                        type="email"
                        {...register('email', { required: true })} 
                        className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                        placeholder="john@acme.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-muted">Phone Number</label>
                      <input 
                        {...register('phone', { required: true })} 
                        className="w-full bg-bg border border-borderLine p-3 text-sm focus:border-gold outline-none transition-colors"
                        placeholder="+44 7700 900000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="font-playfair text-2xl mb-2">Operational Pain Points</h3>
                  <p className="text-sm text-primary/60 mb-6">Select all the issues currently holding back your growth.</p>
                  
                  <div className="space-y-3">
                    {PAIN_POINTS.map((point) => (
                      <label key={point} className="flex items-center gap-3 p-4 border border-borderLine bg-bg cursor-pointer hover:border-gold/50 transition-colors">
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

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="font-playfair text-2xl mb-2">The Bottleneck</h3>
                  <p className="text-sm text-primary/60 mb-6">In your own words, what is the single biggest bottleneck in your business right now?</p>
                  
                  <textarea 
                    {...register('biggestBottleneck', { required: true })}
                    rows={6}
                    className="w-full bg-bg border border-borderLine p-4 text-sm focus:border-gold outline-none transition-colors resize-none"
                    placeholder="E.g. We spend 10 hours a week just copying data from emails into our CRM, and leads are dropping out because we can't reply fast enough..."
                  ></textarea>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="font-playfair text-2xl mb-2">Automation Needs</h3>
                  <p className="text-sm text-primary/60 mb-6">What specific systems do you feel you need built?</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {AUTOMATION_NEEDS.map((need) => (
                      <label key={need} className="flex items-center gap-3 p-4 border border-borderLine bg-bg cursor-pointer hover:border-gold/50 transition-colors">
                        <input 
                          type="checkbox" 
                          value={need}
                          {...register('automationNeeds')}
                          className="accent-gold w-4 h-4"
                        />
                        <span className="text-sm">{need}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {step === 5 && (
                <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="font-playfair text-2xl mb-2">Project Budget</h3>
                  <p className="text-sm text-primary/60 mb-6">Custom infrastructure requires investment. What is your allocated budget for this project?</p>
                  
                  <div className="space-y-3">
                    {BUDGETS.map((budget) => (
                      <label key={budget} className="flex items-center gap-3 p-4 border border-borderLine bg-bg cursor-pointer hover:border-gold/50 transition-colors">
                        <input 
                          type="radio" 
                          value={budget}
                          {...register('budget', { required: true })}
                          className="accent-gold w-4 h-4"
                        />
                        <span className="text-sm">{budget}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6 */}
              {step === 6 && (
                <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="font-playfair text-2xl mb-2">Final Step</h3>
                  <p className="text-sm text-primary/60 mb-6">Let's get your audit scheduled.</p>
                  
                  <div className="space-y-6">
                    <label className="flex items-start gap-4 p-6 border border-gold bg-gold/5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        {...register('bookAudit')}
                        className="accent-gold w-5 h-5 mt-0.5"
                      />
                      <div>
                        <div className="font-medium mb-1">Yes, I want to book a free structural audit.</div>
                        <div className="text-sm text-primary/70">A 30-minute intense review mapping out 3 automation systems you can implement immediately.</div>
                      </div>
                    </label>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted">Your Timezone</label>
                      <select 
                        {...register('timezone', { required: true })}
                        className="w-full bg-bg border border-borderLine p-4 text-sm focus:border-gold outline-none transition-colors appearance-none"
                      >
                        <option value="">Select your timezone...</option>
                        <option value="GMT">GMT (UK)</option>
                        <option value="EST">EST (US East)</option>
                        <option value="CST">CST (US Central)</option>
                        <option value="PST">PST (US West)</option>
                        <option value="CET">CET (Europe)</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="flex justify-between items-center pt-8 mt-8 border-t border-borderLine">
                <button 
                  type="button" 
                  onClick={step === 1 ? onClose : prevStep}
                  className="px-6 py-3 border border-transparent hover:border-borderLine text-sm transition-colors text-muted hover:text-primary flex items-center"
                >
                  {step === 1 ? 'Cancel' : <><ArrowLeft className="w-4 h-4 mr-2" /> Back</>}
                </button>
                
                {step < 6 ? (
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="bg-gold text-[#0A0A0A] font-medium px-8 py-3 hover:brightness-90 transition-colors flex items-center text-sm"
                  >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gold text-[#0A0A0A] font-medium px-8 py-3 hover:brightness-90 transition-colors flex items-center text-sm disabled:opacity-50"
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
