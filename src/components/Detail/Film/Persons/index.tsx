import { FC } from 'react';

import { DetailBox, DetailTitle } from '@src/layouts/Detail/DetailArticle';
import { Carousel, CarouselItem } from '@src/ui/Carousel';
import { PersonItem } from '../../../PersonsItem';

import type { TFilmPersonItem } from '@src/@types';
import type { CarouselProps } from 'antd';

interface IPersonsDetail {
	filmPersons: TFilmPersonItem[];
}

export const Persons: FC<IPersonsDetail> = ({ filmPersons }) => {
	const settings: CarouselProps = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 8,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 6
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 350,
				settings: {
					slidesToShow: 2
				}
			}
		]
	};

	return (
		<DetailBox>
			<DetailTitle>Актеры и создатели</DetailTitle>

			<Carousel settings={settings}>
				{filmPersons.map((item, idx) => (
					<CarouselItem key={idx}>
						<PersonItem item={item} />
					</CarouselItem>
				))}
			</Carousel>
		</DetailBox>
	);
};
