import { createContext } from 'react';

import type {
	IAuthContext,
	IAuthContextActions,
	IToastContextActions,
	TDetailContext,
	IGalleryContext,
	ITooltipActionsContext
} from '@src/@types';

export const AuthContext = createContext<IAuthContext | null>(null);
export const AuthContextActions = createContext<IAuthContextActions | null>(null);
export const ToastContextActions = createContext<IToastContextActions | null>(null);

export const DetailContext = createContext<TDetailContext | null>(null);

export const GalleryContext = createContext<IGalleryContext | null>(null);

export const TooltipActionsContext = createContext<ITooltipActionsContext | null>(null);
