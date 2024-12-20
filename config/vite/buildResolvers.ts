import { UserConfig } from 'vite';
import { IBuildOptions } from './types/buildTypes';

export const buildResolvers = (options: IBuildOptions): UserConfig['resolve'] => {
	return {
		alias: {
			'@src': options.paths.src,
			'@components': options.paths.components,
			'@assets': options.paths.assets
		}
	};
};
