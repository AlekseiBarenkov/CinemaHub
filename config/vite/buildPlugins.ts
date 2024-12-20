import { UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export const buildPlugins = (): UserConfig['plugins'] => {
	const plugins: UserConfig['plugins'] = [react()];

	return plugins;
};
