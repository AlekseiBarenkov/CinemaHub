import { FC, PropsWithChildren, MouseEvent } from 'react';

import './style.scss';

interface ICardThumb {
	className?: string;
	onClick?: () => void;
}
export const CardThumb: FC<PropsWithChildren<ICardThumb>> = ({
	className,
	onClick,
	children
}) => {
	const actualClass = `card-thumb${className ? ` ${className}` : ''}`;

	if (onClick) {
		const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			onClick?.();
		};

		return (
			<button onClick={handleClick} className={`${actualClass} button-thumb`}>
				{children}
			</button>
		);
	}

	return <div className={actualClass}>{children}</div>;
};
