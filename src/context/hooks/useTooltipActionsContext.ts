import { useContext } from 'react';

import { TooltipActionsContext } from '../constants';

export const useTooltipActionsContext = () => {
	const tooltipActions = useContext(TooltipActionsContext);

	if (!tooltipActions) {
		throw Error('useTooltipActionsContext error');
	}

	return tooltipActions;
};
