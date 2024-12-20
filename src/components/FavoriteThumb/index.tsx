import { CardThumb } from '@src/layouts/CardThumb';
import { TooltipInner } from '@src/layouts/TooltipInner';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import { useFavorite } from '@src/hooks/useFavorite';

import type { TDataItemTypes, TFavoriteItem } from '@src/@types';

import './style.scss';
import { useTooltipActionsContext } from '@src/context/hooks/useTooltipActionsContext';

type TFavoriteThumbItemType = Pick<
	TDataItemTypes,
	'film_card' | 'person_card' | 'film_filmography'
>;

type TFavoriteThumb<T extends keyof TFavoriteThumbItemType> = {
	type: T;
	item: TFavoriteThumbItemType[T] | TFavoriteItem;
	showTitle?: boolean;
	wrapperClassName?: string;
	icoClassName?: string;
};

export const FavoriteThumb = <T extends keyof TFavoriteThumbItemType>(
	props: TFavoriteThumb<T>
) => {
	const closeTooltip = useTooltipActionsContext().closeTooltip;
	const { type, item, wrapperClassName, icoClassName, showTitle = false } = props;

	const { isLoading, isFavorite, toggleFavorite } = useFavorite(type, item);

	const actualIcoClassName = `favorite-thumb__ico${icoClassName ? ` ${icoClassName}` : ''}`;

	const displayMode = useAuthContext().displayMode;

	const disableClick = isLoading;

	const getThumbClassName = () => {
		const isFilmography = type === 'film_filmography';

		let className = `favorite-thumb ${displayMode}${wrapperClassName ? ` ${wrapperClassName}` : ''}`;

		if (disableClick) {
			className += ' disable';
		}

		if (isFavorite || isLoading || isFilmography) {
			className += ' active';
		}

		if (!isFilmography) {
			className += ' p-absolute';
		}

		return className;
	};

	return (
		<CardThumb
			className={getThumbClassName()}
			onClick={() => {
				if (!disableClick) {
					closeTooltip();
					toggleFavorite();
				}
			}}
		>
			<TooltipInner
				value={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
				position='bottom'
				wrapperClassName='favorite-thumb__tooltip-wrapper'
				disabled={displayMode !== 'desktop' || isLoading || showTitle}
			>
				<div className='favorite-thumb__ico-inner'>
					{isLoading ? (
						<i className={`pi pi-spin pi-spinner ${actualIcoClassName}`}></i>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill={isFavorite ? 'white' : 'none'}
							viewBox='0 0 24 24'
							strokeWidth='2'
							stroke='white'
							className={actualIcoClassName}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
							/>
						</svg>
					)}
				</div>

				{showTitle && (
					<div className='favorite-thumb__title'>
						{isFavorite ? 'Убрать' : 'Добавить'}
					</div>
				)}
			</TooltipInner>
		</CardThumb>
	);
};
