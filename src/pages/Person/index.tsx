import { FC } from 'react';

import { InfoSection } from '@src/layouts/PageInfo';
import { Filmography } from '@src/components/Detail/Person';
import { DetailSkeleton } from '@src/ui/Skeletons/DetailSkeleton';
import { General } from '@src/components/Detail/General';

import { useDetailContext } from '@src/context/hooks/useDetailContext';

import './style.scss';

const Person: FC = () => {
	const { isLoading, data } = useDetailContext<'person_detail'>();

	const className = 'person-detail';

	const showFilmography = !!data?.filmography && !!data.filmography.length;

	return (
		<InfoSection className='person'>
			{isLoading ? (
				<DetailSkeleton className={className} />
			) : (
				<>
					<General
						data={data.personDetail}
						type='person_detail'
						className={className}
					></General>

					{showFilmography && <Filmography films={data.filmography} />}
				</>
			)}
		</InfoSection>
	);
};

export default Person;
