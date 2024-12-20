import { useEffect, useRef } from 'react';

export const useOutsideClick = (isActive: boolean, callback: () => void) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isActive) {
			const handleClickOutside = (event: MouseEvent | TouchEvent) => {
				if (ref.current && !ref.current.contains(event.target as Node)) {
					callback();
				}
			};

			document.addEventListener('mouseup', handleClickOutside);
			document.addEventListener('touchend', handleClickOutside);
			document.addEventListener('touchmove', handleClickOutside);

			return () => {
				document.removeEventListener('mouseup', handleClickOutside);
				document.removeEventListener('touchend', handleClickOutside);
				document.removeEventListener('touchmove', handleClickOutside);
			};
		}
	}, [isActive, callback]);

	return ref;
};
