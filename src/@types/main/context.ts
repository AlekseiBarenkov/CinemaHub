import type { MouseEvent } from 'react';
import type {
	TDataDetailItemTypesKeys,
	TDirections,
	TDisplayMode,
	TFilmDetail,
	TFilmographyItem,
	TFilmPersonItem,
	TNullable,
	TPersonDetail,
	TReviewsResponse,
	TShowMessage,
	TSimilarFilmsResponse,
	TUser,
	TVideoInfo
} from '..';

export interface IAuthContext {
	user: TNullable<TUser>;
	displayMode: TDisplayMode;
	isLoading: boolean;
}
export interface IAuthContextActions {
	setAuth: (currentUser: TNullable<TUser>) => void;
}
export interface IToastContextActions {
	showMessage: TShowMessage;
}

//======================================== DetailContext ==================
export type TFilmReturnType = {
	general: TFilmDetail;
	persons: TFilmPersonItem[] | null;
	reviews: TReviewsResponse | null;
	similarFilms: TSimilarFilmsResponse | null;
	videos: TVideoInfo[];
};

export type TPersonReturnType = {
	personDetail: TPersonDetail;
	filmography: TFilmographyItem[];
};

export type TDetailContextPassableData<T extends TDataDetailItemTypesKeys> =
	T extends 'film_detail' ? TFilmReturnType : TPersonReturnType;

export type TDetailContext<
	T extends TDataDetailItemTypesKeys = TDataDetailItemTypesKeys
> = {
	isLoading: boolean;
	data: TDetailContextPassableData<T>;
};

//=========================================================================

export interface IGalleryContext {
	direction: TDirections;
}

export interface ITooltipActionsContext {
	showTooltip: (elem: MouseEvent<HTMLElement>) => void;
	closeTooltip: () => void;
}
