import type { HTMLInputAutoCompleteAttribute } from 'react';
import type { TUnknownObject } from '@src/@types';

type TInputTypes =
	| 'TEXT'
	| 'PHONE'
	| 'EMAIL'
	| 'PASSWORD'
	| 'DROPDOWN'
	| 'NUMBER'
	| 'MONTH'
	| 'YEAR';

type TBaseFieldsProperties = {
	label: string;
	type: TInputTypes;
	autoComplete?: HTMLInputAutoCompleteAttribute;
};
export type TInputFieldsProperties<
	K,
	R extends string | undefined = undefined
> = K extends R
	? TBaseFieldsProperties & {
			isRequired: boolean;
			validMessage?: string;
		}
	: TBaseFieldsProperties;

export type TInputFieldsDescription<
	P extends TUnknownObject,
	R extends string | undefined = undefined
> = {
	[K in keyof P]: TInputFieldsProperties<K, R>;
};
