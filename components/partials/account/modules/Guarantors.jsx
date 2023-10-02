import {
	CheckCircleOutlined,
	FormOutlined,
	UsergroupAddOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Col, Form, Input, Row, Steps } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { create, update } from '~/features/user/createUpdateSlice';
import { getBuyer, getBuyerProfile } from '~/features/user/userSlice';

export default function GuarantorDetailsComponent() {
	const [form] = Form.useForm();
	const router = useRouter();
	const { user, isLoggedIn, buyer } = useSelector((state) => state.user);
	const { loading } = useSelector((state) => state.createUpdate);
	const dispatch = useDispatch();

	const { Step } = Steps;

	const steps = [
		{
			title: 'Personal Details',
			status: 'finish',
			content: false,
			icon: <UserOutlined type='smile-o' />,
		},
		{
			title: 'Employment Details',
			status: 'finish',
			content: false,
			icon: <FormOutlined />,
		},
		{
			title: 'Guarantors',
			status: 'process',
			content: false,
			icon: <UsergroupAddOutlined />,
		},
		{
			title: 'Finish',
			// status: 'wait',
			content: false,
			icon: <CheckCircleOutlined />,
		},
	];

	// "guarantor_full_name": "Harry Bee",
	// "guarantor_occupation": "Business Lady",
	// "guarantor_relationship": "Workmate",
	// "guarantor_phone": "+254706416411",
	// "guarantor_id_number": "31567867",

	const onFinish = async (data) => {
		let phone;
		if (data.guarantor_phone.charAt(0) === '0') {
			phone = data.guarantor_phone.substring(1);
		} else {
			phone = data.guarantor_phone;
		}

		data.guarantor_phone = '+254' + phone;
		const newObj = {
			...data,
			url: `buyers/${buyer.id}/`,
		};

		const res = await dispatch(update(newObj));

		if (res?.payload?.id) {
			const usrUpdObj = {
				has_guarantor_profile: true,
			};

			const usrObj = {
				...usrUpdObj,
				url: `users/${user.id}/`,
			};

			await dispatch(update(usrObj));

			await dispatch(
				getBuyer({
					user_id: user.id,
				}),
			);
			await dispatch(
				getBuyerProfile({
					user_id: user.id,
				}),
			);
			await toast.success('Guarantor added successfully!');

			router.push('/account/user-agreement');
		} else {
			await toast.error('Could not add guarantor! Please try again later...');
		}
	};

	if (!isLoggedIn) {
		router.push('/account/login');
	}

	if (user?.has_guarantor_profile) {
		router.push('/account/user-agreement');
	}

	return (
		<>
			<div
				style={{
					marginTop: 50,
					marginBottom: 60,
				}}
				className='ps-my'
			>
				<div className='container'>
					<Steps>
						{steps.map((item) => (
							<Step
								status={item.status}
								key={item.title}
								title={item.title}
								icon={item.icon}
							/>
						))}
					</Steps>
					<Form
						onFinish={onFinish}
						form={form}
						labelCol={{
							span: 12,
						}}
						wrapperCol={{
							span: 14,
						}}
						layout='vertical'
						style={{
							width: '100%',
							padding: 10,
							display: 'flex',
							flexDirection: 'column',
							background: '#FFFFFF',
							padding: '30px',
							marginTop: '20px',
						}}
					>
						<h4 className='text-underline'>Add your guarantor details</h4>
						<>
							<Row flex='column' gutter={0}>
								<Col sm={24} xs={24} md={24} lg={12} xl={12}>
									<Form.Item
										required
										name='guarantor_full_name'
										label='Full name'
									>
										<Input required type='string' />
									</Form.Item>
								</Col>
								<Col sm={24} xs={24} md={24} lg={12} xl={12}>
									<Form.Item
										required
										name='guarantor_relationship'
										label='Relationship'
									>
										<Input required type='string' />
									</Form.Item>
								</Col>
							</Row>

							<Row flex='column' gutter={0}>
								<Col sm={24} xs={24} md={24} lg={12} xl={12}>
									<Form.Item name='guarantor_id_number' label='ID number'>
										<Input type='number' />
									</Form.Item>
								</Col>
								<Col sm={24} xs={24} md={24} lg={12} xl={12}>
									<Form.Item
										required
										name='guarantor_occupation'
										label='Occupation'
									>
										<Input required type='string' />
									</Form.Item>
								</Col>
							</Row>

							<Row flex='column' gutter={0}>
								<Col sm={24} xs={24} md={24} lg={12} xl={12}>
									<Form.Item
										required
										name='guarantor_phone'
										label='Phone number'
									>
										<Input maxLength={10} required type='tel' />
									</Form.Item>
								</Col>
								<Col sm={24} xs={24} md={24} lg={12} xl={12}></Col>
							</Row>
						</>
						<button
							id='page-one-btn'
							htmlType='submit'
							className='btn-auth mt-3'
						>
							{loading ? (
								<span className='bnt-auth-text loader'></span>
							) : (
								<span className='bnt-auth-text'>Next</span>
							)}
						</button>
					</Form>
				</div>
			</div>
		</>
	);
}
