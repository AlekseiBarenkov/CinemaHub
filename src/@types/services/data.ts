import type {
	TCollectionsFiltersValues,
	TFavoriteItem,
	TFilmCardItem,
	TMovieFiltersValues,
	TNullable,
	TPersonCardItem
} from '@src/@types';

export type TGenre = {
	genre: string;
};

export type TCountry = {
	country: string;
};

export type TFilmMainProperties = {
	kinopoiskId: number;
	nameRu: TNullable<string>;
	nameEn: TNullable<string>;
	year: number;
	posterUrl: string;
	posterUrlPreview: string;
	countries: TCountry[];
	genres: TGenre[];
};

export type TFilmSecondProperties = {
	imdbId: TNullable<string>;
	nameOriginal: TNullable<string>;
	ratingKinopoisk: TNullable<number>;
	ratingImdb: TNullable<number>;
	type: TMovieFiltersValues;
};

export type TFilmThirdProperties = {
	coverUrl: TNullable<string>;
	logoUrl: TNullable<string>;
	description: TNullable<string>;
	ratingAgeLimits: TNullable<string>;
};

export type TPremiereItem = TFilmMainProperties & {
	duration: TNullable<number>;
	premiereRu: string;
};
export type TCollectionsItem = TFilmMainProperties &
	TFilmSecondProperties &
	TFilmThirdProperties;
export type TFilmByFiltersItem = TFilmMainProperties & TFilmSecondProperties;

export type TPremiereMonths =
	| 'JANUARY'
	| 'FEBRUARY'
	| 'MARCH'
	| 'APRIL'
	| 'MAY'
	| 'JUNE'
	| 'JULY'
	| 'AUGUST'
	| 'SEPTEMBER'
	| 'OCTOBER'
	| 'NOVEMBER'
	| 'DECEMBER';

export type TPremiereFetchParams = {
	year: number;
	month: TPremiereMonths;
};

export type TMovieOrders = 'RATING' | 'NUM_VOTE' | 'YEAR';

export type TMovieFetchParams = {
	countries?: number;
	genres?: number;
	order?: TMovieOrders;
	type?: TMovieFiltersValues;
	ratingFrom?: number;
	ratingTo?: number;
	yearFrom?: number;
	yearTo?: number;
};

export type TCollectionsFetchParams = {
	type: TCollectionsFiltersValues;
	page: number;
};

export type TGenreFilterItem = {
	id: number;
} & TGenre;
export type TCountryFilterItem = {
	id: number;
} & TCountry;

type TProductionStatuses =
	| 'FILMING'
	| 'PRE_PRODUCTION'
	| 'COMPLETED'
	| 'ANNOUNCED'
	| 'UNKNOWN'
	| 'POST_PRODUCTION';

export type TFilmDetail = TCollectionsItem & {
	kinopoiskHDId: TNullable<string>;
	reviewsCount: number;
	ratingGoodReview: TNullable<number>;
	ratingGoodReviewVoteCount: TNullable<number>;
	ratingKinopoiskVoteCount: TNullable<number>;
	ratingImdbVoteCount: TNullable<number>;
	ratingFilmCritics: TNullable<number>;
	ratingFilmCriticsVoteCount: TNullable<number>;
	ratingAwait: TNullable<number>;
	ratingAwaitCount: TNullable<number>;
	ratingRfCritics: TNullable<number>;
	ratingRfCriticsVoteCount: TNullable<number>;
	webUrl: string;
	filmLength: TNullable<number>;
	slogan: TNullable<string>;
	shortDescription: TNullable<string>;
	editorAnnotation: TNullable<string>;
	isTicketsAvailable: boolean;
	productionStatus: TNullable<TProductionStatuses>;
	ratingMpaa: TNullable<string>;
	hasImax: TNullable<boolean>;
	has3D: TNullable<boolean>;
	lastSync: string;
	startYear: TNullable<number>;
	endYear: TNullable<number>;
	serial: TNullable<boolean>;
	shortFilm: TNullable<boolean>;
	completed: TNullable<boolean>;
};

export type TEpisode = {
	seasonNumber: number;
	episodeNumber: number;
	nameRu: TNullable<string>;
	nameEn: TNullable<string>;
	synopsis: TNullable<string>;
	releaseDate: TNullable<string>;
};

export type TSeasonsItem = {
	number: number;
	episodes: TEpisode[];
};

