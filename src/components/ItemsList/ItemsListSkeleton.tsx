import { FC } from 'react';

import { FilmItem } from '../FilmItem';

import { RESPONSE_ITEMS_LIMIT } from '@src/constants/services';

import './style.scss';

export const ItemsListSkeleton: FC<{ className: string }> = ({ className }) => {
	const items = Array(RESPONSE_ITEMS_LIMIT).fill(null);

	return (
		<div className={className}>
			{items.map((_, idx) => (
				<FilmItem key={idx} />
			))}
		</div>
	);
};
