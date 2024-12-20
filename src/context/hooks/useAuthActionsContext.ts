import { useContext } from 'react';

import { AuthContextActions } from '../constants';

export const useAuthActionsContext = () => {
	const authContextActions = useContext(AuthContextActions);

	if (!authContextActions) {
		throw Error('useAuthActions error');
	}

	return authContextActions;
};
