import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';

import { date } from '@src/helpers/date.helpers';

import type { TNewsItem } from '@src/@types';

export const NewsListItem: FC<{ item: TNewsItem | null }> = ({ item }) => {
	const wrapperClass = 'news-item';
	const imageClass = `${wrapperClass}__image`;
	const contentClass = `${wrapperClass}__content`;
	const linkClass = `${wrapperClass}__link`;
	const titleClass = `${wrapperClass}__title`;
	const dateClass = `${wrapperClass}__date`;
	const descriptionClass = `${wrapperClass}__description`;

	if (!item) {
		return (
			<div className={`${wrapperClass} skeleton-item`}>
				<Skeleton
					width='100%'
					height='12rem'
					className={`${imageClass} skeleton`}
				></Skeleton>

				<div className={contentClass}>
					<div className={titleClass}>
						<Skeleton
							height='1.5rem'
							className='skeleton mb-1'
							style={{ marginBottom: '0.3rem' }}
						></Skeleton>
						<Skeleton height='1.5rem' className='skeleton'></Skeleton>
					</div>
					<Skeleton
						height='1rem'
						width='20rem'
						className={`${dateClass}__date skeleton`}
					></Skeleton>
					<Skeleton height='6rem' className={`${descriptionClass} skeleton`}></Skeleton>
				</div>
			</div>
		);
	}

	const dateStr = date.getFullDate(item.publishedAt) as string;

	return (
		<article className={wrapperClass}>
			<img className={imageClass} src={item.imageUrl} loading='lazy'></img>

			<div className={contentClass}>
				<Link to={item.url} className={linkClass} target='_blank'>
					<h3 className={titleClass}>{item.title}</h3>
				</Link>
				<time className={dateClass} dateTime={item.publishedAt} title={dateStr}>
					{dateStr}
				</time>

				<div className={descriptionClass}>{item.description}</div>
			</div>
		</article>
	);
};
