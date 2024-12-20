import { utils } from './utils.helpers';

import { FAVORITE_STORAGE } from '@src/constants/services';

import type {
	TDataItemTypes,
	TFavoriteItem,
	TFavoritesHelper,
	TFavoriteType,
	TFilmMainProperties,
	TFilmSecondProperties,
	TPassableDataItemTypes,
	TPersonCardItem,
	TPersonDetail,
	TSimilarFilmItem
} from '@src/@types';

export const favorites: TFavoritesHelper = {
	getFavoriteType: (type) => {
		const favoriteType = type.split('_')[0] as TFavoriteType;

		if (favoriteType !== 'film' && favoriteType !== 'person') {
			throw Error('check TDataItemTypesKeysToCollect type');
		}

		return favoriteType;
	},
	getCardId: <T extends TPassableDataItemTypes>(item: T) => {
		const filmMainKey: keyof Pick<TFilmMainProperties, 'kinopoiskId'> = 'kinopoiskId';
		const filmSimilarKey: keyof Pick<TSimilarFilmItem, 'filmId'> = 'filmId';
		const personDetailKey: keyof Pick<TPersonDetail, 'personId'> = 'personId';
		const filmPersonKey: keyof Pick<TPersonCardItem, 'staffId'> = 'staffId';
		const favoriteKey: keyof Pick<TFavoriteItem, 'id'> = 'id';

		if (filmMainKey in item) {
			return item[filmMainKey];
		}
		if (filmSimilarKey in item) {
			return item[filmSimilarKey];
		}
		if (personDetailKey in item) {
			return item[personDetailKey];
		}
		if (filmPersonKey in item) {
			return item[filmPersonKey];
		}

		if (favoriteKey in item) {
			return item[favoriteKey];
		}

		throw Error(`check item type: ${item}`);
	},
	getFavoriteStorage: (userId) => {
		return `${FAVORITE_STORAGE}_${userId}`;
	},
	getFavoriteMessage: (type, prev) => {
		const favoriteType = favorites.getFavoriteType(type);
		const isFilm = favoriteType === 'film';
		const typeName = isFilm ? 'фильма' : 'персоны';

		return `Карточка ${typeName} ${prev ? 'исключена из избранного' : 'добавлена в избранное'}`;
	},
	collectFavoriteItem: (type, item) => {
		const { nameEn, nameRu } = item;

		const posterUrlPreview =
			'posterUrlPreview' in item ? item.posterUrlPreview : item.posterUrl;

		const favoriteItem: TFavoriteItem = {
			nameEn,
			nameRu,
			favoriteType: favorites.getFavoriteType(type),
			posterUrlPreview,
			nameOriginal: undefined,
			id: 0
		};

		switch (type) {
			case 'film_card': {
				const filmItem = item as TDataItemTypes['film_card'];
				const kinopoiskId = 'filmId' in filmItem ? filmItem.filmId : filmItem.kinopoiskId;

				const nameOriginalKey: keyof TFilmSecondProperties = 'nameOriginal';
				const nameOriginal = nameOriginalKey in item ? item[nameOriginalKey] : undefined;

				favoriteItem.nameOriginal = nameOriginal;
				favoriteItem.id = kinopoiskId;
				favoriteItem.posterUrlPreview = filmItem.posterUrlPreview;
				break;
			}

			case 'film_detail': {
				const { nameOriginal, kinopoiskId, posterUrlPreview } =
					item as TDataItemTypes['film_detail'];

				favoriteItem.nameOriginal = nameOriginal;
				favoriteItem.id = kinopoiskId;
				favoriteItem.posterUrlPreview = posterUrlPreview;

				break;
			}

			case 'person_card': {
				const personItem = item as TDataItemTypes['person_card'];
				const { staffId, posterUrl } = personItem;

				favoriteItem.id = staffId;
				favoriteItem.posterUrlPreview = posterUrl;
				break;
			}

			case 'person_detail': {
				const { posterUrl, personId } = item as TDataItemTypes['person_detail'];

				favoriteItem.id = personId;
				favoriteItem.posterUrlPreview = posterUrl;
				break;
			}

			default:
				return utils.exhaustiveCheck(type);
		}

		return favoriteItem;
	}
};
