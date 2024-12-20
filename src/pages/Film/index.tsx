import { FC } from 'react';

import {
	Description,
	Persons,
	Reviews,
	SimilarFilms,
	Videos
} from '@src/components/Detail/Film';
import { InfoSection } from '@src/layouts/PageInfo';
import { General } from '@src/components/Detail/General';

import { DetailSkeleton } from '@src/ui/Skeletons/DetailSkeleton';

import { useDetailContext } from '@src/context/hooks/useDetailContext';

import './style.scss';

const Film: FC = () => {
	const { isLoading, data } = useDetailContext<'film_detail'>();

	const { general, persons, videos, similarFilms, reviews } = data;

	const showDescription = !!general?.description;
	const showPersons = !!persons && !!persons.length;
	const showVideos = !!videos?.length;
	const showSimilar = !!similarFilms?.total;
	const showReviews = !!reviews?.total;
	const className = 'film-detail';

	return (
		<InfoSection className='film'>
			{isLoading ? (
				<DetailSkeleton className={className} />
			) : (
				<>
					<General data={general} type='film_detail' className={className} />

					{showDescription && <Description description={general.description as string} />}

					{showPersons && <Persons filmPersons={persons} />}

					{showVideos && <Videos videos={videos} />}

					{showSimilar && <SimilarFilms items={similarFilms.items} />}

					{showReviews && <Reviews data={reviews} />}
				</>
			)}
		</InfoSection>
	);
};
export default Film;
