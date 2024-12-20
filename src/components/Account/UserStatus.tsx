import { FC, useEffect, useState } from 'react';

import { DetailBox } from '@src/layouts/Detail/DetailArticle';
import { DetailItem } from '@src/layouts/Detail/General';

import { useToastActionsContext } from '@src/context/hooks/useToastActionsContext';

import { filmsService } from '@src/services/films';

import { accountTypes, userStatusFields } from '@src/constants/userStatus';

import type { TUserStatusData } from '@src/@types';

const initial: Readonly<TUserStatusData> = {
	usedTotal: 0,
	usedLimit: 0,
	limit: 0,
	accountType: '-'
} as const;

export const UserStatus: FC = () => {
	const showMessage = useToastActionsContext().showMessage;
	const [data, setData] = useState<TUserStatusData>({ ...initial });

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { getAccountStatus } = filmsService;
				const { accountType, totalQuota, dailyQuota } = await getAccountStatus();

				const newData: TUserStatusData = {
					usedTotal: totalQuota.used,
					usedLimit: dailyQuota.used,
					limit: dailyQuota.value,
					accountType: accountTypes[accountType]
				};

				setData(newData);
			} catch (err) {
				const error = err as Error;

				console.group('UserStatus error');
				console.error(error);
				console.groupEnd();
				showMessage('error', error.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const getValue = (key: keyof TUserStatusData) => {
		if (isLoading) {
			return <i className='pi pi-spin pi-spinner'></i>;
		}

		if (key === 'usedLimit') {
			const state = data[key];
			const limit = data.limit;

			let className = 'user-status__used-limit';

			const isEndOfLimit = state >= limit;
			const isCloseToLimit = state >= (limit * 75) / 100 && !isEndOfLimit;
			const isFarToTheLimit = !isEndOfLimit && !isCloseToLimit;

			if (isEndOfLimit) {
				className += ' end-of-limit';
			}

			if (isCloseToLimit) {
				className += ' close-to-limit';
			}

			if (isFarToTheLimit) {
				className += ' far-to-limit';
			}

			return <span className={className}>{state}</span>;
		}

		return data[key]?.toString() ?? '-';
	};

	return (
		<DetailBox className='user-status'>
			{Object.keys(userStatusFields).map((field) => {
				const key = field as keyof TUserStatusData;
				const value = getValue(key);

				return <DetailItem key={field} title={userStatusFields[key]} value={value} />;
			})}
		</DetailBox>
	);
};
