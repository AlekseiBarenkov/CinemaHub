import { UserConfig } from 'vite';
import { IBuildOptions } from './types/buildTypes';

export const buildParams = ({ paths, mode }: IBuildOptions): UserConfig['build'] => {
	const isDev = mode === 'development';

	return {
		outDir: paths.buildOut,
		sourcemap: isDev ? 'inline' : false,
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					const assetName = assetInfo.name || '';
					let extType = assetName.split('.').at(1) || '';

					if (/css/i.test(extType)) {
						return `style-[hash].css`;
					}
					if (/eot|ttf|woff2|woff|var/i.test(extType)) {
						extType = 'fonts';
					}
					if (/png|jpe?g|gif|tiff|bmp|webp/i.test(extType)) {
						extType = 'img';
					}
					if (/svg|ico/i.test(extType)) {
						extType = 'ico';
					}
					return `assets/${extType}/[name][extname]`;
				},
				entryFileNames: 'script-[hash].js'
			}
		}
	};
};
