import { CSSProperties, FC, PropsWithChildren } from 'react';

export const CarouselItem: FC<PropsWithChildren<{ style?: CSSProperties }>> = ({
	children,
	style
}) => {
	return (
		<div style={style} className='carousel__item'>
			{children}
		</div>
	);
};
