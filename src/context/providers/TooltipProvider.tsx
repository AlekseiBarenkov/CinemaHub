import { FC, PropsWithChildren, useCallback, useMemo, useRef } from 'react';

import { Tooltip } from 'primereact/tooltip';

import { TooltipActionsContext } from '../constants';

import type { ITooltipActionsContext } from '@src/@types';

export const TooltipProvider: FC<PropsWithChildren> = ({ children }) => {
	const ref = useRef<Tooltip>(null);

	const showTooltip: ITooltipActionsContext['showTooltip'] = useCallback((event) => {
		ref.current?.loadTargetEvents(event.currentTarget);
	}, []);

	const closeTooltip = useCallback(() => {
		ref.current?.unloadTargetEvents();
		ref.current?.hide();
	}, []);

	const tooltipActionsContext = useMemo(
		() => ({ showTooltip, closeTooltip }),
		[showTooltip, closeTooltip]
	);

	return (
		<TooltipActionsContext.Provider value={tooltipActionsContext}>
			<Tooltip ref={ref} />

			{children}
		</TooltipActionsContext.Provider>
	);
};
