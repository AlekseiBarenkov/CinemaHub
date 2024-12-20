import { FC } from 'react';

import './style.scss';

export const PageLoader: FC<{ message?: string }> = ({ message }) => {
	return (
		<div className='page-loader'>
			{message && <div className='page-loader__title'>{message}...</div>}

			<i className='pi pi-spin pi-spinner page-loader__ico'></i>
		</div>
	);
};
