import { useId } from 'react';

import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

import type {
	TGalleryFiltersState,
	TGalleryFiltersTypes,
	TInputFieldsProperties
} from '@src/@types';

interface IMovieFiltersParams<K extends keyof TGalleryFiltersState> {
	filterKey: K;
	inputClassName: string;
	panelClassName: string;
	state: TGalleryFiltersState[K];
	description: TInputFieldsProperties<K>;
	currOptions: TGalleryFiltersTypes[K][];
	onChange: (state: TGalleryFiltersState[K]) => void;
}

const propertiesToSearch: (keyof TGalleryFiltersState)[] = [
	'countries',
	'genres',
	'year',
	'yearFrom',
	'yearTo'
];

export const MovieFiltersInput = <K extends keyof TGalleryFiltersState>(
	params: IMovieFiltersParams<K>
) => {
	const {
		filterKey,
		description,
		state,
		currOptions,
		panelClassName,
		inputClassName,
		onChange
	} = params;
	const inputID = useId();
	const labelKey =
		filterKey === 'countries' ? 'country' : filterKey === 'genres' ? 'genre' : 'name';
	const isShowClear = !('isRequired' in description && description.isRequired);

	return (
		<FloatLabel>
			<Dropdown
				panelClassName={panelClassName}
				className={inputClassName}
				inputId={inputID}
				value={state}
				disabled={!currOptions.length}
				onChange={(e: DropdownChangeEvent) => onChange(e.value)}
				options={currOptions}
				optionLabel={labelKey}
				showClear={isShowClear}
				filter={propertiesToSearch.includes(filterKey)}
			/>
			<label htmlFor={inputID}>{description.label}</label>
		</FloatLabel>
	);
};
