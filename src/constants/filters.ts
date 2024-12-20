import type {
	TFilterMonths,
	TFilterOrders,
	TGalleryFiltersFields,
	TMovieFiltersKeys,
	TPremiereFiltersKeys
} from '@src/@types';

export const filterMoths: TFilterMonths = {
	1: {
		en: 'JANUARY',
		ru: 'Январь'
	},
	2: {
		en: 'FEBRUARY',
		ru: 'Февраль'
	},
	3: {
		en: 'MARCH',
		ru: 'Март'
	},
	4: {
		en: 'APRIL',
		ru: 'Апрель'
	},
	5: {
		en: 'MAY',
		ru: 'Май'
	},
	6: {
		en: 'JUNE',
		ru: 'Июнь'
	},
	7: {
		en: 'JULY',
		ru: 'Июль'
	},
	8: {
		en: 'AUGUST',
		ru: 'Август'
	},
	9: {
		en: 'SEPTEMBER',
		ru: 'Сентябрь'
	},
	10: {
		en: 'OCTOBER',
		ru: 'Октябрь'
	},
	11: {
		en: 'NOVEMBER',
		ru: 'Ноябрь'
	},
	12: {
		en: 'DECEMBER',
		ru: 'Декабрь'
	}
} as const;

export const movieFilterOrders: TFilterOrders = {
	RATING: 'По рейтингу',
	NUM_VOTE: 'По оценкам',
	YEAR: 'По году'
} as const;

export const galleryFiltersFields: TGalleryFiltersFields = {
	order: {
		label: 'Сортировка',
		type: 'DROPDOWN',
		isRequired: true
	},
	countries: {
		label: 'Страна',
		type: 'DROPDOWN'
	},
	genres: {
		label: 'Жанр',
		type: 'DROPDOWN'
	},
	ratingFrom: {
		label: 'Рейтинг от',
		type: 'DROPDOWN'
	},
	ratingTo: {
		label: 'Рейтинг до',
		type: 'DROPDOWN'
	},
	yearFrom: {
		label: 'Год от',
		type: 'DROPDOWN'
	},
	yearTo: {
		label: 'Год до',
		type: 'DROPDOWN'
	},

	year: {
		label: 'Год релиза',
		type: 'DROPDOWN',
		isRequired: true
	},
	month: {
		label: 'Месяц релиза',
		type: 'DROPDOWN',
		isRequired: true
	}
} as const;

export const premiereFiltersKeys: TPremiereFiltersKeys[] = ['month', 'year'];
export const movieFilterKeys: TMovieFiltersKeys[] = [
	'order',
	'countries',
	'genres',
	'ratingFrom',
	'ratingTo',
	'yearFrom',
	'yearTo'
];
