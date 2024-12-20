import { routesPaths, routesParams } from '@src/constants/routesPaths';

export type TRoutesPaths = typeof routesPaths;

export type TRoutesPathsKeys = keyof TRoutesPaths;
export type TRoutesPathsValues = TRoutesPaths[TRoutesPathsKeys];

export type TRoutesParams = typeof routesParams;
export type TEntityIdParams = { [key in TRoutesParams['ID']]: string };

export type TNavigationState = {
	from: string;
};
