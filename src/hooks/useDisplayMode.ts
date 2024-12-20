import { useState, useEffect } from 'react';

import type { TDisplayMode } from '@src/@types';

const getDisplayMode = (width: number): TDisplayMode => {
	if (width > 991) {
		return 'desktop';
	} else if (width <= 991 && width > 480) {
		return 'tablet';
	} else {
		return 'mobile';
	}
};

export const useDisplayMode = () => {
	const [mode, setMode] = useState<TDisplayMode>(getDisplayMode(window.innerWidth));

	useEffect(() => {
		const handlerResize = () => {
			const currMode = getDisplayMode(window.innerWidth);
			setMode(currMode);
		};
		window.addEventListener('resize', handlerResize);

		return () => {
			window.removeEventListener('resize', handlerResize);
		};
	}, []);

	return mode;
};
