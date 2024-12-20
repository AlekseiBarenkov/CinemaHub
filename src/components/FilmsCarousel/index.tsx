import { FC, useEffect, useState } from 'react';

import { Skeleton } from 'primereact/skeleton';

import { Carousel, CarouselItem } from '@src/ui/Carousel';
import { FilmItem } from '../FilmItem';
import { DetailBox, DetailTitle } from '@src/layouts/Detail/DetailArticle';

import { films } from '@src/helpers/films.helpers';

import { collectionsDirections, otherDirections } from '@src/constants/directions';
import { filmsCarouselSettings, skeletonFilmItems } from '@src/constants/settings';
import { routesPaths } from '@src/constants/routesPaths';

import type { TCarouselDirectionsKeys, TErrorData, TFilmDataResponse } from '@src/@types';
import type { AxiosError } from 'axios';

import './style.scss';

const initialFilmsData: Readonly<TFilmDataResponse> = {
	total: 0,
	totalPages: 0,
	items: []
};

export const FilmsCarousel: FC<{ direction: TCarouselDirectionsKeys }> = ({
	direction
}) => {
	const { label } = { ...collectionsDirections, ...otherDirections }[direction];

	const [data, setData] = useState<TFilmDataResponse>({ ...initialFilmsData });
	const [errorData, setErrorData] = useState<TErrorData>({ isError: false, error: null });

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		(async () => {
			try {
				const res = await films.getFilmsData({ direction, signal });

				setData({ ...initialFilmsData, ...res });
				setIsLoading(false);
			} catch (error) {
				if (!signal.aborted) {
					setErrorData({ isError: true, error: error as AxiosError });
				}
			}
		})();

		return () => {
			controller.abort();
		};
	}, []);

	if (!isLoading && !data.items.length) {
		return;
	}

	if (errorData.isError) {
		throw errorData.error;
	}

	const items = isLoading ? skeletonFilmItems : data.items;

	return (
		<DetailBox className='films-carousel'>
			<DetailTitle className='custom-link' link={`${routesPaths.MOVIES}/${direction}`}>
				{isLoading ? (
					<Skeleton width='20rem' height='2.5rem' className='skeleton'></Skeleton>
				) : (
					<h2 className='films-carousel__title'>{label}</h2>
				)}
			</DetailTitle>

			<Carousel settings={filmsCarouselSettings}>
				{items.map((item, idx) => (
					<CarouselItem key={item ? item.kinopoiskId : idx}>
						<FilmItem item={item} />
					</CarouselItem>
				))}
			</Carousel>
		</DetailBox>
	);
};
