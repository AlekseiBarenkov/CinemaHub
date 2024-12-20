import type { TAccountType, TUserStatusData } from '@src/@types';

export const accountTypes: Record<TAccountType, string> = {
	FREE: 'Базовый',
	EXTENDED: 'Расширенный',
	UNLIMITED: 'Безлимитный'
} as const;

export const userStatusFields: Record<keyof TUserStatusData, string> = {
	accountType: 'Тип доступа',
	limit: 'Суточный лимит запросов',
	usedLimit: 'Запросов за сутки',
	usedTotal: 'Общее число запросов'
} as const;
