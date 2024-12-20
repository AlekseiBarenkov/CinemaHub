type TCookieOptions = {
	path?: string;
	secure?: boolean;
	'max-age'?: number;
	expires?: Date | string;
};

interface ICookieApi {
	getCookie: (name: string) => string | undefined;
	setCookie: (name: string, value: string, options: TCookieOptions) => void;
	deleteCookie: (name: string) => void;
}

export const cookieApi: ICookieApi = {
	getCookie: (name) => {
		const matches = document.cookie.match(
			new RegExp(
				// eslint-disable-next-line no-useless-escape
				'(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
			)
		);

		return matches ? decodeURIComponent(matches[1]) : undefined;
	},
	setCookie: (name, value, options = {}) => {
		options = {
			path: '/',
			...options
		};

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}

		let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

		for (const key in options) {
			const optionKey = key as keyof typeof options;
			updatedCookie += '; ' + optionKey;
			const optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += '=' + optionValue;
			}
		}

		document.cookie = updatedCookie;
	},
	deleteCookie(name) {
		cookieApi.setCookie(name, '', {
			'max-age': -1
		});
	}
};
