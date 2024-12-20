import { FC } from 'react';

import { CardThumb } from '@src/layouts/CardThumb';

import Star from '@src/assets/img/star.svg';

import './style.scss';

interface IProps {
	rating: number | string;
	className?: string;
}

export const RatingThumb: FC<IProps> = ({ rating, className }) => {
	return (
		<CardThumb className={`rating-thumb${className ? ` ${className}` : ''}`}>
			<img src={Star} alt='star' className='rating-thumb__star' />

			<div className='rating-thumb__value'>{rating}</div>
		</CardThumb>
	);
};
