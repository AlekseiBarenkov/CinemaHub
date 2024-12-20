import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from '@src/context/hooks/useAuthContext';
import { useToastActionsContext } from '@src/context/hooks/useToastActionsContext';

import { useFavoriteStore } from '@src/store/useFavoriteStore';

import { filmsService } from '@src/services/films';
import { utils } from '@src/helpers/utils.helpers';
import { favorites } from '@src/helpers/favorites.helper';

import { routesPaths } from '@src/constants/routesPaths';

import type {
	TDataItemTypes,
	TDataItemTypesKeys,
	TDataItemTypesKeysToCollect,
	TNavigationState,
	TPassableDataItemTypes
} from '@src/@types';

export const useFavorite = <T extends TDataItemTypesKeys>(
	type: T,
	item: TPassableDataItemTypes<T>
) => {
	const navigate = useNavigate();
	const locationPathname = useLocation().pathname;
	const user = useAuthContext().user;
	const showMessage = useToastActionsContext().showMessage;

	const { addFavorite, removeFavorite } = useFavoriteStore((state) => state.controls);
	const isLoadingFavorites = useFavoriteStore((state) => state.isLoading);
	const favoritesList = useFavoriteStore((state) => state.favorites);

	//============ Для экономии запросов ==========================
	const { cacheResults } = utils;
	const { getFilmDetail } = filmsService;
	const memoizedGetFilmDetail = useCallback(cacheResults(getFilmDetail), [
		cacheResults,
		getFilmDetail
	]);
	//==============================================================

	const itemId = favorites.getCardId(item);
	const favoriteItem =
		'favoriteType' in item ? item : favoritesList.find((curr) => curr.id === itemId);

	const isFavorite = !!favoriteItem;

	const [isFetching, setIsFetching] = useState(false);

	const toggleFavorite = async () => {
		if (!user) {
			return navigate(`/${routesPaths.PROFILE}`, {
				state: { from: locationPathname } as TNavigationState
			});
		}

		setIsFetching(true);

		let status = false;

		if (isFavorite) {
			status = await removeFavorite(user.id, favoriteItem);
		} else {
			if (type === 'film_filmography') {
				const currentItem = await memoizedGetFilmDetail(itemId);
				const favoriteItem = favorites.collectFavoriteItem('film_detail', currentItem);

				status = await addFavorite(type as 'film_filmography', user.id, favoriteItem);
			} else {
				status = await addFavorite(
					type as TDataItemTypesKeysToCollect,
					user.id,
					item as TDataItemTypes[TDataItemTypesKeysToCollect]
				);
			}
		}

		if (status) {
			const { getFavoriteMessage } = favorites;
			showMessage('success', getFavoriteMessage(type, isFavorite));
		} else {
			showMessage('error', 'Произошла непредвиденная ошибка');
		}

		setIsFetching(false);
	};

	return {
		isLoading: isFetching || isLoadingFavorites,
		isFavorite,
		toggleFavorite
	};
};
