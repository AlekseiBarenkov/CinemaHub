import { FC, PropsWithChildren } from 'react';

import './style.scss';

export const DetailBox: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	return (
		<article className={`detail-box${className ? ` ${className}` : ''}`}>
			{children}
		</article>
	);
};
