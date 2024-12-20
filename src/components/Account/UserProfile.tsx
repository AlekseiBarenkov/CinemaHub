import { FC, MouseEvent, useState } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import { DetailBox } from '@src/layouts/Detail/DetailArticle';
import { Button } from '@src/ui/Button';
import { DetailItem } from '@src/layouts/Detail/General';

import { useAuthContext } from '@src/context/hooks/useAuthContext';
import { useAuthActionsContext } from '@src/context/hooks/useAuthActionsContext';
import { useToastActionsContext } from '@src/context/hooks/useToastActionsContext';

import { useFavoriteStore } from '@src/store/useFavoriteStore';

import { authService } from '@src/services/auth';

import { formFieldsParams } from '@src/constants/forms';

import type { TUser } from '@src/@types';

type TLoadingStatus = 'isQuitting' | 'isDeleting' | null;

export const UserProfile: FC = () => {
	const user = useAuthContext().user as TUser;
	const { setAuth } = useAuthActionsContext();
	const showMessage = useToastActionsContext().showMessage;

	const clearUserFavorites = useFavoriteStore(
		(state) => state.controls.clearUserFavorites
	);

	const [status, setStatus] = useState<TLoadingStatus>(null);

	const keys = (Object.keys(user) as (keyof TUser)[]).filter(
		(key) => key !== 'id' && key !== 'password'
	);

	const handleDelete = async () => {
		try {
			setStatus('isDeleting');
			await authService
				.deleteUser(user.id)
				.then(() => clearUserFavorites(user.id))
				.then(() => setAuth(null));
		} catch (err) {
			const error = err as Error;

			console.group('handleDelete error');
			console.error(error);
			console.groupEnd();
			showMessage('error', error.message);
		} finally {
			setStatus(null);
		}
	};

	const handleQuit = async () => {
		setStatus('isQuitting');

		await authService.changeUser(null).then(() => setAuth(null));

		setStatus(null);
	};

	const confirmDelete = (event: MouseEvent<HTMLButtonElement>) => {
		confirmPopup({
			target: event.currentTarget,
			message: 'Удалить аккаунт?',
			icon: 'pi pi-exclamation-triangle',
			defaultFocus: 'accept',
			acceptLabel: 'Да',
			rejectLabel: 'Нет',
			accept: handleDelete
		});
	};

	return (
		<DetailBox className='user-profile'>
			<ConfirmPopup />

			<div className='user-profile__items'>
				{keys.map((key) => (
					<DetailItem
						key={key}
						title={formFieldsParams[key].label}
						value={user[key] || '-'}
					/>
				))}
			</div>

			<div className='user-profile__buttons-inner'>
				<Button
					label='Выйти'
					onClick={handleQuit}
					severity='warning'
					isSpin={status === 'isQuitting'}
					disabled={!!status}
				/>
				<Button
					label='Удалить аккаунт'
					onClick={confirmDelete}
					severity='danger'
					isSpin={status === 'isDeleting'}
					disabled={!!status}
				/>
			</div>
		</DetailBox>
	);
};
