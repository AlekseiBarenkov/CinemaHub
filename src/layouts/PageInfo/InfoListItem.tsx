import { FC, PropsWithChildren } from 'react';

export const InfoListItem: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children
}) => {
	return (
		<li className={`page-info__text-list-item${className ? ` ${className}` : ''}`}>
			{children}
		</li>
	);
};
