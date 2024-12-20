import { UserConfig } from 'vite';
import { IBuildOptions } from './types/buildTypes';

export const buildDevServer = (options: IBuildOptions): UserConfig['server'] => {
	return {
		port: options.port
	};
};
