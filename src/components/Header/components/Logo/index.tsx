import { FC } from 'react';

import LogoImg from '@assets/img/logo/logo-color.png';

import './style.scss';

export const Logo: FC<{ isNeedTitle?: boolean }> = ({ isNeedTitle = false }) => {
	return (
		<div className='logo'>
			<img src={LogoImg} alt='logo' className='logo__img' />
			{isNeedTitle && <div className='logo__title'>Открой мир кино!</div>}
		</div>
	);
};
