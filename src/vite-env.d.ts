/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COGNITO_USER_POOL_ID: string;
  readonly VITE_COGNITO_CLIENT_ID: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_STRIPE_SECRET_KEY: string;
  readonly VITE_FLOW_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
