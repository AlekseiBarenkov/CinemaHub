import { FC, PropsWithChildren, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GalleryContext } from '../constants';

import { useMoviesFilters } from '@src/hooks/useMoviesFilters';
import type { TDirections, TDirectionsWithFilters, TRoutesParams } from '@src/@types';

type TGalleryParams = {
	[key in TRoutesParams['DIRECTION']]: TDirections;
};

const galleryQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			gcTime: 0
		}
	}
});

export const GalleryProvider: FC<PropsWithChildren> = ({ children }) => {
	const { direction } = useParams<TGalleryParams>() as TGalleryParams;

	const directionMemo = useMemo(() => direction, [direction]);

	useMoviesFilters(directionMemo as TDirectionsWithFilters);

	return (
		<GalleryContext.Provider value={{ direction: directionMemo }}>
			<QueryClientProvider client={galleryQueryClient}>{children}</QueryClientProvider>
		</GalleryContext.Provider>
	);
};
