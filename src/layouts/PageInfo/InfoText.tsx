import { FC, PropsWithChildren } from 'react';

export const InfoText: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children
}) => {
	return (
		<p className={`page-info__text${className ? ` ${className}` : ''}`}>{children}</p>
	);
};
