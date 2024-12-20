type TMovieDirectionsKeys = {
	films: 'FILM';
	series: 'TV_SERIES';
	'mini-series': 'MINI_SERIES';
	'tv-show': 'TV_SHOW';
};

type TCollectionsDirectionsKeys = {
	'popular-films': 'TOP_POPULAR_MOVIES';
	'popular-series': 'POPULAR_SERIES';
	'top-250-series': 'TOP_250_TV_SHOWS';
	'top-250-films': 'TOP_250_MOVIES';
	vampire: 'VAMPIRE_THEME';
	comics: 'COMICS_THEME';
	family: 'FAMILY';
	love: 'LOVE_THEME';
	zombie: 'ZOMBIE_THEME';
	catastrophe: 'CATASTROPHE_THEME';
	animations: 'KIDS_ANIMATION_THEME';
};

type TOtherDirectionsKeys = { premiere: 'PREMIERE' };

type TDirectionInfo<K> = K extends TMovieFiltersValues
	? {
			label: string;
			filterKey: K;
		}
	: {
			label: string;
			filterKey: K;
			img: string;
		};

type TDirection<D> = {
	[K in keyof D]: TDirectionInfo<D[K]>;
};

export type TMovieDirections = TDirection<TMovieDirectionsKeys>;
export type TMoviePaths = keyof TMovieDirectionsKeys;
export type TMovieFiltersValues = TMovieDirectionsKeys[TMoviePaths];

export type TCollectionsDirections = TDirection<TCollectionsDirectionsKeys>;
export type TCollectionsPaths = keyof TCollectionsDirectionsKeys;
export type TCollectionsFiltersValues = TCollectionsDirectionsKeys[TCollectionsPaths];

export type TOtherDirections = TDirection<TOtherDirectionsKeys>;
export type TOtherPaths = keyof TOtherDirectionsKeys;
export type TOtherFiltersValues = TOtherDirectionsKeys[TOtherPaths];

export type TCarouselDirections = TCollectionsDirections & TOtherDirections;
export type TCarouselDirectionsKeys = keyof TCarouselDirections;

export type TGalleryDirections = TMovieDirections &
	TCollectionsDirections &
	TOtherDirections;

export type TDirectionsWithFilters = TMoviePaths | TOtherPaths;
export type TDirections = TDirectionsWithFilters | TCollectionsPaths;
