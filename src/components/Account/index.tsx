import { FC } from 'react';

import { InfoHeader, InfoSection } from '@src/layouts/PageInfo';
import { UserProfile } from './UserProfile';
import { UserFavorites } from './UserFavorites';
import { UserStatus } from './UserStatus';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import type { TUser } from '@src/@types';

import './style.scss';

const Account: FC = () => {
	const user = useAuthContext().user as TUser;
	const displayMode = useAuthContext().displayMode;

	return (
		<InfoSection className={`account ${displayMode}`}>
			<InfoHeader className='account__header'>Привет, {user.name}!</InfoHeader>

			<div className='account__info'>
				<UserProfile />

				<UserStatus />
			</div>

			<UserFavorites />
		</InfoSection>
	);
};
export default Account;
