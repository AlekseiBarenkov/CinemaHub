import type {
	TAccountType,
	TCollectionsFiltersValues,
	TCollectionsItem,
	TCountryFilterItem,
	TFilmByFiltersItem,
	TFilmDetail,
	TFilmPersonItem,
	TFilmVideoItem,
	TGenreFilterItem,
	TMovieFetchParams,
	TNewsItem,
	TPersonItem,
	TPremiereFetchParams,
	TPremiereItem,
	TQuota,
	TReviewItem,
	TSimilarFilmItem
} from '@src/@types';

export type TResponseData<D> = {
	total: number;
	totalPages: number;
	items: D;
};

export type TPremiereResponse = Omit<TResponseData<TPremiereItem[]>, 'totalPages'>;
export type TCollectionsResponse = TResponseData<TCollectionsItem[]>;
export type TFilmByFiltersResponse = TResponseData<TFilmByFiltersItem[]>;
export type TFilmDataResponse =
	| TPremiereResponse
	| TCollectionsResponse
	| TFilmByFiltersResponse;
export type TFiltersDataResponse = {
	genres: TGenreFilterItem[];
	countries: TCountryFilterItem[];
};

export type TReviewsResponse = {
	totalPositiveReviews: number;
	totalNegativeReviews: number;
	totalNeutralReviews: number;
} & TResponseData<TReviewItem[]>;

export type TSimilarFilmsResponse = Omit<TResponseData<TSimilarFilmItem[]>, 'totalPages'>;
export type TFilmsVideoResponse = Omit<TResponseData<TFilmVideoItem[]>, 'totalPages'>;

export type TNewsResponse = TResponseData<TNewsItem[]>;

export type TAccountResponse = {
	totalQuota: TQuota;
	dailyQuota: TQuota;
	accountType: TAccountType;
};

type TGetFilters = (signal?: AbortSignal) => Promise<TFiltersDataResponse>;

type TGetPremieres = (
	params: TPremiereFetchParams,
	signal?: AbortSignal
) => Promise<TPremiereResponse>;

type TGetCollectionsFilms = (
	type: TCollectionsFiltersValues,
	page: number,
	signal?: AbortSignal
) => Promise<TCollectionsResponse>;

type TGetFilmByFilters = (
	params: TMovieFetchParams,
	page: number,
	signal?: AbortSignal
) => Promise<TFilmByFiltersResponse>;

type TGetFilmDetail = (id: string | number, signal?: AbortSignal) => Promise<TFilmDetail>;

type TGetReviews = (
	id: string,
	page: number,
	signal?: AbortSignal
) => Promise<TReviewsResponse>;

type TGetSimilarFilms = (
	id: string,
	signal?: AbortSignal
) => Promise<TSimilarFilmsResponse>;

type TGetFilmsVideo = (id: string, signal?: AbortSignal) => Promise<TFilmsVideoResponse>;

type TGetFilmPersons = (id: string, signal?: AbortSignal) => Promise<TFilmPersonItem[]>;

type TGetPerson = (id: string, signal?: AbortSignal) => Promise<TPersonItem>;

type TGetNews = (page: number, signal?: AbortSignal) => Promise<TNewsResponse>;

type TGetAccountStatus = () => Promise<TAccountResponse>;

export type TFilmsService = {
	getFilters: TGetFilters;
	getPremieres: TGetPremieres;
	getCollectionsFilms: TGetCollectionsFilms;
	getFilmByFilters: TGetFilmByFilters;
	getFilmDetail: TGetFilmDetail;
	getReviews: TGetReviews;
	getSimilarFilms: TGetSimilarFilms;
	getFilmsVideo: TGetFilmsVideo;
	getFilmPersons: TGetFilmPersons;
	getPerson: TGetPerson;
	getNews: TGetNews;
	getAccountStatus: TGetAccountStatus;
};
