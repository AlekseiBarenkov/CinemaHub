import type { TFormFieldsDescription, TFormTypesMap } from '@src/@types';

export const MIN_PASSWORD_LENGTH = 6;

export const formFieldsParams: Readonly<TFormFieldsDescription> = {
	email: {
		label: 'Почта',
		type: 'EMAIL',
		isRequired: true,
		validMessage: 'Формат поля: email@example.com'
	},
	password: {
		label: 'Пароль',
		type: 'PASSWORD',
		isRequired: true,
		validMessage: `Пароль должен включать в себя минимум ${MIN_PASSWORD_LENGTH} символов`
	},
	name: {
		label: 'Имя',
		type: 'TEXT',
		isRequired: true,
		validMessage: 'Заполните обязательное поле'
	},
	last_name: {
		label: 'Фамилия',
		type: 'TEXT'
	},
	phone: {
		label: 'Телефон',
		type: 'PHONE',
		isRequired: true,
		validMessage: 'Формат поля: (999) 999-9999'
	}
};

export const authStates: Readonly<TFormTypesMap['AUTH']> = {
	email: '',
	password: ''
};
export const registerStates: Readonly<TFormTypesMap['REGISTER']> = {
	...authStates,
	last_name: '',
	name: '',
	phone: ''
};
