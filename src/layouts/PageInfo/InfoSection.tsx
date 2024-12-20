import { FC, PropsWithChildren } from 'react';

import './style.scss';

export const InfoSection: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children
}) => {
	return (
		<section className={`page-info${className ? ` ${className}` : ''}`}>
			{children}
		</section>
	);
};
