import { FC, useEffect, useState } from 'react';

import { StickyFooter } from '@src/layouts/StickyFooter';
import { Paginator } from '@src/ui/Paginator';
import { NewsList } from '@src/components/NewsList';
import { InfoHeader, InfoSection } from '@src/layouts/PageInfo';

import { filmsService } from '@src/services/films';

import { RESPONSE_ITEMS_LIMIT } from '@src/constants/services';

import type { AxiosError } from 'axios';
import type { TErrorData, TNewsResponse } from '@src/@types';

const News: FC = () => {
	const [data, setData] = useState<Omit<TNewsResponse, 'totalPages'>>({
		total: 0,
		items: []
	});
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	const [errorData, setErrorData] = useState<TErrorData>({
		isError: false,
		error: null
	});

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		setIsLoading(true);

		(async () => {
			try {
				const res = await filmsService.getNews(page, signal);

				setData({ total: res.total, items: res.items });
				setIsLoading(false);
			} catch (err) {
				if (!signal.aborted) {
					const error = err as AxiosError;
					setErrorData({
						isError: true,
						error: error
					});
				}
			}
		})();

		return () => {
			controller.abort();
			setIsLoading(true);
		};
	}, [page]);

	if (errorData.isError) {
		throw errorData.error;
	}

	if (!isLoading && data.total === 0) {
		return (
			<p className='empty-message'>Данные отсутствуют, попробуйте повторить позже 😕</p>
		);
	}

	const showPaginator = data.total > 0;

	return (
		<InfoSection className='news'>
			<InfoHeader className='news__title'>Новости</InfoHeader>

			<NewsList isLoading={isLoading} items={data.items} />

			{showPaginator && (
				<StickyFooter>
					<Paginator
						totalItems={data.total}
						page={page}
						setPage={setPage}
						limit={RESPONSE_ITEMS_LIMIT}
					/>
				</StickyFooter>
			)}
		</InfoSection>
	);
};

export default News;
