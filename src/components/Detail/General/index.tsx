import {
	DetailButtonInner,
	DetailImage,
	DetailImageInner,
	DetailInfo,
	DetailInfoTitle,
	DetailInner,
	DetailSubtitle,
	DetailTitle,
	DetailWrapper
} from '@src/layouts/Detail/General';
import { GeneralItem } from './GeneralItem';
import { FavoriteButton } from './FavoriteButton';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import { detail } from '@src/helpers/detail.helpers';

import { filmInfo, personInfo } from '@src/constants/detailInfo';

import type {
	TDataDetailItemTypes,
	TDataDetailItemTypesKeys,
	TFilmInfo,
	TPassableDataEntry,
	TPersonInfo,
	TPersonInfoDataEntry
} from '@src/@types';

type TProps<T extends TDataDetailItemTypesKeys> = {
	type: T;
	data: TDataDetailItemTypes[T];
	className: string;
};
type TInfoObject<T extends TDataDetailItemTypesKeys> = T extends 'film_detail'
	? TFilmInfo
	: TPersonInfo;

export const General = <T extends TDataDetailItemTypesKeys>(props: TProps<T>) => {
	const { type, data, className } = props;
	const displayMode = useAuthContext().displayMode;

	const title = detail.getTitle(data);

	const isPersonDetail = detail.isPersonDetail(data);
	const showNameOrigin = isPersonDetail && !!data.nameRu && !!data.nameEn;
	const showSlogan = !isPersonDetail && !!data.slogan;

	const infoObject = isPersonDetail
		? (personInfo as TInfoObject<'person_detail'>)
		: (filmInfo as TInfoObject<'film_detail'>);

	const entries = Object.entries(infoObject).filter((entry) => {
		if (isPersonDetail) {
			const [property] = entry as TPersonInfoDataEntry;

			return property !== 'death' || !!data[property];
		}
		return true;
	}) as TPassableDataEntry<T>[];

	return (
		<DetailWrapper displayMode={displayMode} className={className}>
			<DetailImageInner className={className}>
				<DetailImage url={data.posterUrl} className={className} />

				<DetailButtonInner className={className}>
					<FavoriteButton item={data} type={type} />
				</DetailButtonInner>
			</DetailImageInner>

			<DetailInner className={className}>
				<DetailTitle className={className}>{title}</DetailTitle>

				{showNameOrigin && (
					<DetailSubtitle className={className}>{data.nameEn}</DetailSubtitle>
				)}

				{showSlogan && (
					<DetailSubtitle className={className}>«{data.slogan}»</DetailSubtitle>
				)}

				<DetailInfo className={className}>
					<DetailInfoTitle className={className}>
						{isPersonDetail ? 'О персоне' : 'О фильме'}
					</DetailInfoTitle>

					{entries.map((entry) => (
						<GeneralItem
							key={entry[0]}
							type={type}
							data={entry}
							detail={data as TDataDetailItemTypes[T]}
						/>
					))}
				</DetailInfo>
			</DetailInner>
		</DetailWrapper>
	);
};
