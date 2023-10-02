import React, { useState } from 'react';
import { DatePicker, Form, Input, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { getBuyer } from '~/features/user/userSlice';
import { toast } from 'react-toastify';

const { Dragger } = Upload;

// 10,485,760

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const FormChangeUserInformation = () => {
	const { user } = useSelector((state) => state.user);
	const [form] = Form.useForm();
    const dispatch = useDispatch()

	const [loading, setloading] = useState(false);

	const props = {
		name: 'file',
		multiple: false,
		maxCount: 1,
		accept: 'images/*',

		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

    console.log(user);

	const onFinish = async (data) => {
		setloading(true);
		const formData = new FormData();

		if (data?.password) {
			var lowerCaseLetters = /[a-z]/g;
			var upperCaseLetters = /[A-Z]/g;
			var numbers = /[0-9]/g;

			if (data?.confirm_password !== data?.password) {
                setloading(false);
				return toast.error('Passwords do not match');
			} else if (!data?.password?.match(lowerCaseLetters)) {
                setloading(false);
				return toast.error(
					'Password should contain atleast one lowercase letter!',
				);
			} else if (!data?.password?.match(upperCaseLetters)) {
                setloading(false);
				return toast.error(
					'Password should contain atleast one uppercase letter!',
				);
			} else if (!data?.password?.match(numbers)) {
                setloading(false);
				return toast.error('Password should contain atleast one number!');
			} else if (data?.password?.length < 6) {
                setloading(false);
				return toast.error(
					'Password length should be atleast 6 characters long!',
				);
			} else {
				formData.append('password', data?.password);
			}
		}

		if (data?.avatar?.fileList?.length) {
			formData.append('avatar', data?.avatar?.fileList[0].originFileObj);
		}

		formData.append('first_name', data?.first_name ? data?.first_name : user?.buyer?.first_name);
		formData.append('last_name', data?.last_name ? data?.last_name : user?.buyer?.last_name);
		formData.append('email', data?.email ? data?.email : user?.buyer?.email);

		if (data?.avatar?.fileList?.length > 1) {
			setloading(false);
			return toast.error(`Avatar should be a single image`);
		} else if (data?.image?.fileList[0].originFileObj?.size > 2097152) {
			setloading(false);
			return toast.error(`File size should not exceed 2mbs`);
		} else {
			await fetch(`${url}/users/${user?.buyer?.id ?? user?.buyer?.pk}/`, {
				method: 'PATCH',
				body: formData,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log('RESPONSE 1', data);
					if (data?.pk) {
						const resp = dispatch(
							getBuyer({
								buyer_id: user?.id,
							}),
						);
						console.log('RESPONSE 2', resp);

						if (resp?.payload?.id) {
							setloading(false);
							return toast.success(`profile updated successfully`);
						} else {
							setloading(false);
							return toast.error(`Could not update profile`);
						}
					} else {
						setloading(false);
						return toast.error(
							`Cannot update profile at the moment. Please try again later`,
						);
					}
				});
		}
	};

	return (
		<Form
			enctype='multipart/form-data'
			onFinish={onFinish}
			form={form}
			className='ps-form--account-setting'
		>
			<div className='ps-form__header'>
				<h3>Update Account</h3>
			</div>
			<div className='ps-form__content'>
				<div className='form-group'>
					<label for='avatar'>Profile Photo</label>
					<Form.Item name='avatar'>
						<Dragger
							accept='images/*'
							style={{
								width: '100%',
							}}
							{...props}
						>
							<p className='ant-upload-drag-icon'>
								<PlusOutlined />
							</p>
							<p className='ant-upload-text'>Click here to add photo</p>
							<p className='ant-upload-hint'>2mbs max</p>
						</Dragger>
					</Form.Item>
				</div>
				<div className='form-group'>
					<label for='email'>Email Address</label>
					<Form.Item name='email'>
						<Input
							defaultValue={user?.buyer?.email}
							id='email'
							className='form-control'
							type='email'
						/>
					</Form.Item>
				</div>
				<div className='row'>
					<div className='col-sm-6'>
						<div className='form-group'>
							<label for='first_name'>First Name</label>
							<Form.Item name='first_name'>
								<input
									defaultValue={user?.buyer?.first_name}
									id='first_name'
									className='form-control'
									type='text'
								/>
							</Form.Item>
						</div>
					</div>
					<div className='col-sm-6'>
						<div className='form-group'>
							<label for='last_name'>Last Name</label>
							<Form.Item name='last_name'>
								<input
									defaultValue={user?.buyer?.last_name}
									id='last_name'
									className='form-control'
									type='text'
								/>
							</Form.Item>
						</div>
					</div>

					<div className='col-sm-6'>
						<div className='form-group'>
							<label for='password'>Password</label>
							<Form.Item name='password'>
								<input id='password' className='form-control' type='password' />
							</Form.Item>
						</div>
					</div>
					<div className='col-sm-6'>
						<div className='form-group'>
							<label for='confirm_password'>Confirm Password</label>
							<Form.Item name='confirm_password'>
								<input
									id='confirm_password'
									className='form-control'
									type='password'
								/>
							</Form.Item>
						</div>
					</div>
				</div>

				<div className='form-group submit'>
					<button disabled={loading} type='submit' className='ps-btn'>
						{loading ? <span className='bnt-auth-text loader'></span> : 'Update profile'}
					</button>
				</div>
			</div>
		</Form>
	);
};

export default FormChangeUserInformation;
