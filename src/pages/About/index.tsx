import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import {
	InfoHeader,
	InfoList,
	InfoListItem,
	InfoSection,
	InfoText,
	InfoTitle,
	InfoTextInner
} from '@src/layouts/PageInfo';

import './style.scss';

const About: FC = () => {
	const displayMode = useAuthContext().displayMode;
	const email = 'barenkov_aleksei@mail.ru';
	const gitHub = 'https://github.com/AlekseiBarenkov';

	return (
		<InfoSection className={`about ${displayMode}`}>
			<InfoHeader>Добро пожаловать на CinemaHub!</InfoHeader>

			<InfoTextInner>
				<InfoText>
					<span>CinemaHub</span> — это ваш гид по кинематографу, созданный с любовью к
					фильмам и технологиям. Это веб-приложение, разработанное, чтобы показать, как
					современный интерфейс и мощные инструменты могут сделать мир кино ближе и
					удобнее для всех.
				</InfoText>

				<InfoTitle>Зачем был создан CinemaHub?</InfoTitle>

				<InfoText>
					<span>CinemaHub</span> — это мой пет-проект, который помогает продемонстрировать
					мои навыки как фронтенд-разработчика. Я поставил перед собой цель создать
					платформу, которая сочетает в себе удобство, функциональность и эстетику.
				</InfoText>

				<InfoTitle>Что умеет CinemaHub?</InfoTitle>

				<InfoList>
					<InfoListItem>Удобный поиск фильмов и сериалов.</InfoListItem>
					<InfoListItem>
						Полная информация о каждом фильме: трейлеры, актеры, рецензии.
					</InfoListItem>
					<InfoListItem>Сохранение любимых фильмов.</InfoListItem>
					<InfoListItem>
						Современный дизайн, который работает на любых устройствах.
					</InfoListItem>
				</InfoList>

				<InfoTitle>Технологии, которые я использовал:</InfoTitle>

				<InfoList>
					<InfoListItem>
						<span>Kinopoisk API Unofficial </span> — для получения актуальных данных о
						фильмах.
					</InfoListItem>
					<InfoListItem>
						<span>React и TypeScript </span> — для создания надежного и масштабируемого
						интерфейса.
					</InfoListItem>
					<InfoListItem>
						<span>React Query и Zustand </span> — для управления состоянием приложения.
					</InfoListItem>
					<InfoListItem>
						<span>LocalStorage </span> — для хранения пользовательских данных.
					</InfoListItem>
				</InfoList>

				<InfoTitle>Обо мне:</InfoTitle>

				<InfoText>
					Привет! Я Алексей, фронтенд-разработчик, увлеченный созданием удобных, красивых
					и функциональных приложений. CinemaHub — это проект, который объединяет мою
					любовь к кино и страсть к веб-разработке.
				</InfoText>

				<InfoTitle>Свяжитесь со мной:</InfoTitle>

				<InfoList>
					<InfoListItem>
						<span>Email: </span> —{' '}
						<a className='about__link' href={`mailto:${email}`}>
							{email}
						</a>
					</InfoListItem>

					<InfoListItem>
						<span>GitHub: </span> —{' '}
						<Link className='about__link' to={gitHub} target='_blank'>
							{gitHub}
						</Link>
					</InfoListItem>
				</InfoList>
			</InfoTextInner>
		</InfoSection>
	);
};

export default About;
