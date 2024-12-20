/* eslint-disable @typescript-eslint/no-explicit-any */

import { TNullable } from '@src/@types';
import { services } from '@src/helpers/services.helpers';

interface ILocalStorageApi {
	getLocalStorageData: <T>(storageKey: string, daley?: number) => Promise<TNullable<T>>;
	setLocalStorageData: (
		storageKey: string,
		data: any,
		daley?: number
	) => Promise<boolean>;
	deleteLocalStorageData: (storageKey: string, daley?: number) => Promise<boolean>;
}

export const localStorageApi: ILocalStorageApi = {
	getLocalStorageData: async (storageKey, daley) => {
		try {
			const dataJSON = window.localStorage.getItem(storageKey);
			const data = dataJSON ? JSON.parse(dataJSON) : null;

			return await services.fetchDataTimeout(data, 'success', daley);
		} catch (error) {
			console.group('getLocalStorageData error');
			console.error(error);
			console.groupEnd();
			throw Error(`Не удалось получить данные хранилища ${storageKey}`);
		}
	},
	setLocalStorageData: async (storageKey, data, daley) => {
		try {
			const dataJSON = JSON.stringify(data);
			window.localStorage.setItem(storageKey, dataJSON);

			return await services.fetchDataTimeout(true, 'success', daley);
		} catch (error) {
			console.group('setLocalStorageData error');
			console.error(error);
			console.groupEnd();
			throw Error(`Не удалось сохранить данные в хранилище ${storageKey}`);
		}
	},
	deleteLocalStorageData: async (storageKey, daley) => {
		try {
			window.localStorage.removeItem(storageKey);

			return await services.fetchDataTimeout(true, 'success', daley);
		} catch (error) {
			console.group('deleteLocalStorageData error');
			console.error(error);
			console.groupEnd();
			throw Error(`Не удалось удалить данные из хранилища ${storageKey}`);
		}
	}
};
