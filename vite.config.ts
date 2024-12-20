import path from 'path';
import { defineConfig, loadEnv, UserConfig } from 'vite';
import { buildVite } from './config/vite/buildVite';
import { IBuildPaths, TBuildMode } from './config/vite/types/buildTypes';

export default ({ mode }: { mode: TBuildMode }) => {
	const env = loadEnv(mode, process.cwd());

	const isProd = mode === 'production';

	const BUILD_FOLDER = env.VITE_CONFIG_BUILD_FOLDER?.trim() ?? 'dist';
	const BASE_URL = env.VITE_CONFIG_BASE_URL?.trim();
	const PORT = Number(env.VITE_CONFIG_PORT?.trim());

	const paths: IBuildPaths = {
		base: isProd && BASE_URL ? `/${BASE_URL}/${BUILD_FOLDER}` : './',
		buildOut: env.VITE_CONFIG_BUILD_OUT_DIR?.trim() || `./${BUILD_FOLDER}`,
		src: path.resolve(__dirname, './src'),
		components: path.resolve(__dirname, './src/components'),
		assets: path.resolve(__dirname, './src/assets')
	};

	const config: UserConfig = buildVite({
		port: !isNaN(PORT) ? PORT : 3000,
		paths,
		mode
	});

	return defineConfig({
		...config,
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler' // or "modern"
				}
			}
		}
	});
};
