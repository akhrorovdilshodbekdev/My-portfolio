export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: 'automation' | 'web';
  mockType: 'workflow' | 'chat' | 'flow' | 'calendar' | 'restaurant' | 'ecommerce' | 'fitness' | 'waitlist' | 'travel';
  features?: string[];
  impact?: string;
  extendedDescription?: string;
}

export interface Tool {
  name: string;
  category: 'Automation' | 'AI' | 'Chatbots' | 'Frontend' | 'Design' | 'Database' | 'Integration' | 'Development';
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WorkStep {
  number: string;
  title: string;
  description: string;
  iconName: string;
}
