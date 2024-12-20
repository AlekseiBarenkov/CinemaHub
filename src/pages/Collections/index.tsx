import { FC } from 'react';

import { CollectionItem } from '@src/components/CollectionItem';
import { InfoSection } from '@src/layouts/PageInfo';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import { collectionsDirections, otherDirections } from '@src/constants/directions';

import type { TCollectionsDirections, TOtherDirections } from '@src/@types';

import './style.scss';

const list: TCollectionsDirections & TOtherDirections = {
	...otherDirections,
	...collectionsDirections
};

const Collections: FC = () => {
	const displayMode = useAuthContext().displayMode;

	return (
		<InfoSection className={`collections ${displayMode}`}>
			{Object.keys(list).map((key) => {
				const path = key as keyof typeof list;
				const { label, img } = list[path];

				return (
					<CollectionItem
						key={path}
						label={label}
						img={img}
						path={path}
						displayMode={displayMode}
					/>
				);
			})}
		</InfoSection>
	);
};

export default Collections;
