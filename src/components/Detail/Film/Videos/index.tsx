import { FC, useState } from 'react';

import { DetailBox, DetailTitle } from '@src/layouts/Detail/DetailArticle';
import { Carousel, CarouselItem } from '@src/ui/Carousel';
import { Modal } from '@src/ui/Modal';
import { VideoPlayer } from '@src/ui/VideoPlayer';
import { VideosItem } from './VideosItem';

import type { TVideoInfo } from '@src/@types';
import type { CarouselProps } from 'antd';

import './style.scss';

interface IVideos {
	videos: TVideoInfo[];
}

type TModal = {
	isOpen: boolean;
	trailerId: string;
};

export const Videos: FC<IVideos> = ({ videos }) => {
	const [modal, setModal] = useState<TModal>({ isOpen: false, trailerId: '' });

	const settings: CarouselProps = {
		dots: false,
		speed: 500,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 575,
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

	const handleOpenModal = (trailerId: string) => {
		setModal({ isOpen: true, trailerId });
	};
	const handleCloseModal = () => {
		setModal({ isOpen: false, trailerId: '' });
	};

	return (
		<DetailBox>
			<DetailTitle>Трейлеры и доп. материалы</DetailTitle>

			<Carousel settings={settings}>
				{videos.map((item, idx) => (
					<CarouselItem key={idx}>
						<VideosItem item={item} openModal={handleOpenModal} />
					</CarouselItem>
				))}
			</Carousel>

			<Modal
				isOpen={modal.isOpen}
				onClose={handleCloseModal}
				wrapperClass='videos-modal'
				contentClass='videos-modal__content'
				showHeader={false}
			>
				<VideoPlayer id={modal.trailerId} />
			</Modal>
		</DetailBox>
	);
};
