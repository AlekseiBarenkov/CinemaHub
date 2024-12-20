import { FC, PropsWithChildren } from 'react';

import { Dialog } from 'primereact/dialog';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import './style.scss';

interface IModal {
	isOpen: boolean;
	onClose: () => void;
	showHeader?: boolean;
	maximized?: boolean;
	wrapperClass?: string;
	headerClass?: string;
	contentClass?: string;
}

export const Modal: FC<PropsWithChildren<IModal>> = ({
	children,
	isOpen,
	onClose,
	wrapperClass,
	headerClass,
	contentClass,
	showHeader = true,
	maximized = false
}) => {
	const displayMode = useAuthContext().displayMode;

	const mainClass = `modal ${displayMode}${wrapperClass ? ` ${wrapperClass}` : ''}${maximized ? ' modal--maximized' : ''}`;

	return (
		<Dialog
			draggable={false}
			className={mainClass}
			headerClassName={`modal__header${headerClass ? ` ${headerClass}` : ''}`}
			contentClassName={`modal__content${contentClass ? ` ${contentClass}` : ''}`}
			visible={isOpen}
			showHeader={showHeader}
			onMaskClick={() => {
				!showHeader && onClose();
			}}
			onHide={() => {
				isOpen && onClose();
			}}
		>
			{children}
		</Dialog>
	);
};
