import type { TFormTypes, TFormTypesMap, TNullable, TUser } from '@src/@types';

type TResponseStatuses = 'error' | 'success';

type TAuthResponseMain<T extends TFormTypes, S extends TResponseStatuses> = {
	status: S;
	data: S extends 'error'
		? keyof TFormTypesMap[T]
		: T extends 'AUTH'
			? TNullable<TUser>
			: TUser;
};
export type TAuthResponse<
	T extends TFormTypes,
	S extends TResponseStatuses = TResponseStatuses
> = S extends 'error'
	? TAuthResponseMain<T, S> & {
			message: string;
		}
	: TAuthResponseMain<T, S>;

export interface IAuthService {
	_getUserFromDB: (usersList: TUser[], email?: string) => TUser | null;
	_getUsersList: () => Promise<TUser[]>;
	initUser: () => Promise<TNullable<TUser>>;
	changeUser: (user: TNullable<TFormTypesMap['AUTH']>) => Promise<TAuthResponse<'AUTH'>>;
	addNewUser: (states: TFormTypesMap['REGISTER']) => Promise<TAuthResponse<'REGISTER'>>;
	deleteUser: (userId: number) => Promise<boolean>;
}
