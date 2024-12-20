import { utils } from '@src/helpers/utils.helpers';

import {
	filterMoths,
	movieFilterKeys,
	movieFilterOrders,
	premiereFiltersKeys
} from '@src/constants/filters';
import { movieDirections } from '@src/constants/directions';

import type {
	TCountryFilterItem,
	TDirections,
	TDirectionsWithFilters,
	TFilterMonths,
	TFilterNumbersItem,
	TFilterOrderItem,
	TFiltersDataResponse,
	TGalleryFiltersOptions,
	TGalleryFiltersState,
	TGenreFilterItem,
	TMovieFiltersKeys,
	TMovieOrders,
	TPremiereFiltersKeys,
	TSearchParamsKeys,
	TSearchParamsObject
} from '@src/@types';

type FilterItem<K extends keyof TFiltersDataResponse> = K extends 'countries'
	? TCountryFilterItem
	: TGenreFilterItem;

type TFiltersHelpers = {
	isNeedFilters: (direction: TDirections) => direction is TDirectionsWithFilters;
	getInitialFilters: () => TGalleryFiltersState;
	getFiltersOptions: () => TGalleryFiltersOptions;
	getFiltersWithSearchParams: (
		filters: TGalleryFiltersState,
		options: TGalleryFiltersOptions
	) => TGalleryFiltersState;
	getGalleryFiltersKeys: (
		direction: TDirectionsWithFilters
	) => TPremiereFiltersKeys[] | TMovieFiltersKeys[];
	sortFilters: <K extends keyof TFiltersDataResponse>(
		key: K,
		res: TFiltersDataResponse[K]
	) => FilterItem<K>[];
};

const getYearsRange = () => {
	const yearsList: TFilterNumbersItem[] = new Array(60).fill(null).map((_, index) => ({
		id: new Date().getFullYear() - index,
		name: new Date().getFullYear() - index
	}));

	return yearsList;
};

export const filters: TFiltersHelpers = {
	isNeedFilters: (direction: TDirections): direction is TDirectionsWithFilters => {
		return direction in movieDirections || direction === 'premiere';
	},
	getInitialFilters: () => {
		const date = new Date();
		const year = date.getFullYear();
		const monthNumber = (date.getMonth() + 1) as keyof TFilterMonths;
		const month = filterMoths[monthNumber];

		const filtersStates: TGalleryFiltersState = {
			order: { id: 'RATING', name: movieFilterOrders.RATING },
			year: { id: year, name: year },
			month: { id: month.en, name: month.ru },
			countries: null,
			genres: null,
			ratingFrom: null,
			ratingTo: null,
			yearFrom: null,
			yearTo: null
		};

		return filtersStates;
	},

	getFiltersOptions: () => {
		const yearsOptions = getYearsRange();
		const monthOptions = Object.keys(filterMoths).map((key) => {
			const monthNumber = Number(key) as keyof TFilterMonths;
			return {
				id: filterMoths[monthNumber].en,
				name: filterMoths[monthNumber].ru
			};
		});
		const movieOrdersOptions: TFilterOrderItem[] = Object.keys(movieFilterOrders).map(
			(key) => {
				const ordersKey = key as TMovieOrders;
				return {
					id: ordersKey,
					name: movieFilterOrders[ordersKey]
				};
			}
		);
		const ratingOptions = new Array(10).fill(null).map((_, index) => ({
			id: index + 1,
			name: index + 1
		}));

		const filtersOptions: TGalleryFiltersOptions = {
			year: yearsOptions,
			month: monthOptions,
			order: movieOrdersOptions,
			rating: ratingOptions,
			countries: [],
			genres: []
		};

		return filtersOptions;
	},

	getFiltersWithSearchParams: (filters, options) => {
		const searchParams = new URLSearchParams(window.location.search);
		const actualFilters = { ...filters };

		if (searchParams.size) {
			const searchObject: TSearchParamsObject = Object.fromEntries(searchParams);

			Object.keys(searchObject).forEach((str) => {
				const key = str as TSearchParamsKeys;
				const value = searchObject[key] as string;

				if (value) {
					switch (key) {
						case 'yearTo':
						case 'yearFrom': {
							actualFilters[key] = { id: Number(value), name: Number(value) };
							break;
						}

						case 'genres':
						case 'countries': {
							const optionItem = options[key].find(
								(item) => Object.values(item)[1] === value
							);

							if (optionItem && key === 'countries') {
								actualFilters[key] = optionItem as TCountryFilterItem;
							}
							if (optionItem && key === 'genres') {
								actualFilters[key] = optionItem as TGenreFilterItem;
							}

							break;
						}

						default:
							break;
					}
				}
			});
		}

		return actualFilters;
	},

	getGalleryFiltersKeys: (direction) => {
		switch (direction) {
			case 'premiere': {
				return premiereFiltersKeys;
			}

			case 'films':
			case 'mini-series':
			case 'series':
			case 'tv-show': {
				return movieFilterKeys;
			}

			default:
				return utils.exhaustiveCheck(direction);
		}
	},

	sortFilters: (key, res) => {
		return res
			.filter(
				(item): item is FilterItem<typeof key> =>
					(key === 'countries'
						? 'country' in item && !!item.country
						: 'genre' in item && !!item.genre) && !!item.id
			)
			.sort((x, y) => {
				return key === 'countries'
					? (x as TCountryFilterItem).country.localeCompare(
							(y as TCountryFilterItem).country
						)
					: (x as TGenreFilterItem).genre.localeCompare((y as TGenreFilterItem).genre);
			});
	}
};
