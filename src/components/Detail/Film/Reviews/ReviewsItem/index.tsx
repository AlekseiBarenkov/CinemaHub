import { ReviewsDate, ReviewsRating } from './components';

import type { TReviewItem } from '@src/@types';

import './style.scss';

type TMainProps<M extends boolean> = { item: TReviewItem; isModal: M };
type TProps<M extends boolean> = M extends true
	? TMainProps<true>
	: TMainProps<false> & {
			handleClick: () => void;
		};

export const ReviewsItem = <M extends boolean>(props: TProps<M>) => {
	const { item, isModal } = props;

	const openModal = !isModal ? (props as TProps<false>).handleClick : undefined;

	const { author, date, type, description, title } = item;

	return (
		<div className='reviews-item' onClick={() => openModal?.()}>
			<div className='reviews-item__header'>
				<div className='reviews-item__post-info'>
					<div className='reviews-item__author'>{author}</div>

					<ReviewsDate dateStr={date} />
				</div>

				<ReviewsRating type={type} />
			</div>

			<div className='reviews-item__content'>
				{!!title && <div className='reviews-item__content-title'>{title}</div>}

				<div
					className='reviews-item__content-text'
					dangerouslySetInnerHTML={{ __html: description + description }}
				/>
			</div>
		</div>
	);
};
