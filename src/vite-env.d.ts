/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TURSO_URL: string;
  readonly VITE_TURSO_AUTH_TOKEN: string;
  readonly VITE_ADMIN_EMAIL: string;
  readonly VITE_ADMIN_PASSWORD_HASH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}