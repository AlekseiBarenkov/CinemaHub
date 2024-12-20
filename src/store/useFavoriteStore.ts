import { create } from 'zustand';

import { localStorageApi } from '@src/api/localStorageApi';
import { favorites } from '@src/helpers/favorites.helper';

import type {
	TDataItemTypes,
	TDataItemTypesKeys,
	TDataItemTypesKeysToCollect,
	TFavoriteItem,
	TNullable
} from '@src/@types';

type TState = {
	favorites: TFavoriteItem[];
	isLoading: boolean;
};

type TControls = {
	getFavorites: (userId: TNullable<number>) => Promise<void>;
	addFavorite: <T extends TDataItemTypesKeys>(
		type: T,
		userId: number,
		item: T extends 'film_filmography' ? TFavoriteItem : TDataItemTypes[T]
	) => Promise<boolean>;
	removeFavorite: (userId: number, item: TFavoriteItem) => Promise<boolean>;
	clearUserFavorites: (userId: number) => Promise<boolean>;
};

type TStore = TState & {
	controls: TControls;
};

const initial: TState = {
	favorites: [],
	isLoading: true
};

export const useFavoriteStore = create<TStore>((set, get) => ({
	...initial,
	controls: {
		getFavorites: async (userId) => {
			set({ isLoading: true });

			let list: TFavoriteItem[] = [];

			if (userId) {
				const { getFavoriteStorage } = favorites;
				const { getLocalStorageData } = localStorageApi;
				const storage = getFavoriteStorage(userId);

				list = (await getLocalStorageData<TFavoriteItem[]>(storage)) ?? [];
			}

			set({ isLoading: false, favorites: list });
		},
		addFavorite: async (type, userId, item) => {
			const { setLocalStorageData } = localStorageApi;
			const { getFavoriteStorage, collectFavoriteItem } = favorites;

			const storage = getFavoriteStorage(userId);
			const list = get().favorites;
			const favoriteItem =
				type === 'film_filmography'
					? (item as TFavoriteItem)
					: collectFavoriteItem(
							type,
							item as TDataItemTypes[TDataItemTypesKeysToCollect]
						);

			const newList = [...list, favoriteItem];

			const storageResponse = await setLocalStorageData(storage, newList);

			if (storageResponse) {
				set({ favorites: newList });
			}

			return storageResponse;
		},
		removeFavorite: async (userId, item) => {
			const { setLocalStorageData } = localStorageApi;
			const { getFavoriteStorage } = favorites;
			const storage = getFavoriteStorage(userId);
			const newList = get().favorites.filter((old) => old.id !== item.id);

			const storageResponse = await setLocalStorageData(storage, newList);

			if (storageResponse) {
				set({ favorites: newList });
			}

			return storageResponse;
		},
		clearUserFavorites: async (userId) => {
			const { deleteLocalStorageData } = localStorageApi;
			const { getFavoriteStorage } = favorites;

			const storage = getFavoriteStorage(userId);

			const storageResponse = await deleteLocalStorageData(storage);

			if (storageResponse) {
				set({ favorites: [] });
			}

			return storageResponse;
		}
	}
}));
