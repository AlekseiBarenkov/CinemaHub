import { create } from 'zustand';

import { filters as helper } from '@src/helpers/filters.helpers';
import { filmsService } from '@src/services/films';

import type {
	TGalleryFiltersKeys,
	TGalleryFiltersOptions,
	TGalleryFiltersState,
	TDirectionsWithFilters,
	TFiltersDataResponse,
	TErrorData
} from '@src/@types';
import type { AxiosError } from 'axios';

type TState = {
	filtersKeys: TGalleryFiltersKeys[];
	filters: TGalleryFiltersState;
	options: TGalleryFiltersOptions;
	page: number;
	isLoading: boolean;
};

type TActions = {
	initData: (
		direction: TDirectionsWithFilters,
		signal: AbortSignal
	) => Promise<TErrorData>;
	setFilter: (filters: Partial<TGalleryFiltersState>) => void;
	setPage: (num: number) => void;
	reset: () => void;
};

type TStore = TState & {
	controls: TActions;
};

const initial: Readonly<TState> = {
	filtersKeys: [],
	filters: helper.getInitialFilters(),
	options: helper.getFiltersOptions(),
	page: 1,
	isLoading: true
};

export const useMoviesFiltersStore = create<TStore>((set, get) => ({
	...initial,
	controls: {
		initData: async (direction, signal) => {
			set({ isLoading: true });

			let errorData: TErrorData = { isError: false, error: null };
			let options = { ...initial.options };

			await filmsService
				.getFilters(signal)
				.then((res) => {
					const { sortFilters } = helper;

					const sortData: TFiltersDataResponse = {
						countries: sortFilters('countries', res.countries),
						genres: sortFilters('genres', res.genres)
					};

					options = { ...initial.options, ...sortData };
				})
				.catch((err) => {
					if (!signal.aborted) {
						errorData = { isError: true, error: err as AxiosError };
					}
				});

			const { getFiltersWithSearchParams, getGalleryFiltersKeys } = helper;

			const filtersKeys: TGalleryFiltersKeys[] = getGalleryFiltersKeys(direction);
			const filters = getFiltersWithSearchParams(get().filters, options);

			set({
				filtersKeys,
				options,
				filters,
				page: initial.page,
				isLoading: false
			});

			return errorData;
		},
		setFilter: (filters) =>
			set((state) => ({
				filters: { ...state.filters, ...filters }
			})),
		setPage: (num) => set({ page: num }),
		reset: () => set(initial)
	}
}));
