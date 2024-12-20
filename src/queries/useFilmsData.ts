import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useRef } from 'react';

import { useMoviesFiltersStore } from '@src/store/useMoviesFiltersStore';

import { films } from '@src/helpers/films.helpers';
import { filters as filtersHelper } from '@src/helpers/filters.helpers';

import { FILMS_DATA_QK } from '@src/constants/queries';

import type { TDirections, TFilmDataResponse } from '@src/@types';

export const useFilmsData = (direction: TDirections) => {
	const { isNeedFilters } = filtersHelper;
	const filters = useMoviesFiltersStore((state) => state.filters);
	const isFiltersLoading = useMoviesFiltersStore((state) => state.isLoading);
	const page = useMoviesFiltersStore((state) => state.page);
	const setPage = useMoviesFiltersStore((state) => state.controls.setPage);

	const isShowFilters = isNeedFilters(direction);

	const enabled = isShowFilters ? !isFiltersLoading : true;

	const prevDirection = useRef(direction);

	const filmsData = useQuery<TFilmDataResponse>({
		queryKey: [FILMS_DATA_QK, { filters, page, isFiltersLoading }],

		queryFn: async ({ signal }) => {
			prevDirection.current = direction;

			return await films.getFilmsData({ direction, filters, page, signal });
		},

		placeholderData: keepPreviousData,

		enabled
	});

	const { isFetching, data } = filmsData;

	const isLoading = isFetching || direction !== prevDirection.current || !data;

	const isLibIncorrectWork =
		!isLoading && !isShowFilters && page === 1 && data?.total === 0;

	const showPaginator =
		!!data &&
		'totalPages' in data &&
		data.totalPages > 0 &&
		direction === prevDirection.current;

	return {
		...filmsData,
		isLibIncorrectWork,
		isLoading,
		showPaginator,
		page,
		setPage
	};
};
