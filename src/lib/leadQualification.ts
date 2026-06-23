export type ServiceInterest =
  | 'WEBSITE_DEVELOPMENT'
  | 'AI_CHATBOT'
  | 'CUSTOM_BUSINESS_SYSTEM'
  | 'RESTAURANT_MANAGEMENT_SYSTEM'
  | 'CLINIC_MANAGEMENT_SYSTEM'
  | 'DASHBOARD_REPORTING'
  | 'AUTOMATION_WORKFLOW'
  | 'NOT_SURE';

export type BudgetValue = 'UNDER_1K' | '1K_5K' | '5K_10K' | '10K_PLUS' | 'NOT_SURE';

export type TimelineValue = 'ASAP' | '2_4_WEEKS' | '1_2_MONTHS' | 'JUST_EXPLORING';

export type LeadPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';

export type LeadUrgency = 'HIGH' | 'MEDIUM' | 'LOW';

export type PreferredContactMethod = 'Phone' | 'WhatsApp' | 'Email';

export interface ServiceOption {
  label: string;
  value: ServiceInterest;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface ServiceQuestion {
  id: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'select';
  options?: SelectOption[];
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  { label: 'Website Development', value: 'WEBSITE_DEVELOPMENT' },
  { label: 'AI Chatbot / Bot', value: 'AI_CHATBOT' },
  { label: 'Custom Business System', value: 'CUSTOM_BUSINESS_SYSTEM' },
  { label: 'Restaurant Management System', value: 'RESTAURANT_MANAGEMENT_SYSTEM' },
  { label: 'Clinic Management System', value: 'CLINIC_MANAGEMENT_SYSTEM' },
  { label: 'Dashboard / Reporting System', value: 'DASHBOARD_REPORTING' },
  { label: 'Automation Workflow', value: 'AUTOMATION_WORKFLOW' },
  { label: 'Not Sure Yet', value: 'NOT_SURE' },
];

export const PAIN_POINT_OPTIONS = [
  'Manual work taking too much time',
  'Repetitive tasks that should be automated',
  'No visibility or automated reporting',
  'Systems do not talk to each other',
  'Losing clients due to slow follow-ups',
  'Staff or team workflow is messy',
  'Data is scattered',
  'Other',
] as const;

export const BUDGET_OPTIONS: { label: string; value: BudgetValue }[] = [
  { label: 'Under £1k', value: 'UNDER_1K' },
  { label: '£1k – £5k', value: '1K_5K' },
  { label: '£5k – £10k', value: '5K_10K' },
  { label: '£10k+', value: '10K_PLUS' },
  { label: 'Not sure yet', value: 'NOT_SURE' },
];

export const TIMELINE_OPTIONS: { label: string; value: TimelineValue }[] = [
  { label: 'ASAP', value: 'ASAP' },
  { label: 'Within 2–4 weeks', value: '2_4_WEEKS' },
  { label: 'Within 1–2 months', value: '1_2_MONTHS' },
  { label: 'Just exploring', value: 'JUST_EXPLORING' },
];

export const CONTACT_METHOD_OPTIONS: PreferredContactMethod[] = [
  'Phone',
  'WhatsApp',
  'Email',
];

const YES_NO: SelectOption[] = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export const SERVICE_QUESTIONS: Record<ServiceInterest, ServiceQuestion[]> = {
  WEBSITE_DEVELOPMENT: [
    { id: 'has_website', label: 'Do you already have a website?', type: 'select', options: YES_NO },
    { id: 'website_type', label: 'What type of website do you need?', type: 'text', placeholder: 'e.g. Business brochure, e-commerce, landing page' },
    { id: 'pages_features', label: 'What pages or features do you need?', type: 'textarea', placeholder: 'List key pages, features, or integrations' },
    { id: 'forms_needed', label: 'Do you need contact forms or booking forms?', type: 'select', options: YES_NO },
  ],
  AI_CHATBOT: [
    { id: 'chatbot_location', label: 'Where will the chatbot be used?', type: 'text', placeholder: 'e.g. Website, WhatsApp, internal support' },
    { id: 'chatbot_help', label: 'What should it help with?', type: 'textarea', placeholder: 'Describe the tasks or questions it should handle' },
    { id: 'collect_leads', label: 'Should it collect leads?', type: 'select', options: YES_NO },
    { id: 'connect_system', label: 'Should it connect to another system?', type: 'text', placeholder: 'e.g. CRM, booking system, or none' },
  ],
  CUSTOM_BUSINESS_SYSTEM: [
    { id: 'process_manage', label: 'What business process do you want to manage?', type: 'textarea' },
    { id: 'system_users', label: 'Who will use the system?', type: 'text', placeholder: 'e.g. Owners, managers, staff' },
    { id: 'data_track', label: 'What data do you need to track?', type: 'textarea' },
    { id: 'reports_needed', label: 'What reports do you need?', type: 'textarea' },
  ],
  RESTAURANT_MANAGEMENT_SYSTEM: [
    { id: 'location_count', label: 'How many locations do you have?', type: 'text' },
    { id: 'sales_tracking', label: 'Do you need sales tracking?', type: 'select', options: YES_NO },
    { id: 'stock_tracking', label: 'Do you need stock tracking?', type: 'select', options: YES_NO },
    { id: 'staff_rota', label: 'Do you need staff or rota tracking?', type: 'select', options: YES_NO },
    { id: 'owner_reports', label: 'Do you need owner reports?', type: 'select', options: YES_NO },
  ],
  CLINIC_MANAGEMENT_SYSTEM: [
    { id: 'patient_records', label: 'Do you need patient records?', type: 'select', options: YES_NO },
    { id: 'appointments', label: 'Do you need appointment tracking?', type: 'select', options: YES_NO },
    { id: 'prescription_history', label: 'Do you need prescription or history tracking?', type: 'select', options: YES_NO },
    { id: 'website_leads', label: 'Do you need website leads connected?', type: 'select', options: YES_NO },
    { id: 'follow_up_automation', label: 'Do you need follow-up automation?', type: 'select', options: YES_NO },
  ],
  DASHBOARD_REPORTING: [
    { id: 'data_to_see', label: 'What data do you want to see?', type: 'textarea' },
    { id: 'data_sources', label: 'Where does the data come from?', type: 'textarea' },
    { id: 'report_access', label: 'Who needs access to reports?', type: 'text' },
    { id: 'report_frequency', label: 'How often do you need reports?', type: 'text', placeholder: 'e.g. Daily, weekly, real-time' },
  ],
  AUTOMATION_WORKFLOW: [
    { id: 'task_automate', label: 'What repetitive task should be automated?', type: 'textarea' },
    { id: 'tools_involved', label: 'What tools or apps are involved?', type: 'textarea' },
    { id: 'automation_trigger', label: 'What should trigger the automation?', type: 'text' },
    { id: 'automation_outcome', label: 'What should happen after automation runs?', type: 'textarea' },
  ],
  NOT_SURE: [
    { id: 'messy_slow', label: 'What is currently messy or slow in your business?', type: 'textarea' },
    { id: 'trying_improve', label: 'What are you trying to improve?', type: 'textarea' },
    { id: 'save_time', label: 'What would save you the most time?', type: 'textarea' },
  ],
};

export interface LeadQualificationInput {
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string | null;
  websiteUrl?: string;
  serviceInterest: ServiceInterest;
  serviceAnswers?: Record<string, string>;
  painPoints?: string[];
  biggestBottleneck: string;
  budget?: BudgetValue;
  timeline?: TimelineValue;
  bookAudit?: boolean;
  preferredContactMethod?: PreferredContactMethod | '';
  timezone?: string;
  additionalMessage?: string;
  automationNeeds?: string[];
}

export function getServiceLabel(value: ServiceInterest): string {
  return SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function getBudgetLabel(value: BudgetValue): string {
  return BUDGET_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function getTimelineLabel(value: TimelineValue): string {
  return TIMELINE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function deriveUrgency(timeline?: TimelineValue): LeadUrgency {
  switch (timeline) {
    case 'ASAP':
      return 'HIGH';
    case '2_4_WEEKS':
    case '1_2_MONTHS':
      return 'MEDIUM';
    case 'JUST_EXPLORING':
      return 'LOW';
    default:
      return 'MEDIUM';
  }
}

export function derivePriority(
  budget?: BudgetValue,
  timeline?: TimelineValue,
  bookAudit = false,
): LeadPriority {
  if (budget === '10K_PLUS' && timeline === 'ASAP') {
    return 'URGENT';
  }

  if (bookAudit && (budget === '5K_10K' || budget === '10K_PLUS')) {
    return 'HIGH';
  }

  if (
    timeline === 'JUST_EXPLORING' &&
    (budget === 'NOT_SURE' || budget === 'UNDER_1K')
  ) {
    return 'LOW';
  }

  return 'MEDIUM';
}

export function serviceAnswersExplainIssue(
  serviceInterest: ServiceInterest,
  serviceAnswers: Record<string, string> = {},
): boolean {
  if (serviceInterest !== 'NOT_SURE') {
    return false;
  }

  const questions = SERVICE_QUESTIONS.NOT_SURE;
  return questions.every((question) => (serviceAnswers[question.id]?.trim().length ?? 0) >= 20);
}

export function formatAutomationNeeds(
  serviceInterest: ServiceInterest,
  serviceAnswers: Record<string, string> = {},
): string[] {
  const questions = SERVICE_QUESTIONS[serviceInterest] ?? [];

  return questions
    .map((question) => {
      const answer = serviceAnswers[question.id]?.trim();
      if (!answer) {
        return null;
      }
      return `${question.label}: ${answer}`;
    })
    .filter((entry): entry is string => Boolean(entry));
}

export function buildLeadMessage(
  input: LeadQualificationInput,
): string | null {
  const sections: string[] = [];
  const serviceLabel = getServiceLabel(input.serviceInterest);

  sections.push(`Service requested: ${serviceLabel}`);

  const answers = formatAutomationNeeds(input.serviceInterest, input.serviceAnswers);
  if (answers.length > 0) {
    sections.push('Service-specific details:');
    sections.push(...answers.map((line) => `- ${line}`));
  }

  if (input.preferredContactMethod) {
    sections.push(`Preferred contact method: ${input.preferredContactMethod}`);
  }

  if (input.additionalMessage?.trim()) {
    sections.push(input.additionalMessage.trim());
  }

  return sections.length > 1 ? sections.join('\n') : sections[0] ?? null;
}

export function buildOsLeadPayload(input: LeadQualificationInput) {
  const automationNeeds =
    input.automationNeeds ??
    formatAutomationNeeds(input.serviceInterest, input.serviceAnswers);
  const urgency = deriveUrgency(input.timeline);
  const priority = derivePriority(input.budget, input.timeline, input.bookAudit ?? false);
  const message = buildLeadMessage(input);

  return {
    full_name: input.fullName,
    company_name: input.companyName?.trim() || null,
    email: input.email,
    phone: input.phone?.trim() || null,
    website_url: input.websiteUrl?.trim() || null,
    source: 'WEBSITE' as const,
    service_interest: input.serviceInterest,
    pain_points: input.painPoints ?? [],
    biggest_bottleneck: input.biggestBottleneck,
    automation_needs: automationNeeds,
    message,
    budget: input.budget ?? null,
    budget_range: input.budget ?? null,
    book_audit: input.bookAudit ?? false,
    urgency,
    priority,
    status: 'NEW' as const,
    timezone: input.timezone?.trim() || null,
  };
}

export function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'GMT';
  }
}

export function runPayloadSelfChecks(): { passed: number; failed: string[] } {
  const failed: string[] = [];

  const scenarios: Array<{ name: string; input: LeadQualificationInput; expectNotSure?: boolean }> = [
    {
      name: 'Website Development',
      input: {
        fullName: 'Test User',
        email: 'web@test.com',
        phone: '+44 7700 900000',
        serviceInterest: 'WEBSITE_DEVELOPMENT',
        serviceAnswers: {
          has_website: 'No',
          website_type: 'Business brochure',
          pages_features: 'Home, services, contact',
          forms_needed: 'Yes',
        },
        painPoints: ['Manual work taking too much time'],
        biggestBottleneck: 'No website and losing leads.',
        budget: '5K_10K',
        timeline: '2_4_WEEKS',
        bookAudit: true,
      },
    },
    {
      name: 'Clinic Management System',
      input: {
        fullName: 'Clinic Owner',
        email: 'clinic@test.com',
        phone: '+44 7700 900001',
        serviceInterest: 'CLINIC_MANAGEMENT_SYSTEM',
        serviceAnswers: {
          patient_records: 'Yes',
          appointments: 'Yes',
          prescription_history: 'Yes',
          website_leads: 'Yes',
          follow_up_automation: 'Yes',
        },
        painPoints: ['Data is scattered'],
        biggestBottleneck: 'Patient data is spread across spreadsheets.',
        budget: '10K_PLUS',
        timeline: 'ASAP',
        bookAudit: false,
      },
    },
    {
      name: 'Restaurant Management System',
      input: {
        fullName: 'Restaurant Owner',
        email: 'restaurant@test.com',
        phone: '+44 7700 900002',
        serviceInterest: 'RESTAURANT_MANAGEMENT_SYSTEM',
        serviceAnswers: {
          location_count: '2',
          sales_tracking: 'Yes',
          stock_tracking: 'Yes',
          staff_rota: 'Yes',
          owner_reports: 'Yes',
        },
        painPoints: ['No visibility or automated reporting'],
        biggestBottleneck: 'End-of-day reporting takes hours.',
        budget: '1K_5K',
        timeline: '1_2_MONTHS',
        bookAudit: true,
      },
    },
    {
      name: 'Custom Business System',
      input: {
        fullName: 'Ops Lead',
        email: 'custom@test.com',
        phone: '+44 7700 900003',
        serviceInterest: 'CUSTOM_BUSINESS_SYSTEM',
        serviceAnswers: {
          process_manage: 'Client onboarding',
          system_users: 'Managers and coordinators',
          data_track: 'Projects, tasks, and billing',
          reports_needed: 'Weekly pipeline and margin reports',
        },
        painPoints: ['Systems do not talk to each other'],
        biggestBottleneck: 'Onboarding is fully manual.',
        budget: '5K_10K',
        timeline: '2_4_WEEKS',
        bookAudit: true,
      },
    },
    {
      name: 'Not Sure Yet',
      input: {
        fullName: 'Exploring Owner',
        email: 'unsure@test.com',
        phone: '+44 7700 900004',
        serviceInterest: 'NOT_SURE',
        serviceAnswers: {
          messy_slow: 'Operations are messy and slow across teams.',
          trying_improve: 'Trying to improve reporting and follow-up speed.',
          save_time: 'Automating repetitive admin would save the most time.',
        },
        painPoints: [],
        biggestBottleneck: 'Too much manual coordination between tools.',
        budget: 'NOT_SURE',
        timeline: 'JUST_EXPLORING',
        bookAudit: false,
      },
      expectNotSure: true,
    },
  ];

  for (const scenario of scenarios) {
    const payload = buildOsLeadPayload(scenario.input);

    if (scenario.expectNotSure) {
      if (payload.service_interest !== 'NOT_SURE') {
        failed.push(`${scenario.name}: expected NOT_SURE service_interest`);
      }
    } else if (payload.service_interest === 'NOT_SURE') {
      failed.push(`${scenario.name}: service_interest should not be NOT_SURE`);
    }

    if (!scenario.expectNotSure && payload.pain_points.length === 0) {
      failed.push(`${scenario.name}: pain_points should be populated`);
    }

    if (!payload.biggest_bottleneck) {
      failed.push(`${scenario.name}: biggest_bottleneck missing`);
    }

    if (payload.automation_needs.length === 0) {
      failed.push(`${scenario.name}: automation_needs missing service answers`);
    }

    if (!payload.budget || !payload.budget_range) {
      failed.push(`${scenario.name}: budget/budget_range missing`);
    }

    if (!payload.urgency || !payload.priority) {
      failed.push(`${scenario.name}: urgency/priority missing`);
    }

    if (payload.source !== 'WEBSITE' || payload.status !== 'NEW') {
      failed.push(`${scenario.name}: source/status incorrect`);
    }
  }

  const urgentPayload = buildOsLeadPayload({
    fullName: 'Urgent Lead',
    email: 'urgent@test.com',
    serviceInterest: 'CLINIC_MANAGEMENT_SYSTEM',
    biggestBottleneck: 'Need this urgently.',
    budget: '10K_PLUS',
    timeline: 'ASAP',
  });

  if (urgentPayload.priority !== 'URGENT' || urgentPayload.urgency !== 'HIGH') {
    failed.push('Priority/urgency rules: expected URGENT/HIGH for 10K+ ASAP');
  }

  return { passed: scenarios.length + 1 - failed.length, failed };
}
