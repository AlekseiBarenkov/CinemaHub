import { useContext } from 'react';

import { DetailContext } from '../constants';

import type { TDataDetailItemTypesKeys, TDetailContext } from '@src/@types';

export const useDetailContext = <T extends TDataDetailItemTypesKeys>() => {
	const detailContext = useContext(DetailContext);

	if (!detailContext) {
		throw Error('useDetailContext error');
	}

	return detailContext as TDetailContext<T>;
};
