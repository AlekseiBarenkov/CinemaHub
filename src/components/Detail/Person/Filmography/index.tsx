import { FC } from 'react';

import { DetailBox, DetailTitle } from '@src/layouts/Detail/DetailArticle';
import { FilmographyItem } from './FilmographyItem';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import type { TFilmographyItem } from '@src/@types';

import './style.scss';

export const Filmography: FC<{ films: TFilmographyItem[] }> = ({ films }) => {
	const displayMode = useAuthContext().displayMode;

	return (
		<DetailBox className={`filmography ${displayMode}`}>
			<DetailTitle>Фильмография</DetailTitle>

			<div className='filmography__grid'>
				{films.map((film) => (
					<FilmographyItem key={film.filmId} item={film} />
				))}
			</div>
		</DetailBox>
	);
};
