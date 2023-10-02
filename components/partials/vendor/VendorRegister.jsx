import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Radio, Select, Upload } from 'antd';
import keCities from '~/public/data/ke_cities';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { customPhone, registerUser } from '~/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { create } from '~/features/user/createUpdateSlice';

// const url = 'https://powerpay-africa-backend.onrender.com' //  process.env.NEXT_PUBLIC_BACKEND_URL
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function VendorRegister() {
	const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
	const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
	const formFull = useMediaQuery({ query: '(max-width: 992px)' });
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
	const [form] = Form.useForm();
	const router = useRouter();
	// const { loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [confirmPassword, setconfirmPassword] = useState('');
	const [password, setpassword] = useState('');
	const [phoneNo, setPhoneNo] = useState('');
	const [phoneNoErr, setPhoneNoErr] = useState('');
	const [loading, setloading] = useState(false)

	const handlePhone = (e) => {
		const isKenyanPhoneNumber = /^(07|01)[0-9]{8}$/.test(e.target.value);
		setPhoneNo(e.target.value);
		if (!isKenyanPhoneNumber) {
			setPhoneNoErr('Enter valid phone number!');
		} else {
			setPhoneNoErr('');
		}
	};

	const onFinish = async (data) => {
		var lowerCaseLetters = /[a-z]/g;
		var upperCaseLetters = /[A-Z]/g;
		var numbers = /[0-9]/g;

		const vendorObj = {
			vendor_id: null,
			business_name : data.business_name,
			location: data.location,
			url: "vendors/"
		}

		if (confirmPassword !== password) {
			toast.error('Passwords do not match');
		} else if (!password.match(lowerCaseLetters)) {
			toast.error('Password should contain atleast one lowercase letter!');
		} else if (!password.match(upperCaseLetters)) {
			toast.error('Password should contain atleast one uppercase letter!');
		} else if (!password.match(numbers)) {
			toast.error('Password should contain atleast one number!');
		} else if (password.length < 6) {
			toast.error('Password length should be atleast 6 characters long!');
		} else {
			setloading(true)
			delete data.business_name
			delete data.location
			data.phone = '+254' + data.phone;
			data.avatar = '';
			data.is_vendor = true
			const res = await dispatch(registerUser(data));
			if (res?.payload?.id) {
				const updatedObj = await {...vendorObj, vendor_id : res?.payload?.id}
				await dispatch(customPhone(res?.payload?.phone))
				const resp = await dispatch(create(updatedObj))
				if (resp?.payload?.id) {
					await setloading(false)
					router.push('/account/verify-account');
				}else{
					await setloading(false)
					toast.error("Vendor account not created!")
				}
			}else{
				await setloading(false)
			}
		}
	};

	useEffect(() => {}, [confirmPassword, password, phoneNo, phoneNoErr]);

	return (
		<>
			<div className='ps-my-account'>
				<ul className='ps-tab-list'>
					{/* <li>
						<Link href='/account/login'>
							<a>Login</a>
						</Link>
					</li> */}
					<li className='active'>
						<Link href='/vendor/become-a-vendor'>
							<a>Vendor Registration</a>
						</Link>
					</li>
				</ul>
				<div className='container my-5'>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							padding: '10px',
						}}
						className='mt-5'
					>
						<Form
							form={form}
							onFinish={onFinish}
							labelCol={{
								span: 12,
							}}
							wrapperCol={{
								span: 14,
							}}
							layout='vertical'
							style={{
								width: formFull ? '100%' : '70%',
								padding: 10,
								display: 'flex',
								flexDirection: 'column',
								background: '#FFFFFF',
								padding: '30px',
							}}
						>
							{/* <h4 className='text-underline mb-5'>
								Register an account to get personalized products
							</h4> */}

							{phoneNoErr ? <p style={{ color: 'red' }}>{phoneNoErr}</p> : null}

							<div
								style={{
									display: 'flex',
									flexDirection:
										isMobile || isTabletOrMobile ? 'column' : 'row',
									justifyContent:
										isMobile || isTabletOrMobile
											? 'justify-center'
											: 'space-between',
								}}
							>
								<Input.Group size='large' style={{}}>
									<Form.Item
										label='First Name'
										name='first_name'
										rules={[
											{
												required: true,
												message: 'First name is required!',
											},
										]}
									>
										<Input
											style={{
												width: '300px',
											}}
											type='string'
										/>
									</Form.Item>

									<Form.Item
										label='Last Name'
										name='last_name'
										rules={[
											{
												required: true,
												message: 'Last name is required!',
											},
										]}
									>
										<Input
											style={{
												width: '300px',
											}}
											type='string'
										/>
									</Form.Item>

									<Form.Item
										label='Business Name'
										name='business_name'
										rules={[
											{
												required: true,
												message: 'Enter Business Name',
											},
										]}
									>
										<Input
											style={{
												width: '300px',
											}}
											type='string'
										/>
									</Form.Item>

                                    <Form.Item
										label='Email'
										name='email'
										rules={[
											{
												required: false,
												message: 'Enter Email',
											},
										]}
									>
										<Input
											style={{
												width: '300px',
											}}
											type='email'
										/>
									</Form.Item>
								</Input.Group>

								<Input.Group>
									<Form.Item
										label='Phone Number'
										name='phone'
										rules={[
											{
												required: true,
												message: 'Phone number is required',
											},
										]}
									>
										<Input
											onChange={handlePhone}
											value={phoneNo}
											type='tel'
											style={{
												width: '300px',
											}}
											size='large'
										/>
									</Form.Item>

                                    <Form.Item
										label='Location'
										name='location'
										rules={[
											{
												required: true,
												message: 'Location is required',
											},
										]}
									>
										<Input
											type='string'
											style={{
												width: '300px',
											}}
											size='large'
										/>
									</Form.Item>

									<Form.Item
										required
										label='Password'
										name='password'
										rules={[
											{
												required: true,
												message: 'Enter password',
											},
										]}
									>
										<Input.Password
											value={password}
											onChange={(e) => setpassword(e.target.value)}
											required
											style={{
												width: '300px',
											}}
											size='large'
											visibilityToggle={true}
										/>
									</Form.Item>

									<Form.Item
										label='Confirm Password'
										name='password_confirmation'
										rules={[
											{
												required: true,
												message: 'Confirm password',
											},
										]}
									>
										<Input.Password
											value={confirmPassword}
											onChange={(e) => setconfirmPassword(e.target.value)}
											id='password-confirmation'
											style={{
												width: '300px',
											}}
											size='large'
										/>
									</Form.Item>
								</Input.Group>
							</div>
							<Button
								disabled={loading}
								style={{
									width: '300px',
								}}
								className='btn-auth mt-5'
								htmlType='submit'
							>
								{loading ? (
									<span className='bnt-auth-text loader'></span>
								) : (
									<span className='bnt-auth-text'>Submit</span>
								)}
							</Button>

							<p className='mt-5'>
								<Link href='/account/login'>
									<a>Have an account? Login</a>
								</Link>
							</p>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
}
