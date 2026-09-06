export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  /** Which icon/visual the card uses. Kept narrow to values actually present in data. */
  mockType: 'workflow' | 'flow' | 'calendar';
  features?: string[];
  impact?: string;
  extendedDescription?: string;
}

export interface Tool {
  name: string;
  category: 'Automation' | 'AI' | 'Frontend' | 'Design' | 'Database' | 'Integration' | 'Development';
  /** Brand mark key into brandLogos.ts ('htmlcss' composite, 'generic' fallback). */
  brand: string;
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

export interface RealProject {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  bullets: string[];
  tech: string[];
  /** Optional single image. When `screens` is set, that gallery replaces this image. */
  image?: string;
  imageAlt?: string;
  /** Optional short honest tag rendered over the image (e.g. "Shown with client's permission"). */
  imageTag?: string;
  /** Optional store-style phone screenshots. When present they replace `image` and render as a clickable gallery. */
  screens?: { src: string; alt: string; caption?: string }[];
  links: { label: string; href: string; external: boolean }[];
}
