import { FC, PropsWithChildren } from 'react';

import { detail } from '@src/helpers/detail.helpers';

import './style.scss';

export const DetailButtonInner: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	const fullClassName = detail.getDetailClassName({
		second: className,
		sub: 'buttonInner'
	});

	return <div className={fullClassName}>{children}</div>;
};
