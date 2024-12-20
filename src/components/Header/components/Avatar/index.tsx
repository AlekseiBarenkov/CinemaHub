import { Skeleton } from 'primereact/skeleton';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import { routesPaths } from '@src/constants/routesPaths';

import './style.scss';

const AvatarSkeleton: FC<{ className: string }> = ({ className }) => {
	return <Skeleton shape='circle' className={className}></Skeleton>;
};

export const Avatar: FC = () => {
	const { user, isLoading } = useAuthContext();
	const profileLocation = `/${routesPaths.PROFILE}`;
	const location = useLocation();
	const isProfileLocation = location.pathname === profileLocation;

	const icoClassName = 'avatar__ico';
	const className = `${icoClassName}${!user ? ` ${icoClassName}--not-auth bg-color-danger` : ''}${isProfileLocation ? ` ${icoClassName}--is-profile-location` : ''}`;

	return (
		<div className='avatar'>
			{isLoading ? (
				<AvatarSkeleton className={`${icoClassName} skeleton`} />
			) : (
				<Link
					to={routesPaths.PROFILE}
					className={className}
					onClick={(e) => isProfileLocation && e.preventDefault()}
				>
					{!user ? 'Войти' : <i className='pi pi-user'></i>}
				</Link>
			)}
		</div>
	);
};
