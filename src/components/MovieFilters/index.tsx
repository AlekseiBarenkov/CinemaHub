import { FC } from 'react';
import { Skeleton } from 'primereact/skeleton';

import { MovieFiltersInput } from './MovieFiltersInput';

import { useMoviesFiltersStore } from '@src/store/useMoviesFiltersStore';

import { galleryFiltersFields } from '@src/constants/filters';

import type { TGalleryFiltersOptions, TGalleryFiltersState } from '@src/@types';

import './style.scss';

const wrapperClassName = 'movie-filters';
const panelClassName = `${wrapperClassName}__panel`;
const inputClassName = `${wrapperClassName}__input`;

const getCurrentOptions = (
	state: keyof TGalleryFiltersState,
	options: TGalleryFiltersOptions
) => {
	switch (state) {
		case 'ratingFrom':
		case 'ratingTo':
			return options.rating;

		case 'year':
		case 'yearFrom':
		case 'yearTo':
			return options.year;

		default:
			return options[state];
	}
};

export const MovieFilters: FC = () => {
	const isLoading = useMoviesFiltersStore((state) => state.isLoading);
	const filtersKeys = useMoviesFiltersStore((state) => state.filtersKeys);
	const filters = useMoviesFiltersStore((state) => state.filters);
	const options = useMoviesFiltersStore((state) => state.options);
	const setFilter = useMoviesFiltersStore((state) => state.controls.setFilter);

	const skeleton = Array(4)
		.fill(null)
		.map((_, idx) => (
			<Skeleton key={idx} className={`${inputClassName} skeleton`}></Skeleton>
		));

	const content = filtersKeys.map((key) => {
		const description = galleryFiltersFields[key];

		return (
			<MovieFiltersInput
				key={key}
				panelClassName={panelClassName}
				inputClassName={inputClassName}
				onChange={(state) => setFilter({ [key]: state })}
				filterKey={key}
				state={filters[key]}
				description={description}
				currOptions={getCurrentOptions(key, options)}
			/>
		);
	});

	return <section className={wrapperClassName}>{isLoading ? skeleton : content}</section>;
};
