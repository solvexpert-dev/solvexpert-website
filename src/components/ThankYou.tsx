import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, CheckCircle, ArrowLeft } from 'lucide-react';

type LocationState = {
  name?: string;
  email?: string;
  service?: string;
};

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState || {};
  
  const { name = 'there', email = '', service = 'our services' } = state;

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

      {/* Thank You Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-blue-500/20 w-24 h-24 rounded-full flex items-center justify-center mb-8 mx-auto">
              <CheckCircle className="h-12 w-12 text-blue-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Thank You, {name.split(' ')[0]}!
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              We've received your inquiry about <span className="text-blue-400 font-semibold">{service}</span>. Our team will review your information and get back to you within 24 hours.
            </p>
            
            {email && (
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 mb-8">
                <p className="text-gray-300">
                  We've sent a confirmation email to <span className="text-blue-400 font-semibold">{email}</span> with a summary of your request.
                </p>
              </div>
            )}
            
            <div className="space-y-6 mb-12">
              <h2 className="text-2xl font-bold">What happens next?</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
                  <div className="bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-blue-400 font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-bold mb-2 text-center">Initial Review</h3>
                  <p className="text-gray-400 text-sm">
                    Our team will review your business needs and challenges.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
                  <div className="bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-blue-400 font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-bold mb-2 text-center">Strategy Call</h3>
                  <p className="text-gray-400 text-sm">
                    We'll schedule a call to discuss potential AI solutions.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
                  <div className="bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-blue-400 font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-bold mb-2 text-center">Custom Proposal</h3>
                  <p className="text-gray-400 text-sm">
                    You'll receive a tailored solution for your business.
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankYou;