import { FC } from 'react';

import { DetailBox, DetailText, DetailTitle } from '@src/layouts/Detail/DetailArticle';

import './style.scss';

export const Description: FC<{ description: string }> = ({ description }) => {
	return (
		<DetailBox className='film-description'>
			<DetailTitle className='film-description__title'>Описание</DetailTitle>

			<DetailText className='film-description__text'>{description}</DetailText>
		</DetailBox>
	);
};
