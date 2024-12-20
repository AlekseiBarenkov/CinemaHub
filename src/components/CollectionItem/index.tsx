import { FC } from 'react';
import { Link } from 'react-router-dom';

import { routesPaths } from '@src/constants/routesPaths';

import type { TDisplayMode } from '@src/@types';

import './style.scss';

export const CollectionItem: FC<{
	path: string;
	label: string;
	img: string;
	displayMode?: TDisplayMode;
}> = ({ path, label, img, displayMode = 'desktop' }) => {
	return (
		<Link
			className={`collection-item ${displayMode}`}
			to={`/${routesPaths.MOVIES}/${path}`}
		>
			<img src={img} alt={label} className='collection-item__img' loading='lazy' />
			<div className='collection-item__title'>{label}</div>
		</Link>
	);
};
