import { cookieApi } from '../api/cookieApi';
import { localStorageApi } from '../api/localStorageApi';

import { services } from '@src/helpers/services.helpers';

import { USER_ID_COOKIE, USERS_LIST_STORAGE } from '../constants/services';

import type { IAuthService, TNullable, TUser } from '@src/@types';

export const authService: IAuthService = {
	_getUsersList: async () => {
		const { getLocalStorageData } = localStorageApi;
		return (await getLocalStorageData<TUser[]>(USERS_LIST_STORAGE)) ?? [];
	},
	_getUserFromDB: (usersList: TUser[], email?: string) => {
		if (email === undefined) {
			return null;
		}
		const userInDB = usersList.find((item) => item.email === email) ?? null;

		return userInDB;
	},
	initUser: async () => {
		const { getCookie, deleteCookie } = cookieApi;
		const userCookie = getCookie(USER_ID_COOKIE);
		const userID = userCookie ? Number(userCookie) : null;
		let user: TNullable<TUser> = null;

		if (userID && !isNaN(userID)) {
			const usersList = await authService._getUsersList();
			user = usersList.find((user) => user.id === userID) ?? null;
		} else {
			deleteCookie(USER_ID_COOKIE);
		}

		return await services.fetchDataTimeout(user);
	},
	changeUser: async (user) => {
		const { setCookie, deleteCookie } = cookieApi;
		const { _getUsersList, _getUserFromDB } = authService;

		const usersList = await _getUsersList();
		const userInDB = _getUserFromDB(usersList, user?.email);

		if (user) {
			if (!userInDB) {
				return {
					status: 'error',
					message: 'Пользователь с таким email не зарегистрирован',
					data: 'email'
				};
			}

			if (userInDB.password !== user.password) {
				return {
					status: 'error',
					message: 'Указан не верный пароль',
					data: 'password'
				};
			}

			setCookie(USER_ID_COOKIE, userInDB.id.toString(), {
				expires: new Date(Date.now() + 86400e3)
			});
		} else {
			deleteCookie(USER_ID_COOKIE);
		}

		return {
			status: 'success',
			data: userInDB
		};
	},
	addNewUser: async (states) => {
		const { setLocalStorageData } = localStorageApi;
		const { _getUsersList, _getUserFromDB } = authService;
		const usersList = await _getUsersList();
		const userInDB = _getUserFromDB(usersList, states.email);

		if (userInDB) {
			return {
				status: 'error',
				message: 'Пользователь с таким email уже зарегистрирован',
				data: 'email'
			};
		}

		const lastID = usersList.reduce(
			(acc, curr) => (acc = curr.id > acc ? curr.id : acc),
			0
		);

		const newUser: TUser = { id: lastID + 1, ...states };

		await setLocalStorageData(USERS_LIST_STORAGE, [...usersList, newUser]);

		return {
			status: 'success',
			data: newUser
		};
	},
	deleteUser: async (userId) => {
		const { setLocalStorageData } = localStorageApi;
		const { _getUsersList } = authService;
		const usersList = await _getUsersList();

		const newList = usersList.filter((user) => user.id !== userId);

		return await setLocalStorageData(USERS_LIST_STORAGE, newList);
	}
};
