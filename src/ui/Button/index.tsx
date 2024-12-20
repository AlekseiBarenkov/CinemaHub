import { FC, MouseEvent } from 'react';

import './style.scss';

type TSeverity = 'main' | 'success' | 'warning' | 'secondary' | 'danger';

interface IButton {
	label: string;
	isSpin?: boolean;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	severity?: TSeverity;
	ico?: string;
	className?: string;
	type?: HTMLButtonElement['type'];
}

export const Button: FC<IButton> = ({
	type,
	label,
	isSpin,
	ico = '',
	severity = 'main',
	disabled = false,
	className,
	onClick
}) => {
	const icoClassName = isSpin
		? 'pi pi-spin pi-spinner'
		: ico
			? `button__ico pi ${ico}`
			: undefined;

	return (
		<button
			disabled={disabled}
			type={type}
			onClick={onClick}
			className={`button bg-color-${severity}${className ? ` ${className}` : ''}`}
		>
			{!!icoClassName && <i className={icoClassName}></i>}

			<div className='button__label'>{label}</div>
		</button>
	);
};
