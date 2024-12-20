import { FC } from 'react';

import { FilmItem } from '@src/components/FilmItem';
import { DetailBox, DetailTitle } from '@src/layouts/Detail/DetailArticle';
import { Carousel, CarouselItem } from '@src/ui/Carousel';

import { filmsCarouselSettings } from '@src/constants/settings';

import type { TSimilarFilmItem } from '@src/@types';

export const SimilarFilms: FC<{ items: TSimilarFilmItem[] }> = ({ items }) => {
	return (
		<DetailBox>
			<DetailTitle>Похожие фильмы</DetailTitle>

			<Carousel settings={{ ...filmsCarouselSettings, infinite: false }}>
				{items.map((item, idx) => (
					<CarouselItem key={item ? item.filmId : idx}>
						<FilmItem item={item} />
					</CarouselItem>
				))}
			</Carousel>
		</DetailBox>
	);
};
