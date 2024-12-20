import { FC } from 'react';

import { TooltipInner } from '@src/layouts/TooltipInner';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import type { TReviewTypes } from '@src/@types';

type TRating = { name: string; class: string; ico: string };

const types: Record<TReviewTypes, TRating> = {
	NEGATIVE: {
		name: 'Отрицательная рецензия',
		class: 'danger',
		ico: 'pi-thumbs-down-fill'
	},
	POSITIVE: {
		name: 'Положительная рецензия',
		class: 'success',
		ico: 'pi-thumbs-up-fill'
	},
	NEUTRAL: { name: 'Нейтральная рецензия', class: 'secondary', ico: 'pi-times' },
	UNKNOWN: { name: 'Без оценки', class: 'warning', ico: 'pi-minus' }
};

export const ReviewsRating: FC<{ type: TReviewTypes }> = ({ type }) => {
	const displayMode = useAuthContext().displayMode;
	const typeValue = types[type] ?? types.UNKNOWN;

	return (
		<TooltipInner
			value={typeValue.name}
			wrapperClassName='reviews-rating'
			tooltipClassName='reviews-rating__tooltip'
			position='bottom'
			disabled={displayMode !== 'desktop'}
		>
			<div className='reviews-rating__title'>Оценка:</div>
			<i
				className={`reviews-rating__value pi ${typeValue.ico} color-${typeValue.class}`}
			></i>
		</TooltipInner>
	);
};
