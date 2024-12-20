import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { RatingThumb } from '@src/components/RatingThumb';
import { FavoriteThumb } from '@src/components/FavoriteThumb';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import { detail } from '@src/helpers/detail.helpers';

import { routesPaths } from '@src/constants/routesPaths';

import type { TFilmographyItem } from '@src/@types';

import './style.scss';

export const FilmographyItem: FC<{ item: TFilmographyItem }> = ({ item }) => {
	const displayMode = useAuthContext().displayMode;
	const title = detail.getTitle(item);
	const showNameOrigin = !!item.nameRu && !!item.nameEn;

	return (
		<Link className='filmography-item' to={`/${routesPaths.FILM_CARD}/${item.filmId}`}>
			<div className='filmography-item__left'>
				<div className='filmography-item__title'>{title}</div>

				{showNameOrigin && (
					<div className='filmography-item__subtitle'>{item.nameEn}</div>
				)}

				{!!item.description && (
					<div className='filmography-item__description'>{item.description}</div>
				)}

				<div className='filmography-item__role'>{item.professions}</div>
			</div>

			<div className='filmography-item__rating-inner'>
				{!!item.rating && (
					<RatingThumb rating={item.rating} className='filmography-item__rating-thumb' />
				)}
			</div>

			<div className='filmography-item__right'>
				<FavoriteThumb
					type='film_filmography'
					item={item}
					showTitle={displayMode === 'desktop'}
					wrapperClassName='filmography-item__favorite-thumb'
				/>
			</div>
		</Link>
	);
};
