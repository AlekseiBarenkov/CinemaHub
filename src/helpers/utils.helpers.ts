export const utils = {
	exhaustiveCheck(property: never) {
		throw new Error(`Обработайте тип значения: ${property}`);
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	cacheResults: <T extends (...args: any[]) => Promise<any>>(fn: T): T => {
		const cache = new Map<string, Promise<ReturnType<T>>>();

		return (async (...args: Parameters<T>) => {
			const key = JSON.stringify(args);

			if (!cache.has(key)) {
				const resultPromise = fn(...args);
				cache.set(key, resultPromise);

				return resultPromise;
			}

			return cache.get(key);
		}) as T;
	}
};
