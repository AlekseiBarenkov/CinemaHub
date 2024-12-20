import { FC } from 'react';

import { detail } from '@src/helpers/detail.helpers';

export const DetailImage: FC<{ url: string; className?: string }> = ({
	url,
	className
}) => {
	const fullClassName = detail.getDetailClassName({ second: className, sub: 'image' });

	return (
		<img
			src={url}
			alt='poster'
			className={`${fullClassName} poster-image`}
			loading='lazy'
		/>
	);
};
