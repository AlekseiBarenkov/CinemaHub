export type TUnknownObject = Record<string, unknown>;

export type TSelectItem<Data = unknown> = {
	id: string;
	name: string;
	data?: Data;
};

export type TToastMessageTypes = 'success' | 'info' | 'warn' | 'error';

export type TShowMessage = (
	type: TToastMessageTypes,
	message: string,
	isSticky?: boolean
) => void;

export type THeaderItem = {
	id: number;
	name: string;
	cellWidth: string;
};

export type TUser = {
	id: number;
	name: string;
	last_name: string;
	email: string;
	phone: string;
	password: string;
};

export type TNullable<T = void> = T | null | undefined;

export type TErrorData =
	| { isError: true; error: Error }
	| { isError: false; error: null };

export type TDisplayMode = 'desktop' | 'tablet' | 'mobile';

export type TUserStatusData = {
	usedTotal: number;
	usedLimit: number;
	limit: number;
	accountType: string;
};
