import {
	CheckCircleOutlined,
	FormOutlined,
	PlusOutlined,
	UsergroupAddOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Slider,
	Form,
	Input,
	Upload,
	Select,
	Steps,
	Radio,
	message,
	Row,
	Col,
} from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { create, update } from '~/features/user/createUpdateSlice';
import { getBuyer, getBuyerProfile } from '~/features/user/userSlice';

const marks = {
	0: '0',
	15: '15K',
	35: '35K',
	55: '55K',
	75: '75K',
	100: {
		style: {
			color: 'orange',
		},
		label: <strong>KES 100,000</strong>,
	},
};

export default function EmploymentDetailsComponent() {
	const [bankStatement, setbankStatement] = useState([]);
	const [form] = Form.useForm();
	const router = useRouter();

	const [isEarning, setisEarning] = useState(false);
	const [method, setMethod] = useState('employed');
	const [salaryRange, setsalaryRange] = useState([15, 35]);
	const { user, isLoggedIn } = useSelector((state) => state.user);
	const { loading } = useSelector((state) => state.createUpdate);
	const dispatch = useDispatch();

	const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

	function handleChangeMethod(e) {
		setMethod(e.target.value);
	}

	function handleSalaryRange(value) {
		setsalaryRange(value);
	}

	function handleEarning(e) {
		setisEarning(e.target.value);
	}

	const handleBankstatementChange = (info) => {
		let fileList = [...info.fileList];
		fileList = fileList.slice(-1);
		setbankStatement(fileList);
	};

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
			status: 'process',
			content: false,
			icon: <FormOutlined />,
		},
		{
			title: 'Guarantors',
			// status: 'wait',
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

	// "buyer_id": 2,
	// "employment_type": "Employed",
	// "employment_name": "GiveLimited",
	// "kra_pin": "ATH78373",
	// "employment_position": "Software Developer",
	// "office_address": "Lucky Summer, Ruaraka",
	// "salary_range": "100000",
	// "bank_name": "KCB",
	// "owned_appliances": "TV",
	// "information_is_valid": true,
	// "share_profile": true,
	// "terms_and_conditions": true,
	// "has_income": true,
	// "bank_statement": null

	const onFinish = async (data) => {
		data.employment_type = method;
		data.has_income = isEarning;
		data.buyer_id = user?.id;
		const newObj = {
			...data,
			url: 'buyers/',
		};

		const upd = await dispatch(create(newObj));

		if (upd?.payload?.id) {
			const usrUpdObj = {
				has_employment_profile: true,
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
			await toast.success('Employment Details successfully updated!');

			router.push('/account/guarantor-details');
		} else {
			await toast.error(
				'Could not update employment details! Please try again later...',
			);
		}
	};

	let employmentView;

	if (method == 'employed') {
		employmentView = (
			<>
				<Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item
							required
							name='employment_name'
							label='Company/Organization Name'
						>
							<Input required type='string' />
						</Form.Item>
					</Col>

					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item required name='position' label='Position'>
							<Input required type='string' />
						</Form.Item>
					</Col>
				</Row>

				<Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item
							required
							name='salary_range'
							label='Monthly Income (KES)'
						>
							<Input required placeholder='KES' type='number' />
						</Form.Item>
						{/* <Form.Item
							required
							name='salary_range'
							label='Select your monthly income range'
						>
							<Slider
								onChange={handleSalaryRange}
								required
								range
								marks={marks}
								defaultValue={salaryRange}
								style={{
									width: '100%',
									height: 45,
								}}
							/>
						</Form.Item> */}
					</Col>

					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item name='bank_name' label='Choose your bank'>
							<Select defaultValue='coop' size='large'>
								<Select.Option value='coop'>Cooperative Bank</Select.Option>
								<Select.Option value='kcb'>Kenya Commerical Bank</Select.Option>
								<Select.Option value='equity'>Equity Bank</Select.Option>
								<Select.Option value='national'>
									National Bank of Kenya.
								</Select.Option>
								<Select.Option value='dtb'>
									Diamond Trust Bank of Kenya
								</Select.Option>
								<Select.Option value='standard'>
									Standard Chartered Bank
								</Select.Option>
								<Select.Option value='barclay'>Barclays Bank</Select.Option>
								<Select.Option value='stanbic'>Stanbic Bank</Select.Option>
								<Select.Option value='nic'>NIC Bank</Select.Option>
								<Select.Option value='i&m'>I&M Bank</Select.Option>
								<Select.Option value='ncba'>NCBA Bank</Select.Option>
								<Select.Option value='absa'>Absa Bank</Select.Option>
								<Select.Option value='citibank'>Citibank Bank</Select.Option>
								<Select.Option value='prime'>Prime Bank</Select.Option>
								<Select.Option value='other'>Other</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item name='kra_pin' label='KRA Pin'>
							<Input type='text' />
						</Form.Item>
					</Col>

					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item name='office_address' label='Office Address'>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				{/* <Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item
							style={{
								width: '100%',
							}}
							id='bank_statement'
							name='bank_statement'
							label='Attach bank statement'
						>
							<Upload
								multiple='false'
								fileList={bankStatement}
								onChange={handleBankstatementChange}
								listType='picture-card'
							>
								<div>
									<PlusOutlined />
									<div
										style={{
											marginTop: 8,
											width: isMobile ? 270 : 300,
										}}
									>
										Upload
									</div>
								</div>
							</Upload>
						</Form.Item>
					</Col>
				</Row> */}
			</>
		);
	} else if (method === 'self-employed') {
		employmentView = (
			<>
				<Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item name='employment_name' label='Business Name'>
							<Input type='string' />
						</Form.Item>
					</Col>

					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item required name='position' label='Occupation Type'>
							<Input required placeholder='eg. Plumber' type='string' />
						</Form.Item>
					</Col>
				</Row>

				<Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item
							required
							name='salary_range'
							label='Monthly Income (KES)'
						>
							<Input required placeholder='KES' type='number' />
						</Form.Item>
						{/* <Form.Item required name='salary_range' label='Monthly Income'>
							<Slider
								onChange={handleSalaryRange}
								required
								range
								marks={marks}
								defaultValue={salaryRange}
								style={{
									width: '100%',
									height: 45,
								}}
							/>
						</Form.Item> */}
					</Col>

					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item name='bank_name' label='Choose your bank'>
							<Select defaultValue='coop' size='large'>
								<Select.Option value='coop'>Cooperative Bank</Select.Option>
								<Select.Option value='kcb'>Kenya Commerical Bank</Select.Option>
								<Select.Option value='equity'>Equity Bank</Select.Option>
								<Select.Option value='national'>
									National Bank of Kenya.
								</Select.Option>
								<Select.Option value='dtb'>
									Diamond Trust Bank of Kenya
								</Select.Option>
								<Select.Option value='standard'>
									Standard Chartered Bank
								</Select.Option>
								<Select.Option value='barclay'>Barclays Bank</Select.Option>
								<Select.Option value='stanbic'>Stanbic Bank</Select.Option>
								<Select.Option value='nic'>NIC Bank</Select.Option>
								<Select.Option value='i&m'>I&M Bank</Select.Option>
								<Select.Option value='ncba'>NCBA Bank</Select.Option>
								<Select.Option value='absa'>Absa Bank</Select.Option>
								<Select.Option value='citibank'>Citibank Bank</Select.Option>
								<Select.Option value='prime'>Prime Bank</Select.Option>
								<Select.Option value='other'>Other</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item name='kra_pin' label='KRA Pin'>
							<Input type='text' />
						</Form.Item>
					</Col>

					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item name='location' label='Business Address'>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				{/* <Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item
							style={{
								width: '100%',
							}}
							id='bank_statement'
							name='bank_statement'
							label='Attach bank statement'
						>
							<Upload
								multiple='false'
								fileList={bankStatement}
								onChange={handleBankstatementChange}
								listType='picture-card'
							>
								<div>
									<PlusOutlined />
									<div
										style={{
											marginTop: 8,
											width: isMobile ? 270 : 300,
										}}
									>
										Upload
									</div>
								</div>
							</Upload>
						</Form.Item>
					</Col>
				</Row> */}
			</>
		);
	} else if (method === 'unemployed') {
		employmentView = (
			<>
				<Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item name='kra_pin' label='KRA Pin'>
							<Input type='text' />
						</Form.Item>
					</Col>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						<Form.Item label='Do you have any source of income ?'>
							<div className='my-2'>
								<Radio.Group
									onChange={(e) => handleEarning(e)}
									value={isEarning}
								>
									<Radio value={true}>Yes</Radio>
									<Radio value={false}>No</Radio>
								</Radio.Group>
							</div>
						</Form.Item>
					</Col>
				</Row>

				<Row flex='column' gutter={0}>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						{isEarning == true ? (
							<>
								<Form.Item
									required
									name='employment_name'
									label='Method of earning'
								>
									<Input required placeholder='eg. Stipends' type='string' />
								</Form.Item>
							</>
						) : null}
					</Col>
					<Col sm={24} xs={24} md={24} lg={12} xl={12}>
						{isEarning == true ? (
							<Form.Item
								required
								name='salary_range'
								label='Monthly Earnings (KES)'
							>
								<Input required placeholder='KES' type='number' />
							</Form.Item>
						) : // <Form.Item
						// 	required
						// 	name='salary_range'
						// 	label='Average Monthly Income Earnings'
						// >
						// 	<Slider
						// 		onChange={handleSalaryRange}
						// 		required
						// 		range
						// 		marks={marks}
						// 		defaultValue={salaryRange}
						// 		style={{
						// 			width: '100%',
						// 			height: 45,
						// 		}}
						// 	/>
						// </Form.Item>
						null}
					</Col>
				</Row>
			</>
		);
	}

	if (!isLoggedIn) {
		router.push('/account/login');
	}

	if (user?.has_employment_profile) {
		router.push('/account/guarantor-details');
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
						{steps?.map((item) => (
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
						<h4 className='text-underline'>Employment details</h4>
						<div className='my-4'>
							<Radio.Group
								name='employment_type'
								onChange={(e) => handleChangeMethod(e)}
								value={method}
							>
								<Radio value={'employed'}>Employed</Radio>
								<Radio value={'self-employed'}>Self Employed</Radio>
								<Radio value={'unemployed'}>Unemployed</Radio>
							</Radio.Group>
						</div>

						{/* <h5 id='message' className='text-danger'></h5> */}

						{employmentView}

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
