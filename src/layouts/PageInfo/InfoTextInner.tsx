import { FC, PropsWithChildren } from 'react';

export const InfoTextInner: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children
}) => {
	return (
		<div className={`page-info__text-inner${className ? ` ${className}` : ''}`}>
			{children}
		</div>
	);
};
