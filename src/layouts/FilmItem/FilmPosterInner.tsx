import { FC, PropsWithChildren } from 'react';

export const FilmPosterInner: FC<PropsWithChildren> = ({ children }) => {
	return <div className='film-item__poster-inner'>{children}</div>;
};
