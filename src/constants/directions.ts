import type {
	TCollectionsDirections,
	TGalleryDirections,
	TMovieDirections,
	TOtherDirections
} from '@src/@types/';

import popularFilmsImg from '../assets/img/collection/popular_films.webp';
import popularSeriesImg from '../assets/img/collection/popular-series.webp';
import top250SeriesImg from '../assets/img/collection/top_250_series.webp';
import top250FilmsImg from '../assets/img/collection/top_250_films.webp';
import vampireImg from '../assets/img/collection/vampire.webp';
import comicsImg from '../assets/img/collection/comics.webp';
import familyImg from '../assets/img/collection/family.webp';
import loveImg from '../assets/img/collection/love.webp';
import zombieImg from '../assets/img/collection/zombie.webp';
import catastropheImg from '../assets/img/collection/catastrophe.webp';
import animationsImg from '../assets/img/collection/animation.webp';
import premiereImg from '../assets/img/collection/premiere.webp';

export const movieDirections: Readonly<TMovieDirections> = {
	films: {
		label: 'Фильмы',
		filterKey: 'FILM'
	},
	'mini-series': {
		label: 'Мини-сериалы',
		filterKey: 'MINI_SERIES'
	},

	series: {
		label: 'Сериалы',
		filterKey: 'TV_SERIES'
	},

	'tv-show': {
		label: 'ТВ-шоу',
		filterKey: 'TV_SHOW'
	}
} as const;

export const collectionsDirections: Readonly<TCollectionsDirections> = {
	'popular-films': {
		label: 'Популярные фильмы',
		filterKey: 'TOP_POPULAR_MOVIES',
		img: popularFilmsImg
	},

	'popular-series': {
		label: 'Популярные сериалы',
		filterKey: 'POPULAR_SERIES',
		img: popularSeriesImg
	},

	'top-250-series': {
		label: '250 лучших сериалов',
		filterKey: 'TOP_250_TV_SHOWS',
		img: top250SeriesImg
	},

	'top-250-films': {
		label: '250 лучших фильмов',
		filterKey: 'TOP_250_MOVIES',
		img: top250FilmsImg
	},

	vampire: {
		label: 'Фильмы про вампиров',
		filterKey: 'VAMPIRE_THEME',
		img: vampireImg
	},

	comics: {
		label: 'Фильмы, основанные на комиксах',
		filterKey: 'COMICS_THEME',
		img: comicsImg
	},

	family: {
		label: 'Семейные фильмы',
		filterKey: 'FAMILY',
		img: familyImg
	},

	love: {
		label: 'Фильмы про любовь и страсть',
		filterKey: 'LOVE_THEME',
		img: loveImg
	},

	zombie: {
		label: 'Фильмы про зомби',
		filterKey: 'ZOMBIE_THEME',
		img: zombieImg
	},

	catastrophe: {
		label: 'Фильмы-катастрофы',
		filterKey: 'CATASTROPHE_THEME',
		img: catastropheImg
	},

	animations: {
		label: 'Мультфильмы',
		filterKey: 'KIDS_ANIMATION_THEME',
		img: animationsImg
	}
} as const;

export const otherDirections: Readonly<TOtherDirections> = {
	premiere: {
		label: 'Кинопремьеры',
		filterKey: 'PREMIERE',
		img: premiereImg
	}
} as const;

export const galleryDirections: Readonly<TGalleryDirections> = {
	...movieDirections,
	...collectionsDirections,
	...otherDirections
} as const;
