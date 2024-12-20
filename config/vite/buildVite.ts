import { UserConfig } from 'vite';
import { IBuildOptions } from './types/buildTypes';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';
import { buildParams } from './buildParams';

export const buildVite = (options: IBuildOptions): UserConfig => {
	return {
		base: options.paths.base,
		plugins: buildPlugins(),
		resolve: buildResolvers(options),
		server: buildDevServer(options),
		build: buildParams(options)
	};
};
