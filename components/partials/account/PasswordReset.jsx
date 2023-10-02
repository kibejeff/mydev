import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { customPhone, sendPassOtp } from '~/features/user/userSlice';

const { Title } = Typography;

const EmailConfirmForm = () => {
	const { loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	const [email, setEmail] = useState('');

	const onFinish = async (values) => {
		if (values.username.charAt(0) !== '0') {
			toast.info('Invalid mobile number format');
		} else {
			values.username = await '+254' + values.username.slice(1);
			const res = await dispatch(sendPassOtp(values))
      if (res?.payload?.success) {
        await dispatch(customPhone(values.username))
        await toast.success("OTP code sent.")
        await router.push('/account/account-verify');
      }else{
        toast.error("Invalid mobile number. Check your phone number and try again!")
      }
			
		}
	};

	const onFinishFailed = (errorInfo) => {
		return true;
	};

	return (
		<div
			style={{ width: '450px', margin: '10px auto 50px auto', padding: '30px' }}
		>
			<div className='text-center'>
				<h3>
					<i className='fa fa-lock fa-4x'></i>
				</h3>
			</div>

			<div className=''>
				<h2 style={{ fontSize: '30px' }}>Forgot Password?</h2>
				<p style={{ fontSize: '13px' }}>You can reset your password here.</p>
				<Form
					name='email-confirm'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					style={{ background: '#fff', borderRadius: '20px' }}
				>
					<div className='form-group'>
						<Form.Item
							name='username'
							rules={[
								{
									required: true,
									message: 'Please input your phone number!',
								},
							]}
						>
							<Input
								minLength={10}
								maxLength={10}
								className='form-control'
								type='text'
								placeholder='Phone Number'
							/>
						</Form.Item>
					</div>
					<Form.Item style={{ textAlign: 'center' }}>
						<button
							disabled={loading}
							htmlType='submit'
							className='ps-btn ps-btn--fullwidth'
						>
							{loading ? (
								<span className='bnt-auth-text loader'></span>
							) : (
								<span className='bnt-auth-text'>Submit</span>
							)}
						</button>
					</Form.Item>
				</Form>
				<p>
					<Link href='/account/login'>
						<a>Back to login page</a>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default EmailConfirmForm;
