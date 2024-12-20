import type { TInputFieldsDescription, TUser } from '@src/@types';

type TFormStates = Required<Omit<TUser, 'id'>>;

export type TFormTypesMap = {
	AUTH: Pick<TFormStates, 'email' | 'password'>;
	REGISTER: TFormStates;
	EDIT: Pick<TFormStates, 'name' | 'last_name'>;
};

export type TFormTypes = keyof TFormTypesMap;

type TRequiredFormFields = Extract<
	keyof TFormStates,
	'name' | 'email' | 'phone' | 'password'
>;

export type TFormFieldsDescription = TInputFieldsDescription<
	TFormStates,
	TRequiredFormFields
>;
