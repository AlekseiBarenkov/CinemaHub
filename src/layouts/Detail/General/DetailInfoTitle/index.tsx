import { detail } from '@src/helpers/detail.helpers';
import { FC, PropsWithChildren } from 'react';

export const DetailInfoTitle: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	const fullClassName = detail.getDetailClassName({
		second: className,
		sub: 'infoTitle'
	});

	return <h2 className={fullClassName}>{children}</h2>;
};
