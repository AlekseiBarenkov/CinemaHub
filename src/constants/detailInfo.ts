import type { TFilmInfo, TPersonInfo, TPersonProfessions } from '@src/@types';

export const filmInfo: TFilmInfo = {
	nameOriginal: 'Оригинальное название',
	year: 'Год производства',
	countries: 'Страна',
	genres: 'Жанр',
	filmLength: 'Время',
	ratingAgeLimits: 'Возраст',
	ratingMpaa: 'Рейтинг MPAA',
	ratingImdb: 'Рейтинг IMDb',
	ratingKinopoisk: 'Рейтинг Кинопоиска',
	ratingFilmCritics: 'Рейтинг кинокритиков в мире'
};
export const personInfo: TPersonInfo = {
	profession: 'Карьера',
	growth: 'Рост',
	birthday: 'Дата рождения',
	death: 'Дата смерти',
	birthplace: 'Место рождения',
	hasAwards: 'Количество наград',
	spouses: 'Супруг(а)'
};

export const personProfessions: Record<TPersonProfessions, string | null> = {
	WRITER: 'Сценарист',
	OPERATOR: 'Оператор',
	EDITOR: 'Монтажер',
	COMPOSER: 'Композитор',
	PRODUCER_USSR: 'Продюсер',
	HIMSELF: 'Актер',
	HERSELF: 'Актер',
	HRONO_TITR_MALE: 'Озвучка',
	HRONO_TITR_FEMALE: 'Озвучка',
	TRANSLATOR: 'Переводчик',
	DIRECTOR: 'Режиссер',
	DESIGN: 'Художник',
	PRODUCER: 'Продюсер',
	ACTOR: 'Актер',
	VOICE_DIRECTOR: 'Звуковой режиссер'
};

export const detailBlocksClassNames = {
	wrapper: 'general-detail',
	imageInner: 'image-inner',
	image: 'image',
	buttonInner: 'button-inner',
	detailInner: 'detail-inner',
	title: 'title',
	subtitle: 'subtitle',
	info: 'info',
	infoTitle: 'info-title'
} as const;
