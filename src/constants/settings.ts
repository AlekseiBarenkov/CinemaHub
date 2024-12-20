import type { CarouselProps } from 'antd';

export const filmsCarouselSettings: CarouselProps = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 6,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 4
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 475,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 350,
			settings: {
				slidesToShow: 1
			}
		}
	]
};

export const skeletonFilmItems: null[] = new Array(10).fill(null);
