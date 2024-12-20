import { FC } from 'react';

import { date } from '@src/helpers/date.helpers';

export const ReviewsDate: FC<{ dateStr: string }> = ({ dateStr }) => {
	const value = dateStr.split('T')[0];
	const fullDate = date.getFullDate(value) ?? 'Дата неизвестна';

	return <p className='review-date'>{fullDate}</p>;
};
