import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { DetailItem } from '@src/layouts/Detail/General';

import { date } from '@src/helpers/date.helpers';
import { detail as itemDetail } from '@src/helpers/detail.helpers';
import { utils } from '@src/helpers/utils.helpers';

import type {
	TDataDetailItemTypes,
	TDataDetailItemTypesKeys,
	TFilmDetail,
	TPassableDataEntry
} from '@src/@types';

interface IDetailItem<T extends TDataDetailItemTypesKeys> {
	type: T;
	data: TPassableDataEntry<T>;
	detail: TDataDetailItemTypes[T];
}

type TVoicesKeys = keyof Pick<
	TFilmDetail,
	'ratingFilmCriticsVoteCount' | 'ratingImdbVoteCount' | 'ratingKinopoiskVoteCount'
>;

export const GeneralItem = <T extends TDataDetailItemTypesKeys>(
	props: IDetailItem<T>
) => {
	const title = props.data[1];

	const getValue = () => {
		let value: string | JSX.Element = '-';

		if (props.type === 'film_detail') {
			const { data, detail } = props as IDetailItem<'film_detail'>;

			const property = data[0];

			switch (property) {
				case 'year':
				case 'countries':
				case 'genres': {
					const links = itemDetail.getURLWithSearchParams(detail, property);

					if (links?.length) {
						value = (
							<>
								{links.map((item, idx) => {
									return (
										<Fragment key={idx}>
											{idx > 0 && ', '}

											<Link to={item.url} className='detail-link'>
												{item.name}
											</Link>
										</Fragment>
									);
								})}
							</>
						);
					}

					break;
				}

				case 'filmLength': {
					const minutes = detail[property];

					if (typeof minutes === 'number' && minutes > 0) {
						const h = Math.floor(minutes / 60);
						const m = Math.floor(minutes % 60);
						const hDisplay = h < 10 ? `0${h}` : h;
						const mDisplay = m < 10 ? `0${m}` : m;

						value = `${hDisplay} ч ${mDisplay} мин`;
					}

					break;
				}

				case 'nameOriginal':
					value = detail[property] ? detail[property] : value;
					break;

				case 'ratingAgeLimits': {
					const ageLimit = itemDetail.getAgeRating(detail[property], detail.ratingMpaa);
					value = ageLimit ? ageLimit : value;
					break;
				}

				case 'ratingFilmCritics':
				case 'ratingImdb':
				case 'ratingKinopoisk': {
					const voicesKey: TVoicesKeys =
						property === 'ratingFilmCritics'
							? 'ratingFilmCriticsVoteCount'
							: property === 'ratingImdb'
								? 'ratingImdbVoteCount'
								: 'ratingKinopoiskVoteCount';
					const rating = detail[property];
					const voices = detail[voicesKey];

					value = rating ? `${rating}${voices ? ` / ${voices} оценок` : ''}` : value;
					break;
				}

				case 'ratingMpaa':
					value = detail[property] ? detail[property].toUpperCase() : value;
					break;

				default:
					utils.exhaustiveCheck(property);

					break;
			}
		}

		if (props.type === 'person_detail') {
			const { data, detail } = props as IDetailItem<'person_detail'>;
			const property = data[0];

			switch (property) {
				case 'birthplace':
				case 'hasAwards':
				case 'profession': {
					value = detail[property] ? detail[property].toString() : value;
					break;
				}

				case 'growth': {
					if (detail[property]) {
						value = `${Number(detail[property]) / 100} м`;
					}

					break;
				}

				case 'birthday':
				case 'death': {
					if (detail[property]) {
						const dateStr = date.getFullDate(detail[property]);

						if (dateStr) {
							value = `${dateStr}${property === 'birthday' && detail.age ? `, ${detail.age} лет` : ''}`;
						}
					}
					break;
				}

				case 'spouses': {
					const spouses = detail[property];
					if (spouses?.length) {
						value = (
							<>
								{spouses.map((item, idx) => {
									const spouseName = item.name ? item.name : '-';
									const divorcedReason = item.divorcedReason ?? '';
									const childrenCount = item.children;
									const children = childrenCount
										? `${childrenCount > 1 ? `${childrenCount} детей` : `1 ребенок`}`
										: '';

									return (
										<div key={idx} className='spouse'>
											{spouseName}
											{divorcedReason ? ` ${divorcedReason}` : ''}
											{!!children && (
												<>
													{' - '}
													<span>{children}</span>
												</>
											)}
										</div>
									);
								})}
							</>
						);
					}
					break;
				}

				default:
					utils.exhaustiveCheck(property);
					break;
			}
		}

		return value;
	};

	return <DetailItem title={title} value={getValue()} />;
};
