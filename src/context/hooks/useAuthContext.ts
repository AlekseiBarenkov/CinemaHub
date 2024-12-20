import { useContext } from 'react';

import { AuthContext } from '../constants';

export const useAuthContext = () => {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw Error('useAuthContext error');
	}

	return authContext;
};
