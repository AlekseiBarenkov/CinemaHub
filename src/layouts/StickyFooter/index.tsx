import { FC, PropsWithChildren } from 'react';

import './style.scss';

export const StickyFooter: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children
}) => {
	return (
		<div className={`sticky-footer${className ? ` ${className}` : ''}`}>{children}</div>
	);
};
