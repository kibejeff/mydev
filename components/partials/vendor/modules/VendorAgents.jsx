import React, { useEffect, useState } from 'react';
import { Table, Form, InputNumber, Select, Input } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addItemToPay } from '~/features/products/productSlice';
import { useRouter } from 'next/router';
import {
	deleteProduct,
	fetchMyProducts,
	getVendorAgents,
	handleEditProduct,
} from '~/features/vendor/vendorSlice';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useRef } from 'react';
import { registerUser, sendNewAccountAlert } from '~/features/user/userSlice';
import { update } from '~/features/user/createUpdateSlice';
import { toast } from 'react-toastify';

function VendorAgents() {
	const { vendorAgents, vendor } = useSelector((state) => state.vendor);
	const vendorLoading = useSelector((state) => state.vendor.loading);
	const { user, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const router = useRouter();

	const formRef = useRef(null);

	const [modal2Open, setModal2Open] = useState(false);
	const [role, setrole] = useState(false);
	const [agents, setagents] = useState(vendorAgents);

	function handleUserRole(val) {
		setrole(val);
	}

	function openModal() {
		setModal2Open(true);
	}

	function modalCancel() {
		setModal2Open(false);
	}

	function handleSubmit() {
		form.submit();
	}

	async function handleCreateAgent(data) {
		if (role) {
			data.is_vendor = true;
		} else {
			data.is_buyer = true;
			data.is_vendor = false;
		}
		data.created_by = user.id;
		data.password = data.phone;
		data.phone = '+254' + data.phone;
		data.username = data.phone;
		const res = await dispatch(registerUser(data));
		console.log(res?.payload);
		if (res?.payload?.id) {
			dispatch(
				sendNewAccountAlert({
					email: res?.payload?.email,
				}),
			);
			form.resetFields();
			modalCancel();
		}
	}

	async function handleGetVendorAgents() {
		const res = await dispatch(getVendorAgents(user.id));
		if (res?.payload?.results?.length) {
			setagents(res?.payload?.results);
		}
	}

	async function handleDeactivate(userObj) {
		const data = {
			is_active: false
		};

		const updObj = {
			...data,
			url: `users/${userObj.id}/`,
		};
		const res = await dispatch(update(updObj));
		if (res?.payload?.id) {
			toast.success('Account deactivated');
			handleGetVendorAgents()
		} else {
			toast.info('Request failed. Please try again later');
		}
	}

	async function handleAactivate(userObj) {
		const data = {
			is_active: true
		};

		const updObj = {
			...data,
			url: `users/${userObj.id}/`,
		};
		const res = await dispatch(update(updObj));
		if (res?.payload?.id) {
			toast.success('Account activated');
			handleGetVendorAgents()
		} else {
			toast.info('Request failed. Please try again later');
		}
	}
	

	useEffect(() => {
		handleGetVendorAgents();
	}, []);

	useEffect(() => {
		setagents(vendorAgents);
	}, [vendorAgents]);

	const tableColumn = [
		{
			title: '',
			dataIndex: 'Profile',
			key: 'image_url',
			render: (text) => <img width={70} height={70} className='' src={text} />,
		},
		{
			title: 'Date Created',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text) => <a>{moment(text).format('MMM Do, YYYY')}</a>,
		},
		{
			title: 'First Name',
			dataIndex: 'first_name',
			key: 'first_name',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Last Name',
			dataIndex: 'last_name',
			key: 'last_name',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Status',
			dataIndex: 'is_active',
			key: 'is_active',
			render: (item) => <a className=''>{item ? 'Active' : 'Inactive'}</a>,
		},
		{
			title: 'Action',
			key: 'uuid',
			render: (item) => (
				<>
					{item?.is_active ? (
						<button
							disabled={loading}
							onClick={() => handleDeactivate(item)}
							className='btn-table-reject ml-3'
						>
							Deactivate
						</button>
					) : (
						<button
							onClick={() => handleAactivate(item)}
							disabled={loading}
							className='btn-table-edit'
						>
							Activate
						</button>
					)}
				</>
			),
		},
	];

	return (
		<>
			<div className='ps-vendor-dashboard ps-vendor-margin'>
				<div className='container'>
					<div className='ps-section__content'>
						<div>
							<div className='d-flex mb-4 justify-content-between'>
								<h3>User Management</h3>
								<button
									onClick={openModal}
									className='btn-table-add d-flex align-items-center'
								>
									Add new user
								</button>
							</div>
						</div>
						<Table
							scroll={{ x: '100%' }}
							loading={vendorLoading}
							columns={tableColumn}
							dataSource={agents}
						/>
					</div>
				</div>
			</div>

			<Modal
				title='Create Agent'
				centered
				visible={modal2Open}
				onOk={handleSubmit}
				okText={'Create'}
				onCancel={modalCancel}
				okButtonProps={{
					type: 'submit',
					disabled: loading,
					className: 'btn btn-pay',
				}}
				cancelButtonProps={{
					disabled: loading,
					className: 'btn btn-pay-inverse',
				}}
				width={'fit-content'}
			>
				{loading ? (
					<>
						<span className='loader'></span>
						<p>Creating User. Please wait...</p>
					</>
				) : (
					<>
						<Form
							form={form}
							layout='vertical'
							ref={formRef}
							name='control-ref'
							onFinish={handleCreateAgent}
							style={{
								maxWidth: 'fit-content',
								width: '100%',
							}}
							initialValues={{
								remember: true,
							}}
						>
							<div className='d-flex align-items-center'>
								<Form.Item
									rules={[
										{
											required: true,
											message: 'First name is required',
										},
									]}
									name={'first_name'}
									label='First Name'
								>
									<Input
										style={{
											width: '290px',
										}}
										className='rounded-[8px] h-[44px]'
									/>
								</Form.Item>

								<Form.Item
									rules={[
										{
											required: true,
											message: 'Last name is required',
										},
									]}
									name={'last_name'}
									className='ml-5'
									label='Last Name'
								>
									<Input
										style={{
											width: '290px',
										}}
										className='rounded-[8px] h-[44px]'
									/>
								</Form.Item>
							</div>

							<Form.Item name='is_vendor' label='Agent Role'>
								<Select
									onChange={handleUserRole}
									defaultValue={'Manage Customers'}
									style={{
										width: '100%',
									}}
									options={[
										{
											value: true,
											label: 'Manage Platform',
										},
										{
											value: false,
											label: 'Manage Customers',
										},
									]}
								/>
							</Form.Item>

							<Form.Item
								rules={[
									{
										required: true,
										message: 'Enter a valid email',
									},
								]}
								name={'email'}
								label='Email'
							>
								<Input type='email' className='rounded-[8px] h-[44px]' />
							</Form.Item>

							<Form.Item
								rules={[
									{
										required: true,
										message: 'Enter a valid phone number',
									},
								]}
								name={'phone'}
								label='Phone No'
							>
								<InputNumber
									prefix='+254'
									style={{
										width: '100%',
										height: '44px',
									}}
									maxLength={10}
									minLength={9}
									className='rounded-[8px]'
								/>
							</Form.Item>
						</Form>

						<div className='d-none'>
							<button id='submit' type='submit'>
								Submit
							</button>
						</div>
					</>
				)}
			</Modal>
		</>
	);
}

export default VendorAgents;
