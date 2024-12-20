import { FC, PropsWithChildren } from 'react';

import { detail } from '@src/helpers/detail.helpers';

import type { TDisplayMode } from '@src/@types';

import './style.scss';

type TProps = {
	displayMode: TDisplayMode;
	className?: string;
};
export const DetailWrapper: FC<PropsWithChildren<TProps>> = ({
	displayMode,
	className,
	children
}) => {
	const fullClassName = detail.getDetailClassName({ second: className });

	return <article className={`${fullClassName} ${displayMode}`}>{children}</article>;
};
