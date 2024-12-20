import { FilmItem } from '../FilmItem';
import { PersonItem } from '../PersonsItem';
import { ItemsListSkeleton } from './ItemsListSkeleton';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import { favorites } from '@src/helpers/favorites.helper';

import type {
	TDataCardItemTypes,
	TDataCardItemTypesKeys,
	TFavoriteItem,
	TNullable
} from '@src/@types';

import './style.scss';

type TDataItem<T extends TDataCardItemTypesKeys> = TDataCardItemTypes[T] | TFavoriteItem;
type TProps<T extends TDataCardItemTypesKeys> = {
	type: T;
	data: TNullable<TDataItem<T>[]>;
	isLoading: boolean;
	className?: string;
};

export const ItemsList = <T extends TDataCardItemTypesKeys>(props: TProps<T>) => {
	const { type, data, isLoading, className } = props;
	const displayMode = useAuthContext().displayMode;

	const actualClassName = `movie-list ${displayMode}${className ? ` ${className}` : ''}`;

	if (isLoading) {
		return <ItemsListSkeleton className={actualClassName} />;
	}

	if (!data?.length) {
		return <p className='empty-message'>Данные отсутствуют 😕</p>;
	}

	return (
		<div className={actualClassName}>
			{data.map((item) => {
				const { getCardId } = favorites;
				const id = getCardId(item);

				if (type === 'film_card') {
					return <FilmItem key={id} item={item as TDataItem<'film_card'>} />;
				}

				return <PersonItem key={id} item={item as TDataItem<'person_card'>} />;
			})}
		</div>
	);
};
