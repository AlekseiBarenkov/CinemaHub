import { FC } from 'react';

import { FilmsCarousel } from '@src/components/FilmsCarousel';

import {
	InfoHeader,
	InfoList,
	InfoListItem,
	InfoSection,
	InfoText,
	InfoTitle,
	InfoTextInner
} from '@src/layouts/PageInfo';

import type { TCarouselDirectionsKeys } from '@src/@types';

const actualDirections: readonly TCarouselDirectionsKeys[] = [
	'premiere',
	'popular-films',
	'popular-series'
];

const Home: FC = () => {
	return (
		<InfoSection className='home'>
			<InfoHeader>Добро пожаловать на CinemaHub!</InfoHeader>

			<InfoTextInner>
				<InfoText>
					<span>CinemaHub</span> — это ваш личный гид по миру кино. Здесь вы найдете самую
					актуальную информацию о фильмах, сериалах и актерах. Благодаря нашему удобному
					интерфейсу и широким возможностям поиска, вы легко сможете узнать о новинках
					кино, прочитать рецензии и посмотреть рейтинги. Будь вы киноманом или просто
					любителем хорошего кино, CinemaHub станет вашим незаменимым помощником в выборе
					следующего фильма для просмотра.
				</InfoText>

				<InfoTitle>Наши ключевые особенности:</InfoTitle>

				<InfoList>
					<InfoListItem>
						<span>Актуальная информация:</span> Мы используем данные от Kinopoisk API,
						чтобы предоставить вам последние новости о фильмах и сериалах.
					</InfoListItem>
					<InfoListItem>
						<span>Поиск и фильтрация:</span> Легко находите фильмы и сериалы по жанру,
						году выпуска и другим параметрам.
					</InfoListItem>
					<InfoListItem>
						<span>Рецензии и рейтинги:</span> Читайте отзывы других зрителей.
					</InfoListItem>
					<InfoListItem>
						<span>Подробная информация:</span> Узнавайте о сюжетах фильмов, составе
						актеров, режиссерах и многом другом.
					</InfoListItem>
				</InfoList>
			</InfoTextInner>

			{actualDirections.map((direction, idx) => {
				return <FilmsCarousel key={idx} direction={direction} />;
			})}
		</InfoSection>
	);
};

export default Home;
