import {
	FC,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Toast } from 'primereact/toast';

import { useFavoriteStore } from '@src/store/useFavoriteStore';

import { authService } from '@src/services/auth';

import { useDisplayMode } from '@src/hooks/useDisplayMode';

import { AuthContext, AuthContextActions, ToastContextActions } from '../constants';

import type {
	IAuthContext,
	TNavigationState,
	TNullable,
	TShowMessage,
	TUser
} from '@src/@types';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const getFavorites = useFavoriteStore((state) => state.controls.getFavorites);
	const displayMode = useDisplayMode();
	const locationState = useLocation().state as TNavigationState | undefined;
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState<TNullable<TUser>>(null);

	const toast = useRef<Toast>(null);

	const locationFrom = locationState?.from;

	useEffect(() => {
		(async () => {
			try {
				const { initUser } = authService;
				const currentUser = await initUser();

				getFavorites(currentUser?.id);
				setUser(currentUser);
			} catch (error) {
				console.group('getUser error:');
				console.error(error);
				console.groupEnd();
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const showMessage: TShowMessage = useCallback((type, message, isSticky = false) => {
		toast.current?.show({
			severity: type,
			detail: message,
			sticky: isSticky
		});
	}, []);

	const setAuth = useCallback(
		async (currentUser: TNullable<TUser>) => {
			setUser(currentUser);
			getFavorites(currentUser?.id);

			if (locationFrom) {
				navigate(locationFrom, { replace: true });
			}
		},
		[locationFrom]
	);

	const value: IAuthContext = useMemo(
		() => ({ user, displayMode, isLoading }),
		[user, displayMode, isLoading]
	);

	const authActions = useMemo(() => ({ setAuth }), [setAuth]);
	const toastActions = useMemo(() => ({ showMessage }), [showMessage]);

	return (
		<AuthContext.Provider value={value}>
			<Toast ref={toast} />
			<AuthContextActions.Provider value={authActions}>
				<ToastContextActions.Provider value={toastActions}>
					{children}
				</ToastContextActions.Provider>
			</AuthContextActions.Provider>
		</AuthContext.Provider>
	);
};
