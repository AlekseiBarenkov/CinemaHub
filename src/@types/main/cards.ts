import type {
	TSimilarFilmItem,
	TPremiereItem,
	TCollectionsItem,
	TFilmByFiltersItem,
	TFilmPersonItem
} from '@src/@types';

export type TFilmPersonItemProfessionProperty = Pick<TFilmPersonItem, 'professionKey'>;

export type TFilmCardItem =
	| TPremiereItem
	| TCollectionsItem
	| TFilmByFiltersItem
	| TSimilarFilmItem;

export type TPersonCardItem = Omit<TFilmPersonItem, 'professionText' | 'description'>;
