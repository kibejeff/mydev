import {
	CheckCircleOutlined,
	FormOutlined,
	PlusOutlined,
	UsergroupAddOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Col,
	Form,
	Input,
	InputNumber,
	message,
	Radio,
	Row,
	Select,
	Steps,
	Upload,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { toast, ToastContainer } from 'react-toastify';
import { create, update } from '~/features/user/createUpdateSlice';
import { getBuyer } from '~/features/user/userSlice';
import keCities from '~/public/data/ke_cities';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const maritalArray = [
	{
		text: 'Single',
		value: 'Single',
	},
	{
		text: 'Married',
		value: 'Married',
	},
	{
		text: 'Divorced',
		value: 'Divorced',
	},
	{
		text: 'Widowed',
		value: 'Widowed',
	},
];

const educationArray = [
	{
		text: 'Primary School',
		value: 'primary',
	},
	{
		text: 'Secondary School',
		value: 'secondary',
	},
	{
		text: 'University',
		value: 'university',
	},
	{
		text: 'Colledge',
		value: 'colledge',
	},
	{
		text: 'Masters',
		value: 'masters',
	},
	{
		text: 'None',
		value: 'none',
	},
];

export default function PersonalDetailsComponent() {
	const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
	const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
	const formFull = useMediaQuery({ query: '(min-width: 1200px)' });
	const isLaptop = useMediaQuery({ query: '(max-width: 1199px)' });
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

	const [form] = Form.useForm();
	const router = useRouter();
	const { user, isLoggedIn } = useSelector((state) => state.user);
	const { loading } = useSelector((state) => state.createUpdate);
	const dispatch = useDispatch();
	const [subCounty, setsubCounty] = useState([]);
	const [defaultValue, setdefaultValue] = useState('');
	const [fileId, setfileId] = useState(null);
	const [fileStatement, setfileStatement] = useState(null);
	const [marital, setmarital] = useState(maritalArray[0].text);
	const [education, seteducation] = useState(educationArray[0].text);
	const [radio, setradio] = useState('18-35');
	const [lod, setlod] = useState(false)

	function selectedCounty(value) {
		const subCountyArray = keCities.find((city) => city.name === value);
		setsubCounty(subCountyArray.sub_counties);
		setdefaultValue(subCountyArray.sub_counties[0]);
	}

	const handleIdChange = (info) => {
		// info.persist();
		// setImage(e.target.files[0]);
		let fileList = [...info.fileList];
		fileList = fileList.slice(-1);
		// let fileObj = fileList?.length ? fileList[0] : null
		setfileId(fileList);
	};

	const handleMstatementChange = (info) => {
		// info.persist();
		let fileList = [...info.fileList];
		fileList = fileList.slice(-1);
		setfileStatement(fileList);
	};

	function selectedSubCounty(value) {
		setdefaultValue(value);
	}

	function selectedMaritalStatus(value) {
		setmarital(value);
	}

	function selectedEducationLevel(value) {
		seteducation(value);
	}

	function radioChangeHandler(e) {
		setradio(e.target.value);
	}

	useEffect(() => {}, [defaultValue, radio]);

	const { Step } = Steps;

	const steps = [
		{
			title: 'Personal Details',
			// status: 'process', //wait, process, finish
			content: <PersonalDetailsComponent />,
			icon: <UserOutlined type='smile-o' />,
		},
		{
			title: 'Employment Details',
			// status: 'wait',
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

	const onFinish = async (formData) => {
		setlod(true)
		const file1 = fileId && fileId.length ? fileId[0].originFileObj : File;
		const file2 =
			fileStatement && fileStatement.length
				? fileStatement[0].originFileObj
				: null;
		formData.age = radio;
		formData.education = education;
		formData.marital_status = marital;
		formData.id_card = fileId && fileId.length ? fileId[0].originFileObj : null;
		formData.mpesa_statement =
			fileStatement && fileStatement.length
				? fileStatement[0].originFileObj
				: null;

		if (
			formData?.county &&
			formData?.sub_county &&
			formData?.gender &&
			formData?.age
		) {
			const dataObj = new FormData();

			if (!user.id_card) {
				fileId && fileId.length && dataObj.append('id_card', file1, fileId?.name);
			}

			if (!user.mpesa_statement) {
				fileStatement && fileStatement.length && dataObj.append('mpesa_statement', file2, fileStatement?.name);
			}

			dataObj.append('age', radio);
			dataObj.append('education', education);
			dataObj.append('marital_status', marital);
			dataObj.append('address', formData.address);
			dataObj.append('county', formData.county);
			dataObj.append('sub_county', formData.sub_county);
			dataObj.append('gender', formData.gender);
			dataObj.append('kplc_number', formData.kplc_number);
			dataObj.append('landmark', formData.landmark);

			// const upd = await dispatch(
			// 	update({
			// 		url: `users/${user?.id}/`,
			// 		...dataObj,
			// 	}),
			// );

			await fetch(`${url}users/${user?.id}/`, {
				method: 'PATCH',
				body: dataObj,
			})
				.then((res) => res.json())
				.then((data) => {
					if (data?.id) {
						dispatch(getBuyer({
							user_id: data.id
						}))
						setlod(false)
						toast.success('Personal Details successfully updated');
						return router.push('/account/employment-details');
					} else {
						setlod(false)
						return toast.error(
							'Could not update profile! Please try again later...',
						);
					}
				});
		}else{
			setlod(false)
		}
	};

	if (!isLoggedIn) {
		router.push('/account/login');
	}

	if (user?.address) {
		router.push('/account/employment-details');
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
							<Step key={item.title} title={item.title} icon={item.icon} />
						))}
					</Steps>

					<Form
						encType='multipart/form-data'
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
							width: formFull ? '100%' : '100%',
							marginTop: '10px',
							display: 'flex',
							flexDirection: 'column',
							background: '#FFFFFF',
							padding: '15px 30px 30px',
							color: '#000',
						}}
					>
						<h5
							style={{
								marginTop: 10,
								marginBottom: 15,
							}}
							id='message'
							className='text-danger'
						>
							All fields marked with * are required
						</h5>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='county' required label='County of residence'>
									<Select
										style={{
											width: '160%',
										}}
										name='county'
										required
										defaultValue='County'
										onChange={selectedCounty}
										size='large'
									>
										{keCities.map((city) => {
											return (
												<Select.Option key={city.name} value={city.name}>
													{city.name}
												</Select.Option>
											);
										})}
									</Select>
								</Form.Item>
							</Col>

							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='sub_county' required label='Sub-county'>
									<Select
										style={{
											width: '160%',
										}}
										name='sub_county'
										required
										onChange={selectedSubCounty}
										value={defaultValue ? defaultValue : 'Sub-county'}
										disabled={subCounty?.length ? false : true}
										size='large'
									>
										{subCounty.map((city) => {
											return (
												<Select.Option required key={city} value={city}>
													{city}
												</Select.Option>
											);
										})}
									</Select>
								</Form.Item>
							</Col>

							<Col sm={16} xs={16} md={24} lg={8} xl={8} flex='auto'>
								<Form.Item required name='address' label='Home/Estate/Village'>
									<Input
										required
										type='text'
										size='large'
										style={{
											width: '160%',
										}}
									/>
								</Form.Item>
							</Col>
						</Row>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={24} lg={8} xl={8} wrap={true}>
								<Form.Item name='landmark' required label='Closest Landmark'>
									<Input
										required
										type='text'
										style={{
											width: '160%',
										}}
										size='large'
									/>
								</Form.Item>
							</Col>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='marital_status' label='Marital Status'>
									<Select
										style={{
											width: '160%',
										}}
										defaultValue={marital}
										onChange={selectedMaritalStatus}
										size='large'
									>
										{maritalArray.map((status) => {
											return (
												<Select.Option key={status.value} value={status.value}>
													{status.text}
												</Select.Option>
											);
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='kplc_number' label='KPLC Account/Meter No.'>
									<InputNumber
										maxLength={11}
										minLength={11}
										size='large'
										min={11}
										style={{
											width: '160%',
										}}
									/>
								</Form.Item>
							</Col>
						</Row>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='education' label='Highest Education Level'>
									<Select
										style={{
											width: '160%',
										}}
										defaultValue={education}
										onChange={selectedEducationLevel}
										size='large'
									>
										{educationArray.map((status) => {
											return (
												<Select.Option key={status.value} value={status.value}>
													{status.text}
												</Select.Option>
											);
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col sm={9} xs={9} md={13} lg={9} xl={9}>
								<Form.Item
									required
									size='large'
									name='age'
									label='Age'
									style={{
										width: '160%',
									}}
								>
									<Radio.Group
										required
										onChange={radioChangeHandler}
										value={radio}
										style={{
											width: '160%',
										}}
									>
										<Radio value='18-35'> 18 - 35 </Radio>
										<Radio value='36-45'> 36 - 45 </Radio>
										<Radio value='46-60'> 46 - 60 </Radio>
										<Radio value='over_60'> Above 60 </Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
							<Col sm={16} xs={16} md={13} lg={7} xl={8}>
								<Form.Item
									required
									size='large'
									name='gender'
									label='Gender'
									style={{
										width: isMobile ? '100%' : '160%',
									}}
								>
									<Radio.Group
										required
										style={{
											width: '100%',
										}}
									>
										<Radio value='male'> Male </Radio>
										<Radio value='female'> Female </Radio>
										<Radio value='other'> Prefer not to say </Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={20} lg={9} xl={9}>
								<Form.Item name='id_card' label='Attach a copy of your ID'>
									<Upload
										// accept="application/pdf"
										multiple='false'
										fileList={fileId}
										onChange={handleIdChange}
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
							<Col sm={16} xs={16} md={24} lg={12} xl={12}>
								<Form.Item
									id='m_statement'
									name='mpesa_statement'
									label='Attach M-Pesa ministatement'
								>
									<Upload
										// accept="application/pdf"
										multiple='false'
										fileList={fileStatement}
										onChange={handleMstatementChange}
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
						</Row>

						<button
							disabled={lod}
							id='page-one-btn'
							htmlType='submit'
							class='btn-auth'
						>
							{lod ? (
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
