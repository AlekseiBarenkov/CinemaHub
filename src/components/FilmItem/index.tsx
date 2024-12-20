import { FilmItemWrapper, FilmPosterInner } from '@src/layouts/FilmItem';
import { CardThumb } from '@src/layouts/CardThumb';
import { FavoriteThumb } from '@src/components/FavoriteThumb';
import { FilmItemSkeleton } from './FilmItemSkeleton';
import { RatingThumb } from '../RatingThumb';

import { date } from '@src/helpers/date.helpers';
import { detail } from '@src/helpers/detail.helpers';

import { routesPaths } from '@src/constants/routesPaths';

import type {
	TFavoriteItem,
	TFilmCardItem,
	TFilmMainProperties,
	TFilmSecondProperties,
	TNullable,
	TPremiereItem
} from '@src/@types';

import './style.scss';

type TProps = { item?: TNullable<TFilmCardItem | TFavoriteItem> };

export const FilmItem = (props: TProps) => {
	const { item } = props;

	if (!item) {
		return <FilmItemSkeleton />;
	}

	const title = detail.getTitle(item);

	const ratingKey: keyof TFilmSecondProperties = 'ratingKinopoisk';
	const rating = ratingKey in item && item[ratingKey] ? item[ratingKey] : null;

	const premiereDateKey: keyof TPremiereItem = 'premiereRu';
	const premiereDate =
		premiereDateKey in item ? date.getFullDate(item[premiereDateKey]) : null;

	const mainFilmIdKey: keyof TFilmMainProperties = 'kinopoiskId';
	const favoriteIdKey: keyof TFavoriteItem = 'id';

	const filmID =
		mainFilmIdKey in item
			? item[mainFilmIdKey]
			: favoriteIdKey in item
				? item[favoriteIdKey]
				: item.filmId;

	return (
		<FilmItemWrapper
			className='active-thumb-wrapper'
			link={`/${routesPaths.FILM_CARD}/${filmID}`}
		>
			<FilmPosterInner>
				{premiereDate && (
					<CardThumb className='film-item__premiere-date'>{premiereDate}</CardThumb>
				)}

				{rating && <RatingThumb className='film-item__rating-inner' rating={rating} />}

				<FavoriteThumb
					type='film_card'
					item={item}
					wrapperClassName='film-item__favorite-inner'
					icoClassName='film-item__favorite-ico'
				/>

				<img
					src={item.posterUrlPreview}
					alt='poster'
					className='film-item__poster poster-image'
					loading='lazy'
				/>
			</FilmPosterInner>

			<p className='film-item__title'>{title ?? ''}</p>
		</FilmItemWrapper>
	);
};
