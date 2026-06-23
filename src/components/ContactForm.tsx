import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Brain, ArrowLeft, Loader2 } from 'lucide-react';
import { osLeadsSupabase } from '../lib/osLeadsSupabase';
import {
  SERVICE_OPTIONS,
  buildOsLeadPayload,
  getServiceLabel,
  type ServiceInterest,
} from '../lib/leadQualification';

type FormData = {
  fullName: string;
  email: string;
  companyName: string;
  serviceInterest: ServiceInterest;
  challenges: string;
  additional_info?: string;
};

const ContactForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid },
    trigger,
    watch
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      serviceInterest: 'BUSINESS_WEBSITE',
    },
  });

  const watchedFields = watch();
  
  const goToNextStep = async () => {
    const fieldsToValidate = formStep === 0 
      ? ['fullName', 'email', 'companyName'] 
      : ['serviceInterest', 'challenges'];
    
    const isStepValid = await trigger(fieldsToValidate as (keyof FormData)[]);
    if (isStepValid) setFormStep(formStep + 1);
  };

  const goToPreviousStep = () => {
    setFormStep(formStep - 1);
    setSubmitError(null);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const payload = buildOsLeadPayload({
        fullName: data.fullName,
        companyName: data.companyName,
        email: data.email,
        phone: null,
        serviceInterest: data.serviceInterest,
        painPoints: data.challenges.trim() ? ['Other'] : [],
        biggestBottleneck: data.challenges,
        automationNeeds: [`Selected service: ${getServiceLabel(data.serviceInterest)}`],
        additionalMessage: data.additional_info?.trim(),
        bookAudit: false,
      });

      const { error } = await osLeadsSupabase.from('leads').insert([payload]);
      
      if (error) {
        throw error;
      }
      
      // Navigate to thank you page
      navigate('/thank-you', { 
        state: { 
          name: data.fullName,
          email: data.email,
          service: getServiceLabel(data.serviceInterest),
        } 
      });
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'There was an error submitting your form. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-blue-400 mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">SolveXpert</span>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Get Started with 
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent ml-2">
                  AI Automation
                </span>
              </h1>
              <p className="text-gray-300">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-300"
                  style={{ width: formStep === 0 ? '50%' : '100%' }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span className={formStep >= 0 ? 'text-blue-400 font-medium' : ''}>Basic Information</span>
                <span className={formStep >= 1 ? 'text-blue-400 font-medium' : ''}>Project Details</span>
              </div>
            </div>

            {submitError && (
              <div className="bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-lg mb-6">
                <p>{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              {/* Step 1: Basic Information */}
              {formStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className={`w-full bg-gray-800 border ${errors.fullName ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                      placeholder="John Doe"
                      {...register('fullName', { 
                        required: 'Full name is required' 
                      })}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                      placeholder="john@example.com"
                      {...register('email', { 
                        required: 'Email address is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                      Company Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      className={`w-full bg-gray-800 border ${errors.companyName ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                      placeholder="Acme Inc."
                      {...register('companyName', { 
                        required: 'Company name is required' 
                      })}
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-500">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={!watchedFields.fullName || !watchedFields.email || !watchedFields.companyName}
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {formStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="serviceInterest" className="block text-sm font-medium mb-1">
                      Service of Interest <span className="text-orange-500">*</span>
                    </label>
                    <select
                      id="serviceInterest"
                      className={`w-full bg-gray-800 border ${errors.serviceInterest ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                      {...register('serviceInterest', {
                        required: 'Please select a service',
                      })}
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.serviceInterest && (
                      <p className="mt-1 text-sm text-red-500">{errors.serviceInterest.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="challenges" className="block text-sm font-medium mb-1">
                      What challenges are you looking to address? <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      id="challenges"
                      rows={4}
                      className={`w-full bg-gray-800 border ${errors.challenges ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                      placeholder="Please describe the challenges your business is facing..."
                      {...register('challenges', { 
                        required: 'Please describe your challenges',
                        minLength: {
                          value: 50,
                          message: 'Please provide at least 50 characters'
                        }
                      })}
                    ></textarea>
                    {errors.challenges && (
                      <p className="mt-1 text-sm text-red-500">{errors.challenges.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-400">
                      {watchedFields.challenges?.length || 0}/50 characters minimum
                    </p>
                  </div>

                  <div>
                    <label htmlFor="additional_info" className="block text-sm font-medium mb-1">
                      Additional Information
                    </label>
                    <textarea
                      id="additional_info"
                      rows={3}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="Share any specific requirements or questions..."
                      {...register('additional_info')}
                    ></textarea>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="w-1/2 bg-gray-800 text-white py-3 rounded-md transition-all duration-300 hover:bg-gray-700"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid || (watchedFields.challenges?.length || 0) < 50}
                      className="w-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.7)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                          Submitting...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              <p>By submitting this form, you agree to our <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;