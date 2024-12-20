import { FC, Suspense } from 'react';
import { Outlet, ScrollRestoration, useParams } from 'react-router-dom';

import { NotFound } from '@src/pages';
import { Header } from '@src/components/Header';
import { PageLoader } from '@src/components/PageLoader';

import { galleryDirections } from '@src/constants/directions';

import type { TDirections, TRoutesParams } from '@src/@types';

import './style.scss';

type TParams = {
	[K in TRoutesParams[keyof TRoutesParams]]?: K extends TRoutesParams['DIRECTION']
		? TDirections
		: string;
};

export const Root: FC = () => {
	const { direction, id } = useParams<TParams>();

	const isWrongDirection = direction && !(direction in galleryDirections);
	const isWrongId = id && isNaN(Number(id));

	if (isWrongDirection || isWrongId) {
		return <NotFound />;
	}

	return (
		<div className='main'>
			<header className='main__top'>
				<Header />
			</header>

			<main className='main__content'>
				<Suspense fallback={<PageLoader />}>
					<Outlet />
				</Suspense>

				<ScrollRestoration />
			</main>
		</div>
	);
};
