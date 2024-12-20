export const API_PATH = 'https://kinopoiskapiunofficial.tech/api';

export const USER_ID_COOKIE = 'user_id';

export const USERS_LIST_STORAGE = 'users';
export const FAVORITE_STORAGE = 'favorite';

export const RESPONSE_ITEMS_LIMIT = 20;

export const errorCodes = {
	WRONG_TOKEN: 401,
	REQUEST_LIMIT_EXCEEDED: 402,
	REQUEST_PER_SECOND_LIMIT_EXCEEDED: 429,
	NO_MOVIES_FOUND: 404
} as const;

type TErrorCodes = typeof errorCodes;
export type TErrorCodesValues = TErrorCodes[keyof TErrorCodes];

export const errorStatuses: Record<TErrorCodesValues, string> = {
	[errorCodes.WRONG_TOKEN]: 'Пустой или неправильный токен',
	[errorCodes.REQUEST_LIMIT_EXCEEDED]: 'Превышен лимит запросов',
	[errorCodes.NO_MOVIES_FOUND]: 'Фильмы не найдены',
	[errorCodes.REQUEST_PER_SECOND_LIMIT_EXCEEDED]: 'Превышен лимит запросов в секунду'
} as const;
