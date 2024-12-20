import { FC } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const NotFound: FC = () => {
	return (
		<div className='not-found'>
			<div className='not-found__title'>404</div>
			<div className='not-found__text'>Страница не найдена</div>
			<Link to='/' className='not-found__link'>
				{'<<'} Перейти на главную
			</Link>
		</div>
	);
};
export default NotFound;
