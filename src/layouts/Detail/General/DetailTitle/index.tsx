import { FC, PropsWithChildren } from 'react';

import { detail } from '@src/helpers/detail.helpers';

export const DetailTitle: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	const fullClassName = detail.getDetailClassName({
		second: className,
		sub: 'title'
	});

	return <h1 className={fullClassName}>{children}</h1>;
};
