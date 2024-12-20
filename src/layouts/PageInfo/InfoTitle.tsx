import { FC, PropsWithChildren } from 'react';

export const InfoTitle: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children
}) => {
	return (
		<p className={`page-info__title${className ? ` ${className}` : ''}`}>{children}</p>
	);
};
