import { FC } from 'react';

import { Skeleton } from 'primereact/skeleton';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import {
	DetailImageInner,
	DetailInfo,
	DetailInner,
	DetailWrapper,
	DetailButtonInner
} from '@src/layouts/Detail/General';

interface IProps {
	className?: string;
}

export const DetailSkeleton: FC<IProps> = ({ className }) => {
	const displayMode = useAuthContext().displayMode;

	return (
		<DetailWrapper displayMode={displayMode} className={className}>
			<DetailImageInner className={className}>
				<div className='poster-image-skeleton-inner'>
					<Skeleton className='skeleton'></Skeleton>
				</div>

				<DetailButtonInner className={className}>
					<Skeleton className='skeleton' height='3rem' width='10rem'></Skeleton>
				</DetailButtonInner>
			</DetailImageInner>

			<DetailInner className={className}>
				<Skeleton className='skeleton' width='15rem' height='2.5rem'></Skeleton>

				<Skeleton
					className='skeleton'
					width='30rem'
					height='1.5rem'
					pt={{
						root: {
							style: { marginTop: '1rem' }
						}
					}}
				></Skeleton>

				{displayMode === 'desktop' && (
					<DetailInfo className={className}>
						<Skeleton className='skeleton' width='10rem' height='2rem'></Skeleton>

						<Skeleton
							className='skeleton'
							width='50rem'
							height='23rem'
							pt={{
								root: {
									style: { marginTop: '1rem' }
								}
							}}
						></Skeleton>
					</DetailInfo>
				)}
			</DetailInner>
		</DetailWrapper>
	);
};
