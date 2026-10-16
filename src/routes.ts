/**
 * Single source of truth for every URL on the site.
 *
 * Consumed by three things that must never disagree:
 *   1. the client app  (src/App.tsx)
 *   2. the prerender script (scripts/prerender.mjs) — injects <title> / description
 *   3. the sitemap
 *
 * Keep this file free of JSX so it can be imported from a plain Node context.
 */

export const SITE_ORIGIN = 'https://akhrorov.com';

export type RouteKey = 'home' | 'automations' | 'websites' | 'work' | 'roi' | 'contact';

export interface RouteMeta {
  /** Path without a trailing slash; '/' for the homepage. */
  path: string;
  key: RouteKey;
  /** <title> for this URL. */
  title: string;
  /** <meta name="description"> for this URL. */
  description: string;
  /** Whether Google should list this in the sitemap. */
  inSitemap: boolean;
  /** Lowest priority last — used for sitemap generation. */
  priority: string;
}

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    key: 'home',
    title: 'Akhrorov — Websites, Mobile Apps & AI Automation',
    description:
      'I build websites, native mobile apps and AI automation for growing businesses — delivered as a done-for-you package with domain, hosting and SEO included.',
    inSitemap: true,
    priority: '1.0',
  },
  {
    path: '/automations/',
    key: 'automations',
    title: 'AI Automation & Workflow Systems — Akhrorov',
    description:
      'n8n workflows and AI agents that capture leads, answer customers and book appointments 24/7. Self-hosted on your own server, with a full video walkthrough.',
    inSitemap: true,
    priority: '0.9',
  },
  {
    path: '/websites/',
    key: 'websites',
    title: 'Website Design & Development — Akhrorov',
    description:
      'Fast, high-converting websites built as a done-for-you package: domain, hosting, copy and SEO handled for you, live in 5–7 days.',
    inSitemap: true,
    priority: '0.9',
  },
  {
    path: '/work/',
    key: 'work',
    title: 'Client Work — Websites & Apps I Have Built — Akhrorov',
    description:
      'Real, in-production work: a public website plus a private management app running daily at an education centre, and a self-hosted 56-node AI assistant.',
    inSitemap: true,
    priority: '0.8',
  },
  {
    path: '/roi-calculator/',
    key: 'roi',
    title: 'ROI Calculator — What Could Automation Save You? — Akhrorov',
    description:
      'Work out the hours and money you are losing to manual work, missed leads, no-shows and repeated support questions — and what automating them would save.',
    inSitemap: true,
    priority: '0.7',
  },
  {
    path: '/contact/',
    key: 'contact',
    title: 'Start Your Project — Akhrorov',
    description:
      'Tell me what you need — a website, a mobile app or an AI assistant. You get a plan and a fixed quote within 24 hours, with no hourly surprises.',
    inSitemap: true,
    priority: '0.8',
  },
];

/** Normalises a pathname and resolves it to a route, falling back to the homepage. */
export function matchRoute(pathname: string): RouteMeta {
  // Compare on the slash-normalised form so "/automations", "/automations/" and
  // a stray query string all resolve to the same route.
  const clean = '/' + (pathname.split('?')[0].split('#')[0].split('/').filter(Boolean).join('/'));
  return ROUTES.find((r) => r.path === clean || r.path === `${clean}/`) ?? ROUTES[0];
}

/** Absolute canonical URL for a route. */
export function canonicalFor(route: RouteMeta): string {
  return `${SITE_ORIGIN}${route.path}`;
}

/** Where this route's prerendered file goes, relative to dist/. */
export function outputFileFor(route: RouteMeta): string {
  return route.path === '/' ? 'index.html' : `${route.path.slice(1)}index.html`;
}
