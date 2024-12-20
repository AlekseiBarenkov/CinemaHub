import { FC, PropsWithChildren } from 'react';

import { detail } from '@src/helpers/detail.helpers';

export const DetailInner: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	const fullClassName = detail.getDetailClassName({
		second: className,
		sub: 'detailInner'
	});

	return <div className={fullClassName}>{children}</div>;
};
