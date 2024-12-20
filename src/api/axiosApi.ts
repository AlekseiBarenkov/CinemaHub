import axios from 'axios';

import { API_KEY } from '@src/constants/environment';

import type { AxiosRequestConfig } from 'axios';

type TRequest = <D>(params: {
	url: string;
	params?: Record<string, unknown>;
	signal?: AbortSignal;
}) => Promise<D>;

type AxiosApi = {
	request: TRequest;
};

axios.interceptors.request.use(
	async (config) => {
		config.headers['X-API-Key'] = API_KEY;
		return config;
	},
	(error) => Promise.reject(error)
);

export const axiosApi: AxiosApi = {
	request: async ({ url, params, signal }) => {
		const searchParams: AxiosRequestConfig = {
			params: params ?? {},
			signal
		};

		const res = await axios.get(url, searchParams);

		return res.data;
	}
};
