import { axiosApi } from '../api/axiosApi';

import { API_PATH } from '../constants/services';

import type { TFilmsService } from '@src/@types';

import { API_KEY } from '@src/constants/environment';

export const filmsService: TFilmsService = {
	getFilters: async (signal) => {
		const url = `${API_PATH}/v2.2/films/filters`;

		return await axiosApi.request({ url, signal });
	},

	getPremieres: async ({ year, month }, signal) => {
		if (month === undefined) {
			console.group('Check filterMoths constant');
			console.error('monthNumber: ', month);
			console.groupEnd();

			throw Error('Check filterMoths constant');
		}

		const url = `${API_PATH}/v2.2/films/premieres`;
		const params = { year, month };

		return await axiosApi.request({ url, params, signal });
	},

	getCollectionsFilms: async (type, page, signal) => {
		const url = `${API_PATH}/v2.2/films/collections`;
		const params = { type, page };
		return await axiosApi.request({ url, params, signal });
	},

	getFilmByFilters: async (filters, page, signal) => {
		const url = `${API_PATH}/v2.2/films`;
		const params = { ...filters, page };
		return await axiosApi.request({ url, params, signal });
	},

	getFilmDetail: async (id, signal) => {
		const url = `${API_PATH}/v2.2/films/${id}`;

		return await axiosApi.request({ url, signal });
	},

	getReviews: async (id, page, signal) => {
		const url = `${API_PATH}/v2.2/films/${id}/reviews`;

		return await axiosApi.request({
			url,
			signal,
			params: { page }
		});
	},

	getSimilarFilms: async (id, signal) => {
		const url = `${API_PATH}/v2.2/films/${id}/similars`;

		return await axiosApi.request({ url, signal });
	},

	getFilmsVideo: async (id, signal) => {
		const url = `${API_PATH}/v2.2/films/${id}/videos`;

		return await axiosApi.request({ url, signal });
	},

	getFilmPersons: async (filmId, signal) => {
		const url = `${API_PATH}/v1/staff`;

		return await axiosApi.request({
			url,
			signal,
			params: { filmId }
		});
	},

	getPerson: async (personId, signal) => {
		const url = `${API_PATH}/v1/staff/${personId}`;
		return await axiosApi.request({ url, signal });
	},

	getNews: async (page, signal) => {
		const url = `${API_PATH}/v1/media_posts`;
		return await axiosApi.request({
			url,
			params: { page },
			signal
		});
	},

	getAccountStatus: async () => {
		const url = `${API_PATH}/v1/api_keys/${API_KEY}`;

		return await axiosApi.request({ url });
	}
};
