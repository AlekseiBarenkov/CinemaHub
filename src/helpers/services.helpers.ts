import { isAxiosError } from 'axios';
import { isRouteErrorResponse } from 'react-router-dom';

import { errorCodes, errorStatuses, TErrorCodesValues } from '@src/constants/services';

import type { AxiosError } from 'axios';

type TErrorInfo = {
	status: number | null;
	message: string;
	limitExceeded: boolean;
};

type TServices = {
	initialErrorInfo: TErrorInfo;
	_isCodeInStatuses: (code: number) => code is TErrorCodesValues;
	getAxiosErrorInfo: (error: AxiosError) => TErrorInfo;
	fetchDataTimeout: <Type>(
		data: Type,
		neededStatus?: 'success' | 'error',
		daley?: number
	) => Promise<Type>;
	getErrorInfo: (error: Error) => TErrorInfo;
};

export const services: TServices = {
	initialErrorInfo: {
		status: null,
		message: '',
		limitExceeded: false
	},

	_isCodeInStatuses: (code): code is TErrorCodesValues => {
		return code in errorStatuses;
	},
	getAxiosErrorInfo: (error) => {
		let status: number | null = null;
		let message: string = error.message;
		const limitExceeded = error.response?.status === errorCodes.REQUEST_LIMIT_EXCEEDED;

		const errorResponse = error.response;
		const statusCode = errorResponse?.status ?? null;

		if (statusCode) {
			status = statusCode;

			if (services._isCodeInStatuses(statusCode)) {
				message = errorStatuses[statusCode];
			}
		} else if (error.status) {
			status = error.status;
		}

		return { status, message, limitExceeded };
	},

	fetchDataTimeout: (data, neededStatus = 'success', daley = 500) => {
		return new Promise(function (resolve, reject) {
			setTimeout(() => {
				if (neededStatus === 'success') {
					resolve(data);
				} else reject(new Error('Test error message'));
			}, daley);
		});
	},

	getErrorInfo: (error) => {
		if (isRouteErrorResponse(error)) {
			return {
				...services.initialErrorInfo,
				status: error.status,
				message: error.statusText
			};
		}

		if (isAxiosError(error)) {
			return services.getAxiosErrorInfo(error);
		}

		return { ...services.initialErrorInfo, message: error.message };
	}
};
