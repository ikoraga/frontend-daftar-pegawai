/// <reference types="nuxt/schema" />
/// <reference types="nuxt" />
/// <reference types="vite/client" />

export {};

declare module "#app";
declare module "#imports";

interface ImportMetaEnv {
  readonly NUXT_PUBLIC_API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
