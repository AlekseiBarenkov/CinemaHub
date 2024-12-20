import type {
	TDataItemTypes,
	TDataItemTypesKeys,
	TFilmMainProperties,
	TFilmSecondProperties,
	TPassableDataItemTypes
} from '..';

type TFavoriteMain = Pick<TFilmMainProperties, 'nameEn' | 'nameRu'>;

export type TFavoriteType = 'person' | 'film';

export type TFavoriteItem = TFavoriteMain & {
	favoriteType: TFavoriteType;
	id: number;
} & Pick<TFilmMainProperties, 'posterUrlPreview'> &
	Pick<TFilmSecondProperties, 'nameOriginal'>;

export type TDataItemTypesKeysToCollect = Exclude<TDataItemTypesKeys, 'film_filmography'>;

type TDataItemTypesValidKey = `${TFavoriteType}_${string}`;

export type TFavoritesHelper = {
	getFavoriteType: (type: TDataItemTypesValidKey) => TFavoriteType;
	getCardId: <T extends TPassableDataItemTypes>(item: T) => number;
	getFavoriteStorage: (userId: number) => string;
	getFavoriteMessage: (type: TDataItemTypesKeys, prev: boolean) => string;
	collectFavoriteItem: <T extends TDataItemTypesKeysToCollect>(
		type: T,
		item: TDataItemTypes[T]
	) => TFavoriteItem;
};
