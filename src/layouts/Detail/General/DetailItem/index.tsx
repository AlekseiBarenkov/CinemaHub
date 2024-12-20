import { FC } from 'react';

import './style.scss';

type TProps = {
	title: string;
	value: string | JSX.Element;
	className?: string;
};
export const DetailItem: FC<TProps> = ({ title, value, className }) => {
	return (
		<div className={`general-detail__item${className ? ` ${className}` : ''}`}>
			<div className='general-detail__item-title'>{title}:</div>
			<div className='general-detail__item-value'>{value}</div>
		</div>
	);
};
