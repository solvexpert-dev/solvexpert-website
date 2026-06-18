import React, { useState, type ButtonHTMLAttributes } from 'react';
import LeadCaptureForm from './components/LeadCaptureForm';
import ContactForm from './components/ContactForm';
import ThankYou from './components/ThankYou';
import { Routes, Route } from 'react-router-dom';
import { Check, X, ArrowRight, BarChart3, Database, Repeat, Layers, Clock } from 'lucide-react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button = ({ children, className = '', ...props }: ButtonProps) => (
  <button 
    {...props}
    className={`bg-gold text-[#0A0A0A] font-dmsans font-medium px-6 py-3 rounded-none hover:brightness-90 transition-all ${className}`}
  >
    {children}
  </button>
);

const SectionLabel = ({ text }: { text: string }) => (
  <h2 className="uppercase text-muted text-sm font-dmsans font-medium tracking-widest mb-12">
    {text}
  </h2>
);

function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="bg-bg text-primary min-h-screen">
      <LeadCaptureForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      
      {/* 1. Navigation */}
      <nav className="border-b border-borderLine py-6 px-4 md:px-12 flex justify-between items-center sticky top-0 bg-bg/90 backdrop-blur-md z-50" aria-label="Main Navigation">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 50" height="40" role="img" aria-label="SolveXpert Logo">
          <title>SolveXpert</title>
          <text x="0" y="40" fontFamily="'Playfair Display', serif" fontSize="42" fontWeight="400" letterSpacing="0" xmlSpace="preserve">
            <tspan fill="#F5F0E8">SOLVE</tspan>
            <tspan fill="#C9A84C">X</tspan>
            <tspan fill="#F5F0E8">PERT</tspan>
          </text>
        </svg>
        <div className="hidden md:flex space-x-8 text-sm font-dmsans font-medium text-muted">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#work" className="hover:text-primary transition-colors">Work</a>
          <a href="#process" className="hover:text-primary transition-colors">Process</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="hidden md:block">Book Free Audit</Button>
      </nav>

      {/* 2. Hero Section */}
      <main>
      <section className="py-24 px-4 md:px-12 max-w-[1600px] mx-auto hero-grid gap-16 items-center">
        <div className="flex flex-col space-y-8 pr-0 md:pr-12">
          <div className="flex items-center text-sm font-dmsans font-medium uppercase tracking-widest text-muted">
            <span className="w-8 h-[1px] bg-gold mr-4 block"></span>
            Operational Systems
          </div>
          
          <h1 className="text-5xl md:text-7xl leading-[1.1]">
            Your agency runs on gut feel. It should run on <span className="text-gold italic">systems.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary/80 max-w-xl font-light leading-relaxed">
            We map your operations, identify inefficiencies, and eliminate manual work — so your business runs without constant input from you.
          </p>
          
          <div className="border-l-2 border-gold bg-gold/5 p-6 font-dmsans text-primary/90">
            If your team is spending hours every week on work that should be automated — this is for you.
          </div>
          
          <div className="flex flex-wrap gap-3">
            {['Save 10–20 hours per week', 'Systems deployed in weeks, not months', 'Immediate reduction in manual workload'].map((pill, i) => (
              <span key={i} className="text-xs border border-borderLine px-4 py-2 text-muted font-medium bg-surface">
                {pill}
              </span>
            ))}
          </div>
          
          <div className="pt-4 flex flex-col items-start gap-4">
            <Button onClick={() => setIsFormOpen(true)} className="text-lg px-8 flex items-center">
              Get Your Custom System Plan <ArrowRight className="ml-2 h-5 w-5 text-[#0A0A0A]" />
            </Button>
            <div className="text-sm text-muted">
              Includes 3 automation opportunities tailored specifically to your business.
            </div>
            <div className="text-sm font-medium text-gold/80 italic flex items-center">
              <span className="mr-2">→</span> We only onboard a small number of clients each month
            </div>
          </div>
        </div>
        
        {/* Dashboard Mockup UI */}
        <div className="hidden md:block w-full bg-surface border border-borderLine p-8 flex flex-col space-y-8 shadow-2xl relative overflow-hidden group">
          {/* Faint grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwem0zOSAzOWgtMzh2LTM4aDM4djM4eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>
          
          <div className="border-b border-borderLine pb-4 flex justify-between items-center relative z-10">
            <div className="font-dmsans text-sm font-medium uppercase tracking-widest">Operational Overview</div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-borderLine"></div>
              <div className="w-2 h-2 rounded-full bg-borderLine"></div>
              <div className="w-2 h-2 rounded-full bg-borderLine"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 relative z-10">
            <div className="p-4 border border-borderLine bg-bg">
              <div className="text-xs text-muted mb-2 uppercase">Revenue</div>
              <div className="text-2xl font-playfair mb-1 flex items-end gap-2">£84k <span className="text-xs text-green-500 font-sans pb-1 mb-0.5">↑ 12%</span></div>
            </div>
            <div className="p-4 border border-borderLine bg-bg">
              <div className="text-xs text-muted mb-2 uppercase">Active Clients</div>
              <div className="text-2xl font-playfair mb-1">23</div>
            </div>
            <div className="p-4 border border-borderLine bg-bg relative">
              <div className="text-xs text-muted mb-2 uppercase">Churn Risk</div>
              <div className="text-2xl font-playfair mb-1">2</div>
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            </div>
          </div>
          
          <div className="h-40 border border-borderLine bg-bg p-4 flex items-end space-x-4 relative z-10">
            {[40, 65, 45, 80, 50, 95].map((height, i, arr) => (
              <div 
                key={i} 
                className={`flex-1 ${i === arr.length - 1 ? 'bg-gold' : 'bg-surface border border-borderLine'} transition-all duration-1000 group-hover:h-[${height}%]`}
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          
          <div className="flex gap-2 relative z-10">
            {['Lead Routing', 'Onboarding', 'Reporting', 'Retention'].map((tag, i) => (
              <div key={i} className="text-xs bg-bg border border-borderLine px-2 py-1 text-muted">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trust Strip */}
      <section className="border-y border-borderLine bg-surface">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[1fr_auto_2fr_auto_1fr] items-center gap-8 md:gap-12">
          <div className="uppercase text-sm text-muted font-medium tracking-widest text-center md:text-left">
            Built for operators,<br />not beginners
          </div>
          
          <div className="hidden md:block w-[1px] h-16 bg-borderLine"></div>
          
          <div className="font-playfair text-xl md:text-2xl text-primary/90 italic text-center md:text-left leading-relaxed">
            "Went from spending hours on manual updates to having everything tracked and automated."
            <span className="block not-italic font-dmsans text-sm font-medium text-muted mt-4 uppercase tracking-widest">
              — Operations Manager, Tops Pizza Rugby
            </span>
          </div>

          <div className="hidden md:block w-[1px] h-16 bg-borderLine"></div>

          <div className="flex justify-center md:justify-end gap-12">
            <div>
              <div className="font-playfair text-5xl mb-2">15+</div>
              <div className="text-xs uppercase tracking-widest text-muted">Hours saved / wk</div>
            </div>
            <div>
              <div className="font-playfair text-5xl mb-2">70%</div>
              <div className="text-xs uppercase tracking-widest text-muted">Less manual work</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Problem Section */}
      <section id="services" className="py-24 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto">
        <SectionLabel text="The Problem" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <div className="flex flex-col space-y-10">
            <h2 className="text-4xl md:text-5xl leading-tight">
              Growth shouldn't create <span className="text-gold italic">chaos.</span>
            </h2>
            <div className="space-y-6 text-primary/70 leading-relaxed font-light text-lg">
              <p>As your agency scales, the sheer volume of operational tasks scales linearly with it. More clients means more Slack messages, more spreadsheet updates, more disconnected tools.</p>
              <p>Eventually, the founders become the bottleneck. Every process relies on human memory and manual data entry, creating a fragile system ready to break under pressure.</p>
            </div>
            <div className="border-l-2 border-gold pl-8 py-2 text-xl font-playfair italic leading-relaxed text-primary/90 my-4">
              "No more chasing updates. No more things slipping through the cracks. No more relying on memory to run your business."
            </div>
            <div className="text-lg font-medium text-primary">
              This isn't a people problem. It's a systems problem.
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            {[
              { num: '01', title: 'No single source of truth', desc: 'Data is scattered across CRMs, spreadsheets, and Slack threads.' },
              { num: '02', title: 'Manual reporting eating your week', desc: 'Hours wasted aggregating data instead of making decisions.' },
              { num: '03', title: 'Leads falling through the cracks', desc: 'Delayed response times because routing isn\'t automated.' },
              { num: '04', title: 'Founders doing operational work', desc: 'You are working IN the business, rather than ON the business.' }
            ].map((pain, i) => (
              <div key={i} className="flex gap-6 border-t border-borderLine pt-8">
                <div className="text-muted font-dmsans text-sm font-medium">{pain.num}</div>
                <div>
                  <h3 className="font-playfair text-2xl mb-3">{pain.title}</h3>
                  <p className="text-primary/60 font-light">{pain.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Solution Section */}
      <section className="py-24 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto border-t border-borderLine">
        <SectionLabel text="The Solution" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <div className="flex flex-col space-y-10">
            <h2 className="text-4xl md:text-5xl leading-tight">
              We replace manual work with systems that <span className="text-gold italic">scale.</span>
            </h2>
            <p className="text-lg text-primary/80 font-medium">
              Built for operators and teams scaling beyond manual workflows — where efficiency directly impacts revenue.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-primary/70">
                <X className="text-muted w-5 h-5 flex-shrink-0" />
                <span>Not another SaaS tool you have to learn</span>
              </div>
              <div className="flex items-center gap-4 text-primary/70">
                <X className="text-muted w-5 h-5 flex-shrink-0" />
                <span>Not a 40-page strategy document</span>
              </div>
              <div className="flex items-center gap-4 text-primary/70">
                <X className="text-muted w-5 h-5 flex-shrink-0" />
                <span>Not a generic Notion template</span>
              </div>
            </div>

            <div className="pt-4 text-primary font-medium text-lg">
              We build custom infrastructure that runs silently in the background, connecting your existing tools.
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {[
              { icon: <Repeat className="w-5 h-5" />, title: 'Instant lead capture and routing' },
              { icon: <Layers className="w-5 h-5" />, title: 'Automated client onboarding' },
              { icon: <BarChart3 className="w-5 h-5" />, title: 'Real-time performance dashboards' },
              { icon: <Database className="w-5 h-5" />, title: 'Centralised data and reporting' },
              { icon: <Clock className="w-5 h-5" />, title: 'Workflow automation end to end' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-6 border border-borderLine bg-surface hover:bg-white/[0.02] transition-colors">
                <div className="p-3 bg-bg border border-borderLine flex-shrink-0">
                  {React.cloneElement(item.icon as React.ReactElement, { 'aria-hidden': 'true' })}
                </div>
                <div className="font-playfair text-xl">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Process Section */}
      <section id="process" className="py-24 md:py-32 border-t border-borderLine bg-bg">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 overflow-hidden">
          <SectionLabel text="How It Works" />
          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-borderLine">
            {[
              { num: '01', title: 'Operational Audit', desc: 'We map your exact workflows and find the bottlenecks draining time and margin.' },
              { num: '02', title: 'System Design', desc: 'We architect a custom backend using APIs, webhooks, and automation platforms.' },
              { num: '03', title: 'Build & Integration', desc: 'We build the infrastructure and plug it directly into the tools you already use.' },
              { num: '04', title: 'Continuous Optimisation', desc: 'We don\'t just deploy. We monitor, refine, and scale the system as you grow.' }
            ].map((step, i) => (
              <div key={i} className={`p-8 md:p-12 relative ${i !== 3 ? 'md:border-r border-borderLine' : ''} border-b md:border-b-0 border-borderLine`}>
                <div className="absolute top-4 right-6 text-8xl font-playfair text-white/[0.03] select-none z-0">
                  {step.num}
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between space-y-12">
                  <div className="uppercase tracking-widest text-xs font-medium text-gold">Phase {step.num}</div>
                  <div>
                    <h3 className="font-playfair text-2xl mb-4">{step.title}</h3>
                    <p className="text-primary/60 font-light text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Case Study Section */}
      <section id="work" className="py-24 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto">
        <SectionLabel text="Client Work" />
        <div className="bg-surface border border-borderLine p-8 md:p-16">
          <div className="flex flex-col space-y-12">
            <div className="text-sm uppercase tracking-widest text-muted font-medium">
              Hospitality Operations — Rugby, UK
            </div>
            
            <h2 className="text-3xl md:text-5xl leading-tight max-w-4xl font-playfair">
              Saved 15+ hours per week and reduced manual workload by <span className="text-gold italic">70%</span> — in under four weeks.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-borderLine">
              <p className="text-primary/70 font-light leading-relaxed text-lg">
                Tops Pizza Rugby was heavily reliant on manual data entry for daily operations, stock tracking, and staff management. The management team spent countless hours consolidating information across disparate sources, leading to delayed reporting, data fragmentation, and administrative burnout. We stepped in to overhaul their entire data infrastructure.
              </p>
              
              <div className="flex flex-col space-y-6">
                {[
                  'Automated daily KPI extraction and routing',
                  'Built a centralised real-time database replacing 10+ spreadsheets',
                  'Implemented automated shifts and performance tracking',
                  'Removed the necessity for manual end-of-day reconciliation'
                ].map((outcome, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-gold mt-1 flex-shrink-0">→</span>
                    <span className="text-primary/90 font-light">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-borderLine">
              <div>
                <div className="font-playfair text-5xl mb-2">70%</div>
                <div className="text-sm uppercase tracking-widest text-muted">Workload Reduction</div>
              </div>
              <div>
                <div className="font-playfair text-5xl mb-2">15+</div>
                <div className="text-sm uppercase tracking-widest text-muted">Weekly Hrs Saved</div>
              </div>
              <div>
                <div className="font-playfair text-5xl mb-2">28</div>
                <div className="text-sm uppercase tracking-widest text-muted">Days to deployment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Who This Is For */}
      <section className="py-24 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto border-t border-borderLine">
        <SectionLabel text="Who This Is For" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-borderLine">
          <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-borderLine bg-surface/30">
            <h3 className="font-playfair text-3xl mb-12">This is for you if —</h3>
            <div className="space-y-6">
              {[
                'Your team spends multiple hours a week doing copy-paste tasks.',
                'You manage leads or clients manually via spreadsheets or scattered emails.',
                'You lack a clear, automated dashboard showing your core KPIs.',
                'Your business relies on "just remembering" to do certain operational tasks.',
                'You are ready to invest in heavy-duty infrastructure to scale.'
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <Check className="w-6 h-6 text-green-500 flex-shrink-0" aria-hidden="true" />
                  <span className="text-primary/80 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-8 md:p-16 bg-surface/10">
            <h3 className="font-playfair text-3xl mb-12">This is NOT for you if —</h3>
            <div className="space-y-6">
              {[
                'You are just starting out and have no validated processes yet.',
                'You want a generic "AI Chatbot" widget for your website.',
                'You prefer throwing cheap human labor at problems instead of building systems.',
                'You don\'t have a clear idea of what your actual bottlenecks are.',
                'You are looking for cheap, templated quick-fixes.'
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <X className="w-6 h-6 text-red-500 flex-shrink-0" aria-hidden="true" />
                  <span className="text-primary/80 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Offer Section */}
      <section className="py-24 md:py-32 px-4 md:px-12 bg-[#111]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="flex flex-col space-y-6">
            <div className="uppercase text-gold font-medium tracking-widest text-sm mb-4">Free Automation Audit</div>
            <h2 className="text-4xl md:text-6xl leading-tight mb-4">
              See exactly where your operations are <span className="text-gold italic">leaking.</span>
            </h2>
            <p className="text-lg text-primary/70 font-light leading-relaxed">
              We don't do hard sales pitches. When you book an audit, we jump on an intense 30-minute structural review of how your business manages data, clients, and internal tasks.
            </p>
            <p className="text-lg text-primary/70 font-light leading-relaxed">
              We map the inefficiencies live and show you the precise systems needed to automate them. You walk away with clarity, whether you hire us or not.
            </p>
            
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2 border border-borderLine px-4 py-2 bg-bg text-sm text-muted">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> 100% Free
              </div>
              <div className="flex items-center gap-2 border border-borderLine px-4 py-2 bg-bg text-sm text-muted">
                <span className="w-2 h-2 rounded-full bg-gold"></span> Actionable Blueprint
              </div>
            </div>
          </div>
          
          <div className="bg-bg border border-borderLine p-8 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-bg via-gold/50 to-bg"></div>
            
            <h3 className="font-playfair text-2xl mb-8">What happens after you book:</h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-6 relative">
                <div className="w-[1px] h-full bg-borderLine absolute left-4 top-10"></div>
                <div className="w-8 h-8 rounded-full border border-gold bg-bg flex items-center justify-center text-gold font-medium text-sm flex-shrink-0 relative z-10">1</div>
                <div>
                  <div className="font-medium text-primary mb-1">Fill out the intake form</div>
                  <div className="text-sm text-primary/60 font-light">Takes 60 seconds. We review your tech stack before the call.</div>
                </div>
              </div>
              
              <div className="flex gap-6 relative">
                <div className="w-[1px] h-full bg-borderLine absolute left-4 top-10"></div>
                <div className="w-8 h-8 rounded-full border border-borderLine bg-surface flex items-center justify-center text-muted font-medium text-sm flex-shrink-0 relative z-10">2</div>
                <div>
                  <div className="font-medium text-primary mb-1">The 30-Minute structural review</div>
                  <div className="text-sm text-primary/60 font-light">We identify 3 major automation leverage points live.</div>
                </div>
              </div>
              
              <div className="flex gap-6 relative">
                <div className="w-8 h-8 rounded-full border border-borderLine bg-surface flex items-center justify-center text-muted font-medium text-sm flex-shrink-0 relative z-10">3</div>
                <div>
                  <div className="font-medium text-primary mb-1">Receive your execution plan</div>
                  <div className="text-sm text-primary/60 font-light">A clear roadmap to drastically reduce manual labor.</div>
                </div>
              </div>
            </div>
            
            <Button onClick={() => setIsFormOpen(true)} className="w-full flex items-center justify-center py-4 text-sm md:text-base">
              Get Your Custom System Plan — 3 Automation Opportunities <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="text-center mt-6 text-xs font-medium text-gold/80 italic">
              → We limit audits to 5 per week to ensure quality.
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section id="faq" className="py-24 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto border-t border-borderLine">
        <SectionLabel text="Common Questions" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {[
            { q: 'Will this work for my business?', a: 'If your business relies on transferring data between systems, repetitive client onboarding, manual lead routing, or complex reporting across spreadsheets — yes. We build systems uniquely mapped to your operations.' },
            { q: 'Do I need technical knowledge?', a: 'None at all. We architect, build, and deploy the entire backend. You and your team just log into a simplified, unified interface while the heavy lifting happens automatically in the background.' },
            { q: 'How long does it take?', a: 'Most core operational systems are mapped, built, and fully integrated within 3 to 4 weeks. We focus on velocity and immediate ROI, preferring to ship robust foundational systems quickly rather than engaging in 6-month consulting bloat.' },
            { q: 'What does it cost?', a: 'Pricing is bespoke based on the complexity of the infrastructure required. However, clients typically start seeing a return through time saved and efficiency gains within the first month of deployment.' }
          ].map((faq, i) => (
            <div key={i} className="border-t border-borderLine pt-8">
              <h3 className="font-playfair text-2xl mb-4">{faq.q}</h3>
              <p className="text-primary/70 font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-32 md:py-48 px-4 border-t border-borderLine bg-surface text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl mb-8 leading-tight">
            Stop managing <span className="text-gold italic">chaos.</span><br />
            Start running systems.
          </h2>
          <p className="text-xl text-primary/60 font-light mb-12 max-w-xl">
            Scale your agency without scaling your operational headaches. Reclaim your time and eliminate bottlenecks once and for all.
          </p>
          <Button onClick={() => setIsFormOpen(true)} className="text-lg px-12 py-4 flex items-center">
            Get Your Custom System Plan <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <div className="text-sm font-medium text-gold/80 italic mt-6">
            → Only a few spots open for new integrations this month.
          </div>
        </div>
      </section>
      </main>

      {/* 12. Footer */}
      <footer className="border-t border-borderLine bg-bg py-12 px-4 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 50" height="40" role="img" aria-label="SolveXpert Logo">
            <title>SolveXpert</title>
            <text x="0" y="40" fontFamily="'Playfair Display', serif" fontSize="42" fontWeight="400" letterSpacing="0" xmlSpace="preserve">
              <tspan fill="#F5F0E8">SOLVE</tspan>
              <tspan fill="#C9A84C">X</tspan>
              <tspan fill="#F5F0E8">PERT</tspan>
            </text>
          </svg>
          <div className="text-sm text-muted font-light text-center md:text-right">
            solvexpert.co.uk · Rugby, UK · Operational systems for modern businesses.
          </div>
        </div>
      </footer>
      
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;