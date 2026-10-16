/**
 * Server entry for the build-time prerender pass.
 *
 * Compiled by `vite build --ssr` into dist-ssr/entry-server.js, which
 * scripts/prerender.mjs then imports to render each route to static HTML.
 *
 * This deliberately uses `renderToStaticMarkup`, not `renderToString`: the
 * output is a pre-JS paint layer for crawlers and no-JS visitors, and is NOT
 * meant to be hydrated. The client entry (src/main.tsx) still calls
 * `createRoot(...).render(...)`, which clears #root and takes over cleanly —
 * switching that to `hydrateRoot` would be a bug, not an optimisation.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import App from './App.tsx';
import { matchRoute, ROUTES } from './routes.ts';

export function renderRoute(path: string): string {
  return renderToStaticMarkup(<App route={matchRoute(path)} />);
}

export { ROUTES };
