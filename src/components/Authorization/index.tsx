import { FC, useState } from 'react';

import { Divider } from 'primereact/divider';

import { Button } from '@src/ui/Button';
import { Modal } from '@src/ui/Modal';
import { AuthForm } from './AuthForm/AuthForm';

import { useAuthContext } from '@src/context/hooks/useAuthContext';

import { authStates, registerStates } from '@src/constants/forms';

import './style.scss';

const Authorization: FC = () => {
	const { isLoading, displayMode } = useAuthContext();
	const [isRegister, setIsRegister] = useState(false);
	const isMobile = displayMode === 'mobile';

	return (
		<div className={`auth ${displayMode}`}>
			<div className='auth__card'>
				<AuthForm type='AUTH' formStates={authStates} />
			</div>

			<div className='auth__divider'>
				<Divider layout='vertical' className='auth__divider-vertical'>
					<b>ИЛИ</b>
				</Divider>

				<Divider layout='horizontal' className='auth__divider-horizontal' align='center'>
					<b>ИЛИ</b>
				</Divider>
			</div>

			<div className='auth__card'>
				<Button
					disabled={isLoading}
					onClick={() => setIsRegister(true)}
					label='Регистрация'
					ico='pi-user-plus'
					severity='success'
				/>
			</div>

			<Modal
				wrapperClass='auth__modal'
				contentClass='auth__modal-content'
				headerClass='auth__modal-header'
				isOpen={isRegister}
				onClose={() => setIsRegister(false)}
				maximized={isMobile}
			>
				<AuthForm type='REGISTER' formStates={registerStates} />
			</Modal>
		</div>
	);
};

export default Authorization;
