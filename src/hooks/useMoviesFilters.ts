import { useEffect } from 'react';

import { useToastActionsContext } from '@src/context/hooks/useToastActionsContext';
import { useMoviesFiltersStore } from '@src/store/useMoviesFiltersStore';

import { filters } from '@src/helpers/filters.helpers';

import type { TDirectionsWithFilters } from '@src/@types';

export const useMoviesFilters = (direction: TDirectionsWithFilters) => {
	const { showMessage } = useToastActionsContext();

	const initData = useMoviesFiltersStore((state) => state.controls.initData);
	const reset = useMoviesFiltersStore((state) => state.controls.reset);

	const isShowFilters = filters.isNeedFilters(direction);

	useEffect(() => {
		if (isShowFilters) {
			const controller = new AbortController();
			const signal = controller.signal;

			(async () => {
				const { isError, error } = await initData(direction, signal);

				if (isError && !signal.aborted) {
					showMessage(
						'error',
						`При загрузке некоторых фильтров произошла ошибка: ${error.message}`
					);
				}
			})();

			return () => {
				controller.abort();
				reset();
			};
		}
	}, [direction]);
};
