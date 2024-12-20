/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CONFIG_APP_NAME: string;
	readonly VITE_CONFIG_BUILD_FOLDER: string;
	readonly VITE_CONFIG_PORT: string;
	readonly VITE_CONFIG_BASE_URL: string;
	readonly VITE_CONFIG_BUILD_OUT_DIR: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
