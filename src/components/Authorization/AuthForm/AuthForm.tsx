import {
	FieldErrors,
	Path,
	useForm,
	DefaultValues,
	SubmitHandler
} from 'react-hook-form';

import { Button } from '@src/ui/Button';
import { FormInput } from './AuthFormInput';

import { useAuthActionsContext } from '@src/context/hooks/useAuthActionsContext';
import { useAuthContext } from '@src/context/hooks/useAuthContext';
import { useToastActionsContext } from '@src/context/hooks/useToastActionsContext';

import { authService } from '@src/services/auth';

import { services } from '@src/helpers/services.helpers';

import type { TFormTypes, TFormTypesMap } from '@src/@types';

import './style.scss';

type TFormProps<T extends TFormTypes> = {
	type: T;
	formStates: TFormTypesMap[T];
};

export const AuthForm = <T extends TFormTypes>(props: TFormProps<T>) => {
	const { type, formStates } = props;
	const { isLoading } = useAuthContext();
	const { setAuth } = useAuthActionsContext();
	const { showMessage } = useToastActionsContext();

	const {
		handleSubmit,
		setError,
		control,
		formState: { errors, isSubmitting }
	} = useForm<TFormTypesMap[T]>({
		defaultValues: formStates as DefaultValues<TFormTypesMap[T]>
	});

	const isFetching = isLoading || isSubmitting;

	const onSubmit: SubmitHandler<TFormTypesMap[T]> = async (data) => {
		try {
			const { addNewUser, changeUser } = authService;
			const res =
				type === 'AUTH'
					? await changeUser(data as TFormTypesMap['AUTH'])
					: await addNewUser(data as TFormTypesMap['REGISTER']);

			if (res.status === 'error') {
				setError(res.data as Path<TFormTypesMap[T]>, {
					type: res.data === 'password' ? 'incorrect_password' : undefined,
					message: res.message
				});
				return;
			}
			setAuth(res.data);
		} catch (error) {
			const message = services.getErrorInfo(error as Error).message;
			showMessage('error', message);

			console.group('Error');
			console.error(error);
			console.groupEnd();
		}
	};

	const getErrorMessage = (key: keyof FieldErrors<TFormTypesMap[T]>) => {
		const error = errors[key];

		if (error) {
			if (typeof error.message === 'string') {
				return error.message;
			}

			return 'Неправильный формат поля';
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
			{(Object.keys(formStates) as Path<TFormTypesMap[T]>[]).map((key) => {
				const errorMessage = getErrorMessage(key as keyof FieldErrors<TFormTypesMap[T]>);

				return (
					<FormInput
						key={key as string}
						formType={type}
						errorMessage={errorMessage}
						control={control}
						property={key}
						isLoading={isFetching}
						className='auth-form__item'
						inputClassName='auth-form__input'
						errorClassName='auth-form__error'
					/>
				);
			})}
			<Button
				disabled={isFetching}
				className='auth-form__save-btn'
				label={`${type === 'AUTH' ? 'Войти' : 'Сохранить'}`}
				ico={type === 'AUTH' ? 'pi-user' : 'pi-user-plus'}
				isSpin={isFetching}
				severity={type === 'AUTH' ? 'main' : 'success'}
				type='submit'
			/>
		</form>
	);
};
