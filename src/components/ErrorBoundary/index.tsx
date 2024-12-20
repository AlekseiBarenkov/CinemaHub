import { FC, useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

import ErrorImg from '@assets/img/Error.png';

import { useToastActionsContext } from '@src/context/hooks/useToastActionsContext';

import { services } from '@src/helpers/services.helpers';

import { routesPaths } from '@src/constants/routesPaths';

import './style.scss';

export const ErrorBoundary: FC = () => {
	const navigate = useNavigate();
	const showMessage = useToastActionsContext().showMessage;
	const error = useRouteError() as Error;
	const { status, message, limitExceeded } = services.getErrorInfo(error);

	useEffect(() => {
		if (limitExceeded) {
			showMessage('warn', 'Превышен суточный лимит запросов', true);
			navigate(`/${routesPaths.PROFILE}`);
		}
	}, [limitExceeded, navigate]);

	if (limitExceeded) {
		return null;
	}

	return (
		<section className='error-boundary'>
			<img src={ErrorImg} alt='error' className='error-boundary__img' />

			{status && <h1 className='error-boundary__status'>{status}</h1>}

			<h2 className='error-boundary__message'>{message}</h2>
		</section>
	);
};