type TBoxOfficeTypes = 'BUDGET' | 'RUS' | 'USA' | 'WORLD';

export type TBoxOfficeItem = {
	type: TBoxOfficeTypes;
	amount: number;
	currencyCode: string;
	name: string;
	symbol: string;
};

export type TExternalSourceItem = {
	url: string;
	platform: string;
	logoUrl: string;
};

export type TReviewTypes = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'UNKNOWN';

export type TReviewItem = {
	kinopoiskId: number;
	type: TReviewTypes;
	date: string;
	positiveRating: number;
	negativeRating: number;
	author: string;
	title: TNullable<string>;
	description: string;
};

export type TSimilarFilmItem = {
	filmId: number;
	nameRu: TNullable<string>;
	nameEn: TNullable<string>;
	nameOriginal: TNullable<string>;
	posterUrl: string;
	posterUrlPreview: string;
	relationType: 'SIMILAR';
};

type TFilmVideoSites = 'YOUTUBE' | 'YANDEX_DISK' | 'KINOPOISK_WIDGET';
export type TFilmVideoItem = {
	url: string;
	name: string;
	site: TFilmVideoSites;
};

export type TPersonProfessions =
	| 'WRITER'
	| 'OPERATOR'
	| 'EDITOR'
	| 'COMPOSER'
	| 'PRODUCER_USSR'
	| 'HIMSELF'
	| 'HERSELF'
	| 'HRONO_TITR_MALE'
	| 'HRONO_TITR_FEMALE'
	| 'TRANSLATOR'
	| 'DIRECTOR'
	| 'DESIGN'
	| 'PRODUCER'
	| 'ACTOR'
	| 'VOICE_DIRECTOR';

type TPersonSex = 'MALE' | 'FEMALE';
type TPersonSpouses = {
	personId: number;
	name: TNullable<string>;
	divorced: boolean;
	divorcedReason: TNullable<string>;
	sex: TNullable<TPersonSex>;
	children: number;
	webUrl: string;
	relation: string;
};
export type TPersonFilm = {
	filmId: number;
	nameRu: TNullable<string>;
	nameEn: TNullable<string>;
	rating: TNullable<string>;
	general: boolean;
	description: TNullable<string>;
	professionKey: TPersonProfessions;
};

export type TFilmPersonItem = {
	nameRu: TNullable<string>;
	nameEn: TNullable<string>;
	posterUrl: string;
	staffId: number;
	description: TNullable<string>;
	professionText: string;
	professionKey: TPersonProfessions;
};

export type TPersonItem = Pick<TFilmPersonItem, 'nameRu' | 'nameEn' | 'posterUrl'> & {
	personId: number;
	webUrl: TNullable<string>;
	sex: TNullable<TPersonSex>;
	growth: TNullable<string | number>;
	birthday: TNullable<string>;
	death: TNullable<string>;
	age: TNullable<number>;
	birthplace: TNullable<string>;
	deathplace: TNullable<string>;
	hasAwards: TNullable<number>;
	profession: TNullable<string>;
	facts: string[];
	spouses: TPersonSpouses[];
	films: TPersonFilm[];
};

export type TFilmographyItem = TPersonFilm & {
	professions: string;
};
export type TPersonDetail = Omit<TPersonItem, 'films'>;

export type TNewsItem = {
	kinopoiskId: number;
	imageUrl: string;
	title: string;
	description: string;
	url: string;
	publishedAt: string;
};

export type TQuota = {
	value: number;
	used: number;
};
export type TAccountType = 'FREE' | 'EXTENDED' | 'UNLIMITED';

export type TDataItemTypes = {
	film_filmography: TFilmographyItem;
	film_card: TFilmCardItem;
	person_card: TPersonCardItem;
	film_detail: TFilmDetail;
	person_detail: TPersonDetail;
};

export type TDataDetailItemTypes = Pick<TDataItemTypes, 'film_detail' | 'person_detail'>;
export type TDataCardItemTypes = Pick<TDataItemTypes, 'film_card' | 'person_card'>;

export type TDataItemTypesKeys = keyof TDataItemTypes;
export type TDataDetailItemTypesKeys = keyof TDataDetailItemTypes;
export type TDataCardItemTypesKeys = keyof TDataCardItemTypes;

export type TPassableDataItemTypes<T extends TDataItemTypesKeys = TDataItemTypesKeys> =
	| TDataItemTypes[T]
	| TFavoriteItem;
