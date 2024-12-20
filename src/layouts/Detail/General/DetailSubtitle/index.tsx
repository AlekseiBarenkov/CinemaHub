import { FC, PropsWithChildren } from 'react';

import { detail } from '@src/helpers/detail.helpers';

import './style.scss';

export const DetailSubtitle: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	const fullClassName = detail.getDetailClassName({
		second: className,
		sub: 'subtitle'
	});
	return <div className={fullClassName}>{children}</div>;
};
