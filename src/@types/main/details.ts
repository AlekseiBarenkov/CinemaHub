import type {
	TDataDetailItemTypesKeys,
	TFilmDetail,
	TPersonDetail,
	TReviewItem
} from '@src/@types';

export type TFilmInfoKeys = keyof Pick<
	TFilmDetail,
	| 'year'
	| 'countries'
	| 'genres'
	| 'filmLength'
	| 'ratingAgeLimits'
	| 'ratingMpaa'
	| 'ratingImdb'
	| 'ratingKinopoisk'
	| 'ratingFilmCritics'
	| 'nameOriginal'
>;
export type TFilmInfo = Record<TFilmInfoKeys, string>;
export type TFilmInfoDataEntry = [TFilmInfoKeys, string];

type TPersonInfoKeys = keyof Pick<
	TPersonDetail,
	'profession' | 'growth' | 'birthday' | 'death' | 'birthplace' | 'spouses' | 'hasAwards'
>;
export type TPersonInfo = Record<TPersonInfoKeys, string>;
export type TPersonInfoDataEntry = [TPersonInfoKeys, string];

export type TPassableDataEntry<T extends TDataDetailItemTypesKeys> =
	T extends 'film_detail' ? TFilmInfoDataEntry : TPersonInfoDataEntry;

export type TVideoInfo = {
	id: string;
	name: string;
	thumbnailUrl: string;
};

export type TReviewsModal = {
	isOpen: boolean;
	data: TReviewItem | null;
};
export type TPersonDetailProfessionProperty = Pick<TPersonDetail, 'profession'>;
