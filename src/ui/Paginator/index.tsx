import { FC, useMemo } from 'react';

import { Paginator as PaginatorPR, PaginatorTemplateOptions } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import './style.scss';

interface IPaginator {
	totalItems: number;
	page: number;
	setPage: (num: number) => void;
	limit: number;
}

const layoutForMobile =
	'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink';
const layout =
	'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport';

export const Paginator: FC<IPaginator> = ({ totalItems, limit, page, setPage }) => {
	const displayMode = useAuthContext().displayMode;

	const pageLinks = useMemo(() => {
		const options: PaginatorTemplateOptions = {
			layout: displayMode === 'mobile' ? layoutForMobile : layout,
			CurrentPageReport: (options) => {
				return (
					<span className='paginator__page-report'>
						{options.currentPage} из {options.totalPages}
					</span>
				);
			}
		};

		if (displayMode !== 'mobile') {
			options.PageLinks = (options) => {
				if (
					(options.view.startPage === options.page && options.view.startPage !== 0) ||
					(options.view.endPage === options.page &&
						options.page + 1 !== options.totalPages)
				) {
					const className = classNames(options.className, { 'p-disabled': true });

					return (
						<span className={className} style={{ userSelect: 'none' }}>
							...
						</span>
					);
				}

				return (
					<button type='button' className={options.className} onClick={options.onClick}>
						{options.page + 1}
						<Ripple />
					</button>
				);
			};

			options.CurrentPageReport = (options) => {
				return (
					<span className='paginator__page-report'>
						{options.first} - {options.last} из {options.totalRecords}
					</span>
				);
			};
		}
		return options;
	}, [displayMode]);

	const handlePage = (newPage: number) => {
		setPage(newPage);
		document.body.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<PaginatorPR
			className={`paginator ${displayMode}`}
			template={pageLinks}
			first={limit * (page - 1)}
			rows={limit}
			totalRecords={totalItems}
			onPageChange={(event) => handlePage(event.page + 1)}
		></PaginatorPR>
	);
};
