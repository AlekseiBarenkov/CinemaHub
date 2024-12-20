import type {
	TCountryFilterItem,
	TDirections,
	TGenreFilterItem,
	TMovieFetchParams,
	TMovieOrders,
	TPremiereFetchParams,
	TPremiereMonths,
	TInputFieldsDescription,
	TNullable
} from '@src/@types';

export type TFilterMonths = {
	[key: number]: {
		en: TPremiereMonths;
		ru: string;
	};
};

export type TFilterOrders = {
	[key in TMovieOrders]: string;
};

export type TFilterOrderItem = { id: TMovieOrders; name: string };
export type TFilterNumbersItem = { id: number; name: number };
export type TFilterMonthItem = {
	id: TPremiereMonths;
	name: string;
};

export type TMovieFiltersFields = Required<Omit<TMovieFetchParams, 'type'>>;
export type TPremiereFiltersFields = Required<TPremiereFetchParams>;

export type TPremiereFiltersKeys = keyof TPremiereFiltersFields;
export type TMovieFiltersKeys = keyof TMovieFiltersFields;
export type TGalleryFiltersKeys = TPremiereFiltersKeys | TMovieFiltersKeys;

type TRequiredFiltersFields = Extract<TGalleryFiltersKeys, 'year' | 'month' | 'order'>;

export type TGalleryFiltersFields = TInputFieldsDescription<
	TMovieFiltersFields & TPremiereFiltersFields,
	TRequiredFiltersFields
>;

export type TGalleryFiltersTypes = {
	[K in TGalleryFiltersKeys]: K extends 'countries'
		? TCountryFilterItem
		: K extends 'genres'
			? TGenreFilterItem
			: K extends 'order'
				? TFilterOrderItem
				: K extends 'month'
					? TFilterMonthItem
					: TFilterNumbersItem;
};

export type TGalleryFiltersState = {
	[K in TGalleryFiltersKeys]: K extends TRequiredFiltersFields
		? TGalleryFiltersTypes[K]
		: TNullable<TGalleryFiltersTypes[K]>;
};

type TGalleryFiltersOptionsKeys = Exclude<
	TGalleryFiltersKeys,
	'ratingFrom' | 'ratingTo' | 'yearFrom' | 'yearTo'
>;
export type TGalleryFiltersOptions = {
	[K in TGalleryFiltersOptionsKeys]: TGalleryFiltersTypes[K][];
} & { rating: TFilterNumbersItem[] };

export type TUseFilmsDataParams = {
	direction: TDirections;
	page?: number;
	filters?: TGalleryFiltersState;
	isDisableFetching?: boolean;
};

export type TSearchParamsKeys = Extract<
	TMovieFiltersKeys,
	'countries' | 'genres' | 'yearFrom' | 'yearTo'
>;
export type TSearchParamsObject = Partial<Record<TSearchParamsKeys, string>>;
