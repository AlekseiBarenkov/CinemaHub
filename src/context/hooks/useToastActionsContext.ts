import { useContext } from 'react';

import { ToastContextActions } from '../constants';

export const useToastActionsContext = () => {
	const toastContextActions = useContext(ToastContextActions);

	if (!toastContextActions) {
		throw Error('useToastActions error');
	}

	return toastContextActions;
};
