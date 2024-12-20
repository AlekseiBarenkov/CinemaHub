import { detail } from '@src/helpers/detail.helpers';
import { FC, PropsWithChildren } from 'react';

export const DetailInfo: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	const fullClassName = detail.getDetailClassName({
		second: className,
		sub: 'info'
	});

	return <div className={fullClassName}>{children}</div>;
};
