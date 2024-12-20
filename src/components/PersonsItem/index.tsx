import { FC } from 'react';
import { Link } from 'react-router-dom';

import { FavoriteThumb } from '../FavoriteThumb';

import { detail } from '@src/helpers/detail.helpers';

import { routesPaths } from '@src/constants/routesPaths';

import type { TFavoriteItem, TNullable, TPersonCardItem } from '@src/@types';

import './style.scss';

export const PersonItem: FC<{ item: TNullable<TPersonCardItem | TFavoriteItem> }> = ({
	item
}) => {
	if (!item) {
		return 'Loading...';
	}

	const favoriteKey: keyof TFavoriteItem = 'favoriteType';
	const isFavoriteItem = favoriteKey in item;

	const { getTitle, getProfession } = detail;

	const itemId = !isFavoriteItem ? item.staffId : item.id;
	const posterUrl = !isFavoriteItem ? item.posterUrl : item.posterUrlPreview;
	const name = getTitle(item);

	const profession = !isFavoriteItem ? getProfession(item) : null;

	return (
		<Link
			to={`/${routesPaths.PERSON}/${itemId}`}
			className='person-item active-thumb-wrapper'
		>
			<div className='person-item__image '>
				<img src={posterUrl} alt='person' loading='lazy' />
			</div>

			<FavoriteThumb
				type='person_card'
				item={item}
				wrapperClassName='person-item__favorite-inner'
				icoClassName='person-item__favorite-ico'
			/>

			<div className='person-item__name'>{name}</div>

			{!!profession && <div className='person-item__profession'>{profession}</div>}
		</Link>
	);
};
