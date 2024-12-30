import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { addLocale } from 'primereact/api';

import {
	About,
	News,
	Collections,
	Film,
	Gallery,
	Home,
	NotFound,
	Person,
	Profile
} from './pages';

import { ErrorBoundary } from './components/ErrorBoundary';
import { Root } from './layouts/Root/Root';

import { AuthProvider } from './context/providers/AuthProvider';
import { DetailProvider } from './context/providers/DetailProvider';
import { GalleryProvider } from './context/providers/GalleryProvider';
import { TooltipProvider } from './context/providers/TooltipProvider';

import { PRlocaleOptions } from './config/primereact/primereact.config';

import { routesParams, routesPaths } from './constants/routesPaths';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-dark-blue/theme.css';

import './assets/styles/style.scss';

addLocale('ru', PRlocaleOptions);

const router = createBrowserRouter(
	[
		{
			path: routesPaths.HOME,
			element: (
				<AuthProvider>
					<TooltipProvider>
						<Root />
					</TooltipProvider>
				</AuthProvider>
			),
			children: [
				{
					errorElement: <ErrorBoundary />,
					children: [
						{
							index: true,
							element: <Home />
						},
						{
							path: routesPaths.COLLECTIONS,
							element: <Collections />
						},
						{
							path: `${routesPaths.MOVIES}/:${routesParams.DIRECTION}`,
							element: (
								<GalleryProvider>
									<Gallery />
								</GalleryProvider>
							)
						},
						{
							path: `${routesPaths.FILM_CARD}/:${routesParams.ID}`,
							element: (
								<DetailProvider type='film_detail' key={routesPaths.FILM_CARD}>
									<Film />
								</DetailProvider>
							)
						},
						{
							path: `${routesPaths.PERSON}/:${routesParams.ID}`,
							element: (
								<DetailProvider type='person_detail' key={routesPaths.PERSON}>
									<Person />
								</DetailProvider>
							)
						},
						{
							path: routesPaths.NEWS,
							element: <News />
						},
						{
							path: routesPaths.ABOUT,
							element: <About />
						},
						{
							path: routesPaths.PROFILE,
							element: <Profile />
						}
					]
				}
			]
		},
		{
			path: '*',
			element: <NotFound />
		}
	],
	{
		future: {
			v7_relativeSplatPath: true,
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_skipActionErrorRevalidation: true
		}
	}
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} future={{ v7_startTransition: true }} />
);
