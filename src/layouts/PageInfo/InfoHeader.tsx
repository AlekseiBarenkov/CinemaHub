import { FC, PropsWithChildren } from 'react';

export const InfoHeader: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children
}) => {
	return (
		<h1 className={`page-info__header${className ? ` ${className}` : ''}`}>{children}</h1>
	);
};
