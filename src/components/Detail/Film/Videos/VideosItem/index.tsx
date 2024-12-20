import { FC } from 'react';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import type { TVideoInfo } from '@src/@types';

import './style.scss';

interface IVideosItem {
	item: TVideoInfo;
	openModal: (id: string) => void;
}

export const VideosItem: FC<IVideosItem> = ({ item, openModal }) => {
	const displayMode = useAuthContext().displayMode;

	return (
		<div className={`videos-item ${displayMode}`} onClick={() => openModal(item.id)}>
			<div className='videos-item__image'>
				<img src={item.thumbnailUrl} alt='trailer' loading='lazy' />

				<div className='videos-item__play-btn'>
					<i className='pi pi-play-circle'></i>
				</div>
			</div>

			<div className='videos-item__name'>{item.name}</div>
		</div>
	);
};
