import { useAuthContext } from '@src/context/hooks/useAuthContext';
import { FC, PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';

export const FilmItemWrapper: FC<
	PropsWithChildren<{ className?: string; link?: string }>
> = ({ link, className, children }) => {
	const displayMode = useAuthContext().displayMode;
	const mainClass = `film-item ${displayMode}`;
	const actualClassName = className ? `${mainClass} ${className}` : mainClass;

	if (link) {
		return (
			<Link to={link} className={actualClassName}>
				{children}
			</Link>
		);
	}

	return <div className={actualClassName}>{children}</div>;
};
