import { useContext } from 'react';

import { GalleryContext } from '../constants';

export const useGalleryContext = () => {
	const galleryContext = useContext(GalleryContext);

	if (!galleryContext) {
		throw Error('useGalleryContext error');
	}

	return galleryContext;
};
