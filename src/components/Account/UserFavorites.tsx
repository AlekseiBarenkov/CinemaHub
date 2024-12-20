import { FC, useState } from 'react';

import { DetailBox } from '@src/layouts/Detail/DetailArticle';

import { useFavoriteStore } from '@src/store/useFavoriteStore';

import type { TFavoriteType } from '@src/@types';
import { ItemsList } from '../ItemsList';

type TMenuObj = { [Key in TFavoriteType]: string };

const menuObj: TMenuObj = {
	film: 'Избранные фильмы',
	person: 'Избранные персоны'
};

export const UserFavorites: FC = () => {
	const favorites = useFavoriteStore((state) => state.favorites);
	const isLoading = useFavoriteStore((state) => state.isLoading);

	const [activeItem, setActiveItem] = useState<TFavoriteType>('film');

	const filtered = favorites.filter((item) => item.favoriteType === activeItem);

	return (
		<DetailBox className='user-favorites'>
			<div className='user-favorites__tab-menu'>
				{Object.keys(menuObj).map((key) => {
					const type = key as keyof TMenuObj;

					return (
						<button
							key={key}
							onClick={() => setActiveItem(type)}
							className={`user-favorites__tab-item${activeItem === type ? ' active' : ''}`}
						>
							{menuObj[type]}
						</button>
					);
				})}
			</div>

			<ItemsList
				type={activeItem === 'film' ? 'film_card' : 'person_card'}
				data={filtered}
				isLoading={isLoading}
				className='user-favorites__list'
			/>
		</DetailBox>
	);
};
