import { FC } from 'react';

import { Skeleton } from 'primereact/skeleton';

import { FilmItemWrapper, FilmPosterInner } from '@src/layouts/FilmItem';

import './style.scss';

export const FilmItemSkeleton: FC = () => {
	return (
		<FilmItemWrapper>
			<FilmPosterInner>
				<div className='poster-image-skeleton-inner'>
					<Skeleton className='skeleton'></Skeleton>
				</div>
			</FilmPosterInner>

			<Skeleton
				className='skeleton'
				width='75%'
				height='1.5rem'
				pt={{
					root: {
						style: { marginTop: '0.5rem' }
					}
				}}
			></Skeleton>
		</FilmItemWrapper>
	);
};
