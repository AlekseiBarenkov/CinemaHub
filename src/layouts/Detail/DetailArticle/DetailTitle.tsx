import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export const DetailTitle: FC<
	PropsWithChildren<{ className?: string; link?: string }>
> = ({ children, className, link }) => {
	const mainClass = 'detail-box__title';

	if (link) {
		return (
			<Link
				to={link}
				className={`custom-link ${mainClass}${className ? ` ${className}` : ''}`}
			>
				{children}
			</Link>
		);
	}

	return (
		<h2 className={`${mainClass}${className ? ` ${className}` : ''}`}>{children}</h2>
	);
};
