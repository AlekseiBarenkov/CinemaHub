import { FC, PropsWithChildren } from 'react';

export const DetailText: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	return (
		<p className={`detail-box__text${className ? ` ${className}` : ''}`}>{children}</p>
	);
};
