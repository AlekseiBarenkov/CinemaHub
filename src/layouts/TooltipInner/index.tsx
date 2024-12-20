import { FC, PropsWithChildren } from 'react';

import { useTooltipActionsContext } from '@src/context/hooks/useTooltipActionsContext';

import type { TooltipHTMLAttributes } from 'primereact/tooltip/tooltipoptions';

import './style.scss';

interface IProps {
	value: TooltipHTMLAttributes['data-pr-tooltip'];
	tooltipClassName?: TooltipHTMLAttributes['data-pr-classname'];
	wrapperClassName?: string;
	position?: TooltipHTMLAttributes['data-pr-position'];
	disabled?: boolean;
}

export const TooltipInner: FC<PropsWithChildren<IProps>> = ({
	value,
	tooltipClassName,
	wrapperClassName,
	position,
	children,
	disabled
}) => {
	const { showTooltip, closeTooltip } = useTooltipActionsContext();

	return (
		<div
			className={`tooltip-wrapper${wrapperClassName ? ` ${wrapperClassName}` : ''}`}
			data-pr-disabled={disabled}
			data-pr-tooltip={value}
			data-pr-classname={`tooltip${tooltipClassName ? ` ${tooltipClassName}` : ''}`}
			data-pr-position={position}
			onMouseEnter={showTooltip}
			onMouseLeave={closeTooltip}
		>
			{children}
		</div>
	);
};
