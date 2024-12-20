import { FC } from 'react';

import { StickyFooter } from '@src/layouts/StickyFooter';
import { InfoHeader, InfoSection } from '@src/layouts/PageInfo';
import { MovieFilters } from '@src/components/MovieFilters';
import { ItemsList } from '@src/components/ItemsList';
import { Paginator } from '@src/ui/Paginator';

import { filters } from '@src/helpers/filters.helpers';

import { useFilmsData } from '@src/queries/useFilmsData';

import { useGalleryContext } from '@src/context/hooks/useGalleryContext';

import { galleryDirections } from '@src/constants/directions';
import { RESPONSE_ITEMS_LIMIT } from '@src/constants/services';

import './style.scss';

const Gallery: FC = () => {
	const { direction } = useGalleryContext();

	const {
		isLoading,
		isLibIncorrectWork,
		showPaginator,
		data,
		isError,
		error,
		page,
		setPage
	} = useFilmsData(direction);

	const { label } = galleryDirections[direction];

	if (isError) {
		throw error;
	}

	if (isLibIncorrectWork) {
		return (
			<p className='empty-message'>
				Библиотека "kinopoiskapiunofficial.tech" сейчас не может прислать данные для
				текущей подборки. Попробуйте позже, либо выберите другую подборку 😕
			</p>
		);
	}

	return (
		<InfoSection className='gallery'>
			<InfoHeader className='gallery__header'>{label}</InfoHeader>

			{filters.isNeedFilters(direction) && <MovieFilters />}

			<div className='gallery__content'>
				<ItemsList type='film_card' data={data?.items} isLoading={isLoading} />
			</div>

			{showPaginator && (
				<StickyFooter className='gallery__footer'>
					<Paginator
						totalItems={data?.total as number}
						page={page}
						setPage={setPage}
						limit={RESPONSE_ITEMS_LIMIT}
					/>
				</StickyFooter>
			)}
		</InfoSection>
	);
};

export default Gallery;
