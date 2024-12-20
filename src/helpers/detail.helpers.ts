import { utils } from '@src/helpers/utils.helpers';

import { detailBlocksClassNames, personProfessions } from '@src/constants/detailInfo';
import { movieDirections } from '@src/constants/directions';
import { YOU_TUBE_ID_PATTERN } from '@src/constants/patterns';
import { routesPaths } from '@src/constants/routesPaths';

import type {
	TCountry,
	TDataDetailItemTypes,
	TDataDetailItemTypesKeys,
	TFilmDetail,
	TFilmInfoKeys,
	TFilmographyItem,
	TFilmsVideoResponse,
	TGenre,
	TNullable,
	TPassableDataItemTypes,
	TPersonCardItem,
	TPersonDetail,
	TPersonFilm,
	TSearchParamsKeys,
	TVideoInfo
} from '@src/@types';

type TKeys = Extract<TFilmInfoKeys, 'year' | 'countries' | 'genres'>;
type TUrlInfo = { name: string; url: string };

type TDetailClassNames = typeof detailBlocksClassNames;
type TGetDetailClassNameProps = {
	sub?: keyof TDetailClassNames;
	second: TNullable<string>;
};

type TDetailHelpers = {
	_getThumbnailUrl: (id: string) => string;
	_extractYouTubeID: (url: string) => string | null;
	isFilmDetail: (
		data: TDataDetailItemTypes[TDataDetailItemTypesKeys]
	) => data is TFilmDetail;
	isPersonDetail: (
		data: TDataDetailItemTypes[TDataDetailItemTypesKeys]
	) => data is TPersonDetail;
	getProfession: (person: TPersonCardItem) => TNullable<string>;
	getAgeRating: (
		ageLimit: TNullable<string>,
		mpaa?: TNullable<string>
	) => string | undefined;
	getTitle: (item: TPassableDataItemTypes) => string;
	getURLWithSearchParams: <K extends TKeys>(
		detail: TFilmDetail,
		key: K
	) => TUrlInfo[] | null;
	getYoutubeVideos: (videosList: TFilmsVideoResponse | null) => TVideoInfo[];
	combineFilmographyFilms: (films: TPersonFilm[]) => TFilmographyItem[];
	getDetailClassName: (props: TGetDetailClassNameProps) => string;
};

export const detail: TDetailHelpers = {
	_getThumbnailUrl: (id) => {
		return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
	},
	_extractYouTubeID: (url) => {
		const match = url.match(YOU_TUBE_ID_PATTERN);
		return match && match[7].length == 11 ? match[7] : null;
	},
	isFilmDetail: (data) => {
		const key: keyof TFilmDetail = 'kinopoiskId';
		return key in data;
	},
	isPersonDetail: (data) => {
		const key: keyof TPersonDetail = 'personId';
		return key in data;
	},
	getProfession: (person) => {
		const profession = person.professionKey;

		if (profession in personProfessions) {
			return personProfessions[profession];
		}

		return null;
	},
	getAgeRating: (ageLimit, mpaa) => {
		const ageLimitValue =
			typeof ageLimit === 'string' ? ageLimit.replace(/^\D+/g, '') : null;
		const mpaaValue = typeof mpaa === 'string' ? mpaa.replace(/^\D+/g, '') : null;

		if (ageLimitValue?.length || mpaaValue?.length) {
			return `${Number(ageLimitValue ?? mpaaValue)}+`;
		}
	},
	getTitle: (item) => {
		const { nameRu, nameEn } = item;

		const nameOriginal =
			'nameOriginal' in item && item.nameOriginal ? item.nameOriginal : null;
		return nameRu ? nameRu : nameEn ? nameEn : nameOriginal ? nameOriginal : '';
	},

	getURLWithSearchParams: (detail, key) => {
		const directionEntry = Object.entries(movieDirections).filter(
			(item) => item[1].filterKey === detail.type
		)[0];

		if (!directionEntry) {
			return null;
		}

		const direction = directionEntry[0] as keyof typeof movieDirections;
		const urlBase = new URL(
			`${window.location.origin}/${routesPaths.MOVIES}/${direction}`
		);
		const urlInfoArr: TUrlInfo[] = [];

		switch (key) {
			case 'year': {
				const url = new URL(urlBase);
				const value = detail[key].toString();

				const keys: Extract<TSearchParamsKeys, 'yearFrom' | 'yearTo'>[] = [
					'yearFrom',
					'yearTo'
				];

				keys.forEach((paramKey) => {
					url.searchParams.set(paramKey, detail[key].toString());
				});

				urlInfoArr.push({ name: value, url: url.toString() });
				break;
			}

			case 'countries':
			case 'genres': {
				const state = detail[key] as TGenre[] | TCountry[];
				const arr = state?.map((item) => Object.values(item)[0]) ?? [];

				if (arr.length) {
					arr.forEach((name) => {
						const url = new URL(urlBase);
						url.searchParams.set(key, name);
						urlInfoArr.push({ name, url: url.toString() });
					});
				}
				break;
			}

			default:
				utils.exhaustiveCheck(key);
				break;
		}
		return urlInfoArr;
	},

	getYoutubeVideos: (videosList) => {
		const youTubeVideos: TVideoInfo[] = [];
		const items = videosList?.items
			? videosList.items.filter((item) => item.site === 'YOUTUBE')
			: [];

		if (items.length) {
			items.forEach((video) => {
				const id = detail._extractYouTubeID(video.url);

				if (typeof id === 'string') {
					youTubeVideos.push({
						id,
						name: video.name,
						thumbnailUrl: detail._getThumbnailUrl(id)
					});
				}
			});
		}

		return youTubeVideos;
	},
	combineFilmographyFilms: (films) => {
		const arr: TFilmographyItem[] = [];

		films.forEach((item) => {
			const idx = arr.findIndex((filmItem) => filmItem.filmId === item.filmId);
			const profession = personProfessions[item.professionKey];

			if (idx !== -1) {
				if (profession && !arr[idx].professions.includes(profession)) {
					arr[idx].professions = `${arr[idx].professions}, ${profession}`;
				}

				if (!arr[idx].description && item.description) {
					arr[idx].description = item.description;
				}
			} else {
				arr.push({ ...item, professions: profession ?? '' });
			}
		});
		return arr;
	},
	getDetailClassName: ({ second, sub }) => {
		let generalClass = detailBlocksClassNames.wrapper;
		let subClass = second ? ` ${second}` : '';

		if (sub) {
			generalClass += `__${detailBlocksClassNames[sub]}`;

			if (second) {
				subClass += `__${detailBlocksClassNames[sub]}`;
			}
		}

		const fullClassName = generalClass + subClass;

		return fullClassName;
	}
};
