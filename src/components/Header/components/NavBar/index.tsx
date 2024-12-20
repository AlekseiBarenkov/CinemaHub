import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Logo } from '../Logo';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import { useOutsideClick } from '@src/hooks/useOutsideClick';

import { routesPaths } from '@src/constants/routesPaths';

import type { TMoviePaths, TRoutesPathsValues } from '@src/@types';

import './style.scss';

type TNavItemPath = `${TRoutesPathsValues}`;

type TNavItem = {
	label: string;
	path: TNavItemPath | `${TNavItemPath}/${TMoviePaths}`;
};

const items: Readonly<TNavItem>[] = [
	{
		label: 'Главная',
		path: routesPaths.HOME
	},
	{
		label: 'Подборки',
		path: routesPaths.COLLECTIONS
	},
	{
		label: 'Фильмы',
		path: `${routesPaths.MOVIES}/films`
	},
	{
		label: 'Сериалы',
		path: `${routesPaths.MOVIES}/series`
	},
	{
		label: 'Новости',
		path: routesPaths.NEWS
	},
	{
		label: 'О нас',
		path: routesPaths.ABOUT
	}
];

export const NavBar: FC<{ isOpen: boolean; onClose: () => void }> = ({
	isOpen,
	onClose
}) => {
	const displayMode = useAuthContext().displayMode;
	const ref = useOutsideClick(isOpen, onClose);

	return (
		<nav
			ref={ref}
			className={`nav-menu ${displayMode}${isOpen ? ' nav-menu--open' : ''}`}
		>
			<Logo />

			<ul className='nav-menu__list'>
				{items.map((item) => (
					<li key={item.label} className='nav-menu__list-item'>
						<NavLink
							to={item.path}
							onClick={() => isOpen && onClose()}
							className='custom-link'
						>
							{item.label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
