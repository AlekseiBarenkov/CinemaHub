import { filmsService } from '@src/services/films';

import { utils } from '@src/helpers/utils.helpers';

import { collectionsDirections, movieDirections } from '@src/constants/directions';
import { filterMoths } from '@src/constants/filters';

import type {
	TCountryFilterItem,
	TDirections,
	TFilmDataResponse,
	TFilterMonths,
	TFilterNumbersItem,
	TFilterOrderItem,
	TGalleryFiltersState,
	TGenreFilterItem,
	TMovieFetchParams,
	TMovieFiltersValues,
	TPremiereMonths
} from '@src/@types';

type TParams = {
	direction: TDirections;
	filters?: TGalleryFiltersState;
	page?: number;
	signal?: AbortSignal;
};

type TFilmsHelpers = {
	getPremieresFetchParams: (filters?: TGalleryFiltersState) => {
		month: TPremiereMonths;
		year: number;
	};
	getMovieFetchParams: (
		type: TMovieFiltersValues,
		filters?: TGalleryFiltersState
	) => TMovieFetchParams;
	getFilmsData: (params: TParams) => Promise<TFilmDataResponse>;
};

export const films: TFilmsHelpers = {
	getPremieresFetchParams: (filters) => {
		const month: TFilterMonths[keyof TFilterMonths]['en'] =
			filters && filters.month
				? filters.month.id
				: filterMoths[(new Date().getMonth() + 1) as keyof TFilterMonths].en;

		const year = filters && filters.year ? filters.year.id : new Date().getFullYear();

		return { month, year };
	},

	getMovieFetchParams: (type, filters) => {
		if (!filters) {
			return {};
		}

		const params = Object.keys(filters).reduce(
			(acc, key) => {
				const filterKey = key as keyof TGalleryFiltersState;
				const state = filters[filterKey];

				if (state) {
					switch (filterKey) {
						case 'countries':
						case 'genres':
							acc[filterKey] = Number(
								(state as TCountryFilterItem | TGenreFilterItem).id
							);
							break;

						case 'order':
							acc[filterKey] = (state as TFilterOrderItem).id;
							break;
						case 'ratingFrom':
						case 'ratingTo':
						case 'yearFrom':
						case 'yearTo':
							acc[filterKey] = (state as TFilterNumbersItem).id;
							break;

						default:
							break;
					}
				}
				return acc;
			},
			{ type } as TMovieFetchParams
		);

		return params;
	},

	getFilmsData: async ({ direction, filters, page = 1, signal }) => {
		switch (direction) {
			case 'premiere': {
				const { month, year } = films.getPremieresFetchParams(filters);

				return await filmsService.getPremieres({ year, month }, signal);
			}

			case 'films':
			case 'tv-show':
			case 'mini-series':
			case 'series': {
				const { filterKey } = movieDirections[direction];
				const params = films.getMovieFetchParams(filterKey, filters);

				return await filmsService.getFilmByFilters(params, page, signal);
			}

			case 'animations':
			case 'catastrophe':
			case 'comics':
			case 'family':
			case 'love':
			case 'popular-films':
			case 'popular-series':
			case 'top-250-films':
			case 'top-250-series':
			case 'vampire':
			case 'zombie': {
				const { filterKey } = collectionsDirections[direction];

				return await filmsService.getCollectionsFilms(filterKey, page, signal);
			}

			default: {
				return utils.exhaustiveCheck(direction);
			}
		}
	}
};
