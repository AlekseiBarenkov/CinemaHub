import { FC, lazy, Suspense } from 'react';

import { PageLoader } from '@src/components/PageLoader';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

export const Authorization = lazy(() => import('@src/components/Authorization'));
export const Account = lazy(() => import('@src/components/Account'));

const Profile: FC = () => {
	const { user, isLoading } = useAuthContext();

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<Suspense fallback={<PageLoader />}>
			{!user ? <Authorization /> : <Account />}
		</Suspense>
	);
};

export default Profile;
