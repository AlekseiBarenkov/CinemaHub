import { Button } from '@src/ui/Button';

import { useFavorite } from '@src/hooks/useFavorite';

import type { TDataDetailItemTypes, TDataDetailItemTypesKeys } from '@src/@types';

type TProps<T extends TDataDetailItemTypesKeys> = {
	type: T;
	item: TDataDetailItemTypes[T];
};

export const FavoriteButton = <T extends TDataDetailItemTypesKeys>(props: TProps<T>) => {
	const { type, item } = props;

	const { isLoading, isFavorite, toggleFavorite } = useFavorite(type, item);

	return (
		<Button
			label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
			severity={isFavorite ? 'warning' : 'main'}
			isSpin={isLoading}
			disabled={isLoading}
			onClick={toggleFavorite}
		/>
	);
};
