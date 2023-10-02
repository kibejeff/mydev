import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { checkUser, customPhone, loginUser } from '~/features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function Login() {
	const [form] = Form.useForm();
	const router = useRouter();
	const { loading } = useSelector((state) => state.user);
	const [error, seterror] = useState('');

	const dispatch = useDispatch();

	const onFinish = async (data) => {
		let phone;
		if (data.username.charAt(0) === '0') {
			phone = data.username.substring(1);
		} 
		// else if (data.username.match('254')) {
		// 	phone = data.username.substring(4);
		// } else if (data.username.match('+254')) {
		// 	phone = data.username.substring(4);
		// } else if (data.username.match('+2540')) {
		// 	phone = data.username.substring(5);
		// } 
		else {
			phone = data.username;
		}
		
		data.username = '+254' + phone;

		const check = await dispatch(checkUser({
			username: data.username
		}))
		if (check?.payload?.exists == "Active") {
			const res = await dispatch(loginUser({
				username: data.username,
				password: data.password
			}))
			console.log(res);
			if (res?.payload?.success) {
				if (res?.payload?.is_vendor) {
					router.push("/vendor/dashboard")
				}else{
					router.push(router.query?.callbackUrl ? router.query?.callbackUrl : "/")
				}
			}
		}else if(check?.payload?.exists == "Inactive"){
			await dispatch(customPhone(data.username))
			await router.push('/account/verify-account');
		}else{
			toast.error("Account does not exists! Please create an account.")
		}

		// const response = await signIn("credentials",{
		//     phone_number: data.phone_number,
		//     password: data.password,
		//     redirect: true,
		//     callbackUrl: router.query?.callbackUrl ?? "/"
		// });
	};

	return (
		<div className='ps-my-account'>
			<div className='container'>
				<Form form={form} onFinish={onFinish} className='ps-form--account'>
					<ul className='ps-tab-list'>
						<li className='active'>
							<Link href='/account/login'>
								<a>Login</a>
							</Link>
						</li>
						<li>
							<Link href='/account/register'>
								<a>Register</a>
							</Link>
						</li>
					</ul>
					<div className='ps-tab active' id='sign-in'>
						<div className='ps-form__content'>
							{error && (
								<p
									style={{ border: '2px solid red', padding: '2px' }}
									className='text-danger'
								>
									{error}
								</p>
							)}
							<h5>Login To Your Account</h5>
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
									<Input maxLength={10}
										className='form-control'
										type='text'
										placeholder='Phone Number'
									/>
								</Form.Item>
							</div>
							<div className='form-group form-forgot'>
								<Form.Item
									name='password'
									rules={[
										{
											required: true,
											message: 'Please input your password!',
										},
									]}
								>
									<Input
										className='form-control'
										type='password'
										placeholder='Password...'
									/>
								</Form.Item>
							</div>
							<div className='form-group'>
								<div className='ps-checkbox'>
									<input
										className='form-control'
										type='checkbox'
										id='remember-me'
										name='remember-me'
									/>
									<label htmlFor='remember-me'>Remember me</label>
								</div>
							</div>
							<div className='form-group submit'>
								<button disabled={loading} htmlType='submit' className='ps-btn ps-btn--fullwidth'>
									{loading ? (
										<span className='bnt-auth-text loader'></span>
									) : (
										<span className='bnt-auth-text'>Login</span>
									)}
								</button>
								{/* <Button className='ps-btn ps-btn--fullwidth' htmlType="submit">
                                    Login
                                </Button> */}
							</div>
						</div>
						<div className='ps-form__footer'>
							<p>Forgot your password? <Link href='/account/password-reset'><a><u>Reset here</u></a></Link></p>
							{/* <ul className="ps-list--social">
                                    <li>
                                        <a
                                            className="facebook"
                                            href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="google"
                                            href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="twitter"
                                            href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="instagram"
                                            href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul> */}
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}
