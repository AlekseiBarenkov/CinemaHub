import { FC, PropsWithChildren } from 'react';

export const InfoList: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children
}) => {
	return (
		<ol className={`page-info__text-list${className ? ` ${className}` : ''}`}>
			{children}
		</ol>
	);
};
