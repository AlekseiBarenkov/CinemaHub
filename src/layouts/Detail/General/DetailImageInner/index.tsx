import { FC, PropsWithChildren } from 'react';

import { detail } from '@src/helpers/detail.helpers';

import './style.scss';

export const DetailImageInner: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	const fullClassName = detail.getDetailClassName({
		second: className,
		sub: 'imageInner'
	});

	return <div className={fullClassName}>{children}</div>;
};
