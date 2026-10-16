/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Set by src/main.tsx once the bundle has mounted; read by the inline script
 *  in index.html to decide whether its un-hide failsafe should fire. */
interface Window {
  __appMounted?: boolean;
}
