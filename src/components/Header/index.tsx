import { FC, useState } from 'react';

import { Logo, NavBar, Avatar } from './components';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import './style.scss';

export const Header: FC = () => {
	const displayMode = useAuthContext().displayMode;

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={`header ${displayMode}`}>
			<button className='header__burger' onClick={() => setIsOpen(!isOpen)}>
				<i className='pi pi-bars'></i>
			</button>

			<Logo isNeedTitle />

			<NavBar isOpen={isOpen} onClose={() => setIsOpen(false)} />

			<Avatar />
		</div>
	);
};
