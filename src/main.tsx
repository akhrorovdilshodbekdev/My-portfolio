import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {matchRoute} from './routes.ts';
import './index.css';

const route = matchRoute(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App route={route} />
  </StrictMode>,
);

// Tells the inline script in index.html that the bundle actually loaded, so it
// keeps the reveal targets hidden rather than un-hiding everything after its
// failsafe timeout.
window.__appMounted = true;
