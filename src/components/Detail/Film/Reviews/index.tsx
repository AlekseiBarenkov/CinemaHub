import { FC, useState } from 'react';

import { DetailBox, DetailTitle } from '@src/layouts/Detail/DetailArticle';
import { Carousel, CarouselItem } from '@src/ui/Carousel';
import { Modal } from '@src/ui/Modal';
import { ReviewsItem } from './ReviewsItem';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import type { TReviewItem, TReviewsModal, TReviewsResponse } from '@src/@types';
import type { CarouselProps } from 'antd';

import './style.scss';

export const Reviews: FC<{ data: TReviewsResponse }> = ({ data }) => {
	const displayMode = useAuthContext().displayMode;
	const [modal, setModal] = useState<TReviewsModal>({ isOpen: false, data: null });

	const settings: CarouselProps = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1
				}
			}
		]
	};

	return (
		<DetailBox className='reviews'>
			<DetailTitle className='reviews__title'>Рецензии зрителей</DetailTitle>

			<Carousel settings={settings}>
				{data.items.map((item, idx) => (
					<CarouselItem key={idx}>
						<ReviewsItem
							item={item}
							handleClick={() => setModal({ isOpen: true, data: item })}
							isModal={false}
						/>
					</CarouselItem>
				))}
			</Carousel>

			<Modal
				wrapperClass={`reviews__modal ${displayMode}`}
				headerClass='reviews__modal-header'
				contentClass='reviews__modal-content'
				isOpen={modal.isOpen}
				onClose={() => setModal({ ...modal, isOpen: false })}
				maximized={displayMode === 'mobile'}
			>
				<ReviewsItem item={modal.data as TReviewItem} isModal={true} />
			</Modal>
		</DetailBox>
	);
};
