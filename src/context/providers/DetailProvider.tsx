import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { filmsService } from '@src/services/films';

import { detail } from '@src/helpers/detail.helpers';

import { DetailContext } from '../constants';

import type {
	TDataDetailItemTypesKeys,
	TDetailContext,
	TDetailContextPassableData,
	TEntityIdParams,
	TErrorData,
	TFilmReturnType,
	TPersonReturnType
} from '@src/@types';
import type { AxiosError } from 'axios';

export const DetailProvider = <T extends TDataDetailItemTypesKeys>(
	props: PropsWithChildren<{ type: T }>
) => {
	const { type, children } = props;

	const { id } = useParams<keyof TEntityIdParams>() as TEntityIdParams;

	const [data, setData] = useState<TDetailContextPassableData<T>>(
		{} as TDetailContextPassableData<T>
	);

	const [isLoading, setIsLoading] = useState(true);

	const [errorData, setErrorData] = useState<TErrorData>({
		isError: false,
		error: null
	});

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		(async () => {
			try {
				if (type === 'person_detail') {
					const { getPerson } = filmsService;
					const { films, ...rest } = await getPerson(id, signal);

					const state: TPersonReturnType = {
						filmography: detail.combineFilmographyFilms(films),
						personDetail: rest
					};

					setData(state as TDetailContextPassableData<T>);
				}

				if (type === 'film_detail') {
					const {
						getFilmDetail,
						getReviews,
						getSimilarFilms,
						getFilmsVideo,
						getFilmPersons
					} = filmsService;

					const general = await getFilmDetail(id, signal);
					const persons = await getFilmPersons(id, signal).catch(() => null);
					const reviews = await getReviews(id, 1, signal).catch(() => null);
					const similarFilms = await getSimilarFilms(id, signal).catch(() => null);
					const videosList = await getFilmsVideo(id, signal).catch(() => null);

					const videos = detail.getYoutubeVideos(videosList);
					const state: TFilmReturnType = {
						general,
						persons,
						reviews,
						similarFilms,
						videos
					};

					setData(state as TDetailContextPassableData<T>);
				}
				setIsLoading(false);
			} catch (err) {
				if (!signal.aborted) {
					const error = err as AxiosError;
					setErrorData({
						isError: true,
						error: error
					});
					setIsLoading(false);
				}
			}
		})();

		return () => {
			controller.abort();
			setIsLoading(true);
		};
	}, [id]);

	const value: TDetailContext<T> = useMemo(
		() => ({ isLoading, data }),
		[isLoading, data]
	);

	if (errorData.isError) {
		throw errorData.error;
	}

	return <DetailContext.Provider value={value}>{children}</DetailContext.Provider>;
};
