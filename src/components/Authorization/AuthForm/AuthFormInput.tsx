import { useId } from 'react';

import { Controller } from 'react-hook-form';

import { FloatLabel } from 'primereact/floatlabel';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import { MIN_PASSWORD_LENGTH } from '@src/constants/forms';
import { EMAIL_PATTERN } from '@src/constants/patterns';
import { formFieldsParams } from '@src/constants/forms';

import type { Control, Path, UseControllerProps } from 'react-hook-form';
import type { TFormTypes, TFormTypesMap } from '@src/@types';

type TProps<T extends TFormTypes> = {
	control: Control<TFormTypesMap[T]>;
	property: Path<TFormTypesMap[T]>;
	formType: T;
	className: string;
	inputClassName: string;
	errorClassName: string;
	isLoading: boolean;
	errorMessage?: string;
};

export const FormInput = <T extends TFormTypes>({
	isLoading,
	control,
	errorMessage,
	formType,
	property,
	className,
	inputClassName,
	errorClassName
}: TProps<T>) => {
	const inputID = useId();

	const fieldParams = formFieldsParams[property];
	const isRequiredField = 'isRequired' in fieldParams;

	let rules: UseControllerProps<TFormTypesMap[T]>['rules'] = undefined;

	if (isRequiredField) {
		const { validMessage, type } = fieldParams;
		rules = {
			required: validMessage ? validMessage : 'Поле обязательно для заполнения'
		};

		if (validMessage) {
			switch (type) {
				case 'EMAIL':
					rules.pattern = {
						value: EMAIL_PATTERN,
						message: validMessage
					};
					break;

				case 'PASSWORD':
					rules.minLength = MIN_PASSWORD_LENGTH;
					break;

				default:
					break;
			}
		}
	}

	const wrapperClass = `${className} input-item`;
	const inputClass = `${inputClassName} input-item__input`;
	const inputPasswordPanelClass = `${inputClassName}-password-panel input-item__input-password-panel`;

	return (
		<div className={wrapperClass}>
			<FloatLabel>
				<Controller
					name={property}
					control={control}
					rules={rules}
					render={(params) => {
						const { field } = params;

						return fieldParams.type === 'PHONE' ? (
							<InputMask
								id={inputID}
								autoComplete='off'
								className={inputClass}
								mask='(999) 999-9999'
								disabled={isLoading}
								{...field}
							></InputMask>
						) : fieldParams.type === 'PASSWORD' ? (
							<Password
								id={inputID}
								autoComplete={formType === 'AUTH' ? 'current-password' : 'new-password'}
								promptLabel='Введите пароль'
								weakLabel='Слишком простой'
								mediumLabel='Средний'
								strongLabel='Достаточно сложный'
								className={inputClass}
								panelClassName={inputPasswordPanelClass}
								disabled={isLoading}
								toggleMask
								{...field}
							/>
						) : (
							<InputText
								id={inputID}
								autoComplete={fieldParams.type === 'EMAIL' ? 'email' : 'off'}
								className={inputClass}
								disabled={isLoading}
								{...field}
							/>
						);
					}}
				/>
				<label htmlFor={inputID}>
					{fieldParams.label}
					{isRequiredField ? <span>*</span> : ''}
				</label>
			</FloatLabel>

			{errorMessage && (
				<p role='alert' className={`${errorClassName} c-red`}>
					<i className='pi pi-exclamation-circle'></i> {errorMessage}
				</p>
			)}
		</div>
	);
};
