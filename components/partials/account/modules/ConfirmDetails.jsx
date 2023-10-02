import {
	CheckCircleOutlined,
	FormOutlined,
	UsergroupAddOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Form, Input, Checkbox, Steps, Select } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { create, update } from '~/features/user/createUpdateSlice';
import { getBuyer, getBuyerProfile } from '~/features/user/userSlice';

const appliances = [
	'Tv',
	'Radio',
	'Phone',
	'Fan',
	'Fridge',
	'Mixer',
	'Kettle',
	'Coil',
	'Water Heater',
	'Heater',
	'Space Heater',
	'Dish Washer',
	'Vacuum Cleaner',
	'Laundry Machine',
	'Blender',
	'Microwave',
	'Oven',
	'Induction Cooker',
	'Pressure Cooker',
	'Frying Pan',
	'Air Fryer',
	'Toaster',
	'Air Conditioner',
	'Sandwich',
	'Maker',
	'Coffee Maker',
];

const options = [];

appliances.forEach((i) => {
	options.push({
		label: i,
		value: i,
	});
});
// for (let i = 10; i < 36; i++) {
// 	options.push({
// 		label: i.toString(36) + i,
// 		value: i.toString(36) + i,
// 	});
// }

export default function ConfirmDetailsComponent() {
	const [form] = Form.useForm();
	const router = useRouter();
	const { user, isLoggedIn, buyer } = useSelector((state) => state.user);
	const { cart } = useSelector((state) => state.products);
	const { loading } = useSelector((state) => state.createUpdate);
	const dispatch = useDispatch();
	const [usedArray, setusedArray] = useState([]);

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
			status: 'finish',
			content: false,
			icon: <UsergroupAddOutlined />,
		},
		{
			title: 'Finish',
			status: 'finish',
			content: false,
			icon: <CheckCircleOutlined />,
		},
	];

	const onChange = (checkedValues) => {
		setusedArray(checkedValues);
	};

	const onFinish = async (data) => {
		data.owned_appliances = usedArray;

		const newObj = {
			...data,
			url: `buyers/${buyer.id}/`,
		};

		const res = await dispatch(update(newObj));

		if (res?.payload?.id) {
			const usrUpdObj = {
				accepts_terms: true,
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
			await toast.success(
				'Congratulations on finishing all the steps. Your profile can now be used to purchase products.',
			);

			if (cart?.length) {
				router.push('/account/checkout');
			} else {
				router.push('/account/user-information');
			}
		} else {
			await toast.error('Could not update profile! Please try again later...');
		}
	};

	useEffect(() => {}, [usedArray]);

	if (!isLoggedIn) {
		router.push('/account/login');
	}

	if (user.accepts_terms) {
		if (cart?.length) {
			router.push('/account/checkout');
		} else {
			router.push('/home');
		}
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
						<h4 className='text-underline mb-4'>
							Please Select Appliances You Currently Use/Possess
						</h4>

						<Select
							mode='multiple'
							allowClear
							style={{
								width: '70vw',
							}}
							placeholder='Please select'
							defaultValue={['Phone']}
							onChange={onChange}
							options={options}
						/>

						{/* <Checkbox.Group
							options={options}
							defaultValue={['Pear']}
							onChange={onChange}
						/> */}

						<h4 className='text-underline mt-5'>
							User agreement & acknowledgement
						</h4>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<Input.Group size='large' style={{}}>
								<Form.Item
									required
									name='information_is_valid'
									valuePropName='checked'
								>
									<Checkbox required>
										<span style={{ color: '#000000' }}>
											I acknowledge that the all the information provided is
											true to the best of my knowledge.
										</span>
									</Checkbox>
								</Form.Item>

								<Form.Item
									required
									name='share_profile'
									valuePropName='checked'
								>
									<Checkbox required>
										<span style={{ color: '#000000' }}>
											I agree that the information provided can be used to by
											third party vendors and lenders.
										</span>
									</Checkbox>
								</Form.Item>

								<Form.Item
									required
									name='terms_and_conditions'
									valuePropName='checked'
								>
									<Checkbox required>
										<Link href='/pay-later-agreement'>
											<span
												style={{ color: 'blue', textDecoration: 'underline' }}
											>
												I agree to the terms and conditions of using this
												application.
											</span>
										</Link>
									</Checkbox>
								</Form.Item>
							</Input.Group>
						</div>

						<button
							id='page-one-btn'
							htmlType='submit'
							className='btn-auth mt-3'
						>
							{loading ? (
								<span className='bnt-auth-text loader'></span>
							) : (
								<span className='bnt-auth-text'>Submit and Finish</span>
							)}
						</button>
					</Form>
				</div>
			</div>
		</>
	);
}
