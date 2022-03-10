/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORD_LENGTH_LIMIT: number;
  readonly VITE_RETRY_LIMIT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
