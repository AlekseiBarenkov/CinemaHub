import { FC } from 'react';

import { NewsListItem } from './NewsListItem';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import type { TNewsItem } from '@src/@types';

import './style.scss';

export const NewsList: FC<{ items: TNewsItem[]; isLoading: boolean }> = ({
	isLoading,
	items
}) => {
	const displayMode = useAuthContext().displayMode;

	const news: TNewsItem[] | null[] = isLoading ? Array(4).fill(null) : items;

	return (
		<div className={`news-list ${displayMode}`}>
			{news.map((item, idx) => {
				const key = item ? item.kinopoiskId : idx;
				return <NewsListItem key={key} item={item} />;
			})}
		</div>
	);
};
