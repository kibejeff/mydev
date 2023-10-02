import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { update } from '~/features/user/createUpdateSlice';
import { resetPassValues } from '~/features/user/userSlice';

const ChangePasswordForm = () => {
	const { phoneNumber, userPk } = useSelector((state) => state.user);
	const { loading } = useSelector((state) => state.createUpdate);
	const dispatch = useDispatch();
	const router = useRouter();

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const onFinish = async (values) => {
		var lowerCaseLetters = /[a-z]/g;
		var upperCaseLetters = /[A-Z]/g;
		var numbers = /[0-9]/g;
		if (!password.match(lowerCaseLetters)) {
			toast.error('Password should contain atleast one lowercase letter!');
		} else if (!password.match(upperCaseLetters)) {
			toast.error('Password should contain atleast one uppercase letter!');
		} else if (!password.match(numbers)) {
			toast.error('Password should contain atleast one number!');
		} else if (password.length < 6) {
			toast.error('Password length should be atleast 6 characters long!');
		} else {
      await delete values.confirmPassword
      const newObj = {
        ...values,
        url: `users/${userPk}/`

      }
      const res = await dispatch(update(newObj))
      if (res?.payload?.id) {
        await toast.success("Password updated successfully! Login in to continue")
        await router.push('/account/login');
        await dispatch(resetPassValues())
      }else{
		await toast.error("We cannot update your password at the moment. Please try again later")
	  }
		}
	};

	const onFinishFailed = (errorInfo) => {
		return true;
	};

  useEffect(() => {

	}, [confirmPassword, password])

  if (!userPk || !phoneNumber) {
    router.push("/account/login")
  }

	return (
		<div
			style={{
				width: '450px',
				margin: '30px auto 30px auto',
				padding: '20px',
			}}
		>
			<div style={{ marginTop: '10px' }}>
				<h4 style={{ marginBottom: '20px' }}>Enter Your New Password</h4>
				<Form
					name='reset-password'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					style={{ width: '400px', margin: '0 auto' }}
				>
					<div className='form-group'>
						<Form.Item
							name='password'
							rules={[
								{
									required: true,
									message: 'Please input new password!',
								},
							]}
						>
							<Input.Password
                onChange={e => setPassword(e.target.value)}
								maxLength={10}
								className='form-control'
								placeholder='New password'
							/>
						</Form.Item>
					</div>

					<div className='form-group'>
						<Form.Item
							name='confirmPassword'
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											'The two passwords that you entered do not match!',
										);
									},
								}),
							]}
						>
							<Input.Password
								onChange={(e) => setConfirmPassword(e.target.value)}
								maxLength={10}
								className='form-control'
								placeholder='Confirm new password'
							/>
						</Form.Item>
					</div>

					{/* <Form.Item
						name=''
						dependencies={['password']}
						rules={[
							{
								required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										'The two passwords that you entered do not match!',
									);
								},
							}),
						]}
					>
						<Input.Password
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder='Confirm Password'
						/>
					</Form.Item> */}

					<Form.Item>
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

export default ChangePasswordForm;
