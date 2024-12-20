import { FC, PropsWithChildren } from 'react';

import { Carousel as Slider } from 'antd';

import type { CarouselProps } from 'antd';
import type { CustomArrowProps } from '@ant-design/react-slick';

import './style.scss';

const NextArrow = (props: CustomArrowProps) => {
	const { onClick, className } = props;

	const isDisabled = !!className?.includes('slick-disabled');

	return (
		<button
			type='button'
			className={`carousel__arrow-inner next${isDisabled ? ' disabled' : ''}`}
			onClick={(event) => !isDisabled && onClick?.(event)}
		>
			<i className='pi pi-chevron-right carousel-arrow'></i>
		</button>
	);
};

const PrevArrow = (props: CustomArrowProps) => {
	const { onClick, className } = props;

	const isDisabled = !!className?.includes('slick-disabled');
	return (
		<button
			type='button'
			className={`carousel__arrow-inner prev${isDisabled ? ' disabled' : ''}`}
			onClick={(event) => !isDisabled && onClick?.(event)}
		>
			<i className='pi pi-chevron-left carousel-arrow'></i>
		</button>
	);
};

export const Carousel: FC<PropsWithChildren<{ settings: CarouselProps }>> = ({
	children,
	settings
}) => {
	return (
		<div className='carousel'>
			<Slider
				arrows
				{...settings}
				prevArrow={<PrevArrow />}
				nextArrow={<NextArrow />}
				className='carousel__inner'
			>
				{children}
			</Slider>
		</div>
	);
};
