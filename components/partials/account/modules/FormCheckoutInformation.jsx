import React, { Component, useContext, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	Checkbox,
	Descriptions,
	Form,
	Input,
	Select,
	Space,
	Button,
	Popconfirm,
	Modal,
	Table,
} from 'antd';
import LoanCheckModule from './LoanCheck';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { calculateDiscount } from '~/utilities/product-helper';
import { useEffect } from 'react';
import { create } from '~/features/user/createUpdateSlice';
import { emptyCart, sendCheckoutEmail } from '~/features/products/productSlice';
import { getBuyer } from '~/features/user/userSlice';
import ModulePaymentShipping from '~/components/ecomerce/modules/ModulePaymentShipping';
import { fetchLoaners, handleMonths } from '~/features/addon/addonSlice';

const paymentOptions = [
	{
		text: 'M-Pesa',
		val: 'M-Pesa',
	},
	{
		text: 'Airtel Money',
		val: 'Airtel Money',
	},
	{
		text: 'T-Cash',
		val: 'T-Cash',
	},
	{
		text: 'Visa Card',
		val: 'Visa Card',
	},
	{
		text: 'Paypal',
		val: 'Paypal',
	},
];

const paymentPlan = [
	{
		text: '2 months',
		val: 2,
	},
	{
		text: '3 months',
		val: 3,
	},
	{
		text: '4 months',
		val: 4,
	},
	{
		text: '5 months',
		val: 5,
	},
	{
		text: '6 months',
		val: 6,
	},
	{
		text: '7 months',
		val: 7,
	},
	{
		text: '8 months',
		val: 8,
	},
	{
		text: '9 months',
		val: 9,
	},
	{
		text: '10 months',
		val: 10,
	},
	{
		text: '11 months',
		val: 11,
	},
	{
		text: '12 months',
		val: 12,
	},
];

const options = [
	'Charcoal',
	'Firewood',
	'Electricity',
	'Biogas',
	'Briquettes',
	'Ethanol',
	'Pelletes',
	'Kerosene',
	'Sawdust',
	'Liquid Petroleum Gas'
	// 'Other (specify)',
];

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};
const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);
	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};
	const save = async () => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({
				...record,
				...values,
			});
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};
	let childNode = children;
	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`,
					},
				]}
			>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className='editable-cell-value-wrap'
				style={{
					paddingRight: 24,
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}
	return <td {...restProps}>{childNode}</td>;
};

function FormCheckoutInformation() {
	const { cart } = useSelector((state) => state.products);
	const { shippingPrice, shippingLocation, loaners } = useSelector(
		(state) => state.addon,
	);
	const { isLoggedIn, user } = useSelector((state) => state.user);
	const { loading } = useSelector((state) => state.createUpdate);
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const router = useRouter();
	let vendor = cart?.length ? cart[0].vendor : null;
	let product = cart?.length ? cart[0] : null;

	const [month, setmonth] = useState(3);
	const [fuelValues, setfuelValues] = useState([]);
	const [hasLoan, sethasLoan] = useState(false);
	const [payMethod, setpayMethod] = useState(paymentOptions[0].val);
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [helpText, sethelpText] = useState('');
	const [url, seturl] = useState('');
	const [title, settitle] = useState('');
	const [sendEmailLoading, setsendEmailLoading] = useState(false);
	const [shipAddress, setshipAddress] = useState(shippingLocation);
	const [shipPrice, setshipPrice] = useState(shippingPrice);
	const [agent, setagent] = useState('');
	const { confirm } = Modal;
	const [lenders, setlenders] = useState(loaners);
	const [lenderId, setlenderId] = useState(null);
	const [dataSource, setDataSource] = useState([]);
	const [count, setCount] = useState(0);

	const lendersOptions = [];

	lenders?.forEach((item) => {
		lendersOptions.push({
			label: item?.name,
			value: item?.id,
		});
	});

	let initialPrice = calculateDiscount(product?.price, product?.discount);
	let initialDeposit =
		initialPrice * 0.2 + initialPrice * 0.05 + Number(shippingPrice);

	let remPrice = initialPrice - initialPrice * 0.2;

	const [installment, setinstallment] = useState(
		((product?.interest / 100) * remPrice * month + remPrice) / month,
	);

	const handleDelete = (key) => {
		const newData = dataSource.filter((item) => item.key !== key);
		setDataSource(newData);
	};

	async function handleFetchLoaners() {
		const res = await dispatch(fetchLoaners());
		if (res?.payload?.results?.length) {
			setlenders(res?.payload?.results);
		}
	}

	const onLoanerChange = (val) => {
		setlenderId(val.target.value);
	};

	const onChange = (checkedValues) => {
		let fuelArr = []
		checkedValues?.forEach((item, index) => {
			const obj = {
				key: index,
				name: item,
				amount: 0,
			};
			fuelArr.push(obj)
		});
		setfuelValues(checkedValues);
		handleAdd(fuelArr);
	};


	function selectedPlan(value) {
		const inst = paymentPlan.find((item) => item.val === value);
		let newInstallments =
			((product?.interest / 100) * remPrice * value + remPrice) / value;
		setinstallment(newInstallments);
		setmonth(value);
	}

	function selectedPayMethod(value) {
		setpayMethod(value);
	}

	function loanCheck(value) {
		sethasLoan(value);
	}

	function getShippingAddress(val1, val2, val3) {
		setshipAddress(val1);
		setshipPrice(val2);
		setagent(val3);
	}

	function showConfirm(tit, hlp, ur) {
		confirm({
			title: 'Attention required',
			centered: true,
			cancelText: 'Back to Shop',
			confirmLoading: true,
			okText: tit,
			content: hlp,
			onOk() {
				return setTimeout(() => {
					Modal.destroyAll();
					router.push(ur);
				}, 1000);
			},
			onCancel() {
				router.push('/shop');
			},
		});
	}

	const aggregate = dataSource.reduce(
		(a, b) => Number(a) + Number(b.amount),
		0,
	);

	async function handleCheckoutSubmit(data) {
		if (!lenderId) {
			return toast.info('Please select a lender');
		}
		data.buyer_id = user?.id;
		data.product_id = product?.uuid;
		data.product_title = product?.title
		data.used_appliances = fuelValues.toString();
		data.monthly_fuel_cost = aggregate;
		data.deposit =
			Math.ceil(initialDeposit) <= 0 ? 1 : Math.ceil(initialDeposit);
		data.monthly_installments =
			Math.ceil(installment) <= 0 ? 1 : Math.ceil(installment);
		data.has_other_loans = hasLoan;
		data.power_usage_cost = Number(data.power_usage_cost);
		// data.current_loan = Number(data.current_loan);
		data.payment_method = payMethod;
		data.duration = month;
		data.shipping_address = shipAddress;
		data.shipping_fee = shipPrice;
		data.agent = agent;
		data.current_price = calculateDiscount(product?.price, product?.discount);
		data.remaining_balance = calculateDiscount(product?.price, product?.discount);
		data.loaner_id = lenderId;
		data.approval_status = 'Pending';
		data.loan_status = 'Initiated';

		setsendEmailLoading(true);
		const newObj = {
			...data,
			url: 'orders/',
		};
		const res = await dispatch(create(newObj));
		if (res?.payload?.id) {
			// const emailObj = {
			// 	buyer_id: user?.id,
			// 	vendor_id: product?.vendor?.id,
			// };
			// await dispatch(sendCheckoutEmail(emailObj));
			await setsendEmailLoading(false);
			await toast.success(
				'Your request has been sent successfully. Please await feedback.',
			);

			await router.push('/account/applications');
			await dispatch(emptyCart());
		} else {
			await setsendEmailLoading(false);
			await toast.error(
				'Could not complete your request. Please try again later.',
			);
		}
	}

	async function handleValidateUserProfile() {
		// await await dispatch(getBuyer({
		// 	buyer_id: user?.id
		// }))
		if (!isLoggedIn && !user?.id) {
			await settitle('Please login to continue with checkout.');
			await sethelpText('Login');
			await seturl('/account/login');
			await showConfirm(
				'Login',
				'Please login to continue with checkout.',
				'/account/login',
			);
			return true;
		} else if (isLoggedIn && !user?.address) {
			await settitle('Your profile is incomplete!');
			await sethelpText('Complete Profile');
			await seturl('/account/additional-account-info');
			await showConfirm(
				'Complete Profile',
				'Your profile is incomplete!',
				'/account/additional-account-info',
			);
			return true;
		} else if (isLoggedIn && !user?.has_employment_profile) {
			await sethelpText('Complete Profile');
			await settitle('Would you like to complete your employment profile?');
			await seturl('/account/employment-details');
			await showConfirm(
				'Complete Profile',
				'Would you like to complete your employment profile?',
				'/account/employment-details',
			);
			return true;
		} else if (isLoggedIn && !user?.has_guarantor_profile) {
			await settitle('You have not added any guarantor!');
			await sethelpText('Complete Profile');
			await seturl('/account/guarantor-details');
			await showConfirm(
				'Complete Profile',
				'You have not added any guarantor!',
				'/account/guarantor-details',
			);
			return true;
		} else if (isLoggedIn && !user?.accepts_terms) {
			await sethelpText('Complete Profile');
			await settitle('The last step of your profile is not completed!');
			await seturl('/account/user-agreement');
			await showConfirm(
				'Complete Profile',
				'The last step of your profile is not completed!',
				'/account/user-agreement',
			);
			return true;
		} else {
			return true;
		}
	}

	const showPopconfirm = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
			router.push(url);
			sethelpText('');
			settitle('');
			seturl('');
		}, 1000);
	};
	const handleCancel = () => {
		setTimeout(() => {
			setOpen(false);
			sethelpText('');
			settitle('');
			seturl('');
		}, 1000);
	};

	if (!cart?.length) {
		toast.info('No product available for checkout');
		router.push('/shop');
	}

	const defaultColumns = [
		{
			title: 'Fuel Name',
			dataIndex: 'name',
			width: '30%',
		},
		{
			title: 'Monthly Usage Cost (KES)',
			dataIndex: 'amount',
			editable: true,
		},
		// {
		// 	title: 'operation',
		// 	dataIndex: 'operation',
		// 	render: (_, record) =>
		// 		dataSource.length >= 1 ? (
		// 			<Popconfirm
		// 				title='Sure to delete?'
		// 				onConfirm={() => handleDelete(record.key)}
		// 			>
		// 				<a>Delete</a>
		// 			</Popconfirm>
		// 		) : null,
		// },
	];

	const handleAdd = (newData) => {
		// const newData = {
		// 	key: count,
		// 	name: `${fName}`,
		// 	amount: 0,
		// };
		setDataSource(newData);
		setCount(count + 1);
	};
	const handleSave = (row) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row,
		});
		setDataSource(newData);
	};
	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell,
		},
	};
	const columns = defaultColumns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.amount,
				handleSave,
			}),
		};
	});

	useEffect(() => {}, [installment, month, helpText, title, url]);

	useEffect(() => {
		dispatch(handleMonths(month));
	}, [month]);

	useEffect(() => {
		handleValidateUserProfile();
		handleFetchLoaners();
	}, []);

	useEffect(() => {
		setlenders(loaners);
	}, [loaners]);

	return (
		<Form
			layout='vertical'
			className='ps-form__billing-info'
			onFinish={handleCheckoutSubmit}
			form={form}
		>
			{product?.is_pressure_cooker ? (
				<>
					<h3 className='ps-form__heading'>Fuel and Power Usage Information</h3>
					<p className='text-danger'>
						Please select the kind of fuels you are currently using and estimated monthly price
					</p>
					<div className='form-group'>
						<div className='ps-block--checkout-order'>
							<div className='ps-block__content'>
								<Checkbox.Group
									options={options}
									defaultValue={['Pear']}
									onChange={onChange}
								/>

								<div className='mt-4'>
									<Table
										components={components}
										rowClassName={() => 'editable-row'}
										bordered
										dataSource={dataSource}
										columns={columns}
									/>
								</div>

								<Form.Item
									className='mt-5'
									label='Estimated Total Monthly Cost of Cooking Fuel '
									name='power_usage_cost'
									rules={[
										{
											required: false,
											message: 'Enter cost of fuel usage for a full month!',
										},
									]}
								>
									<Input
										readOnly
										placeholder={Number(aggregate)}
										className='form-control'
										type='number'
									/>
								</Form.Item>
							</div>
						</div>
					</div>
				</>
			) : null}

			<h3 className='ps-form__heading'>Payment Terms</h3>
			<div className='form-group'>
				<Space wrap>
					<Form.Item
						label={
							Math.ceil(initialDeposit) <= 0
								? 'Initial Deposit: KES ' + 1
								: 'Initial Deposit: KES ' + Math.ceil(initialDeposit)
						}
						name='deposit'
						rules={[
							{
								required: false,
								message: 'Amount cannot be less than the initial deposit!',
							},
						]}
					>
						<Input
							disabled
							min={Math.ceil(initialDeposit)}
							className='form-control'
							type='number'
							placeholder={'20% of the total amount and 5% processing fee'}
							style={{ width: 400, height: 40 }}
						/>
					</Form.Item>

					<Form.Item
						label='Mode of monthly payment'
						name='payment_method'
						rules={[
							{
								required: false,
								message: 'Select how you will make payments',
							},
						]}
					>
						<Select
							onChange={selectedPayMethod}
							size='large'
							value={payMethod}
							defaultValue={paymentOptions[0].text}
							style={{ width: 200 }}
							options={paymentOptions.map((opt) => ({
								label: opt.text,
								value: opt.val,
							}))}
						/>
					</Form.Item>
				</Space>
			</div>

			<div className='form-group'>
				<Space wrap>
					<Form.Item
						label={
							Math.ceil(installment) <= 0
								? 'Monthly Installments: KES ' + 1
								: 'Monthly Installments: KES ' +
								  parseFloat(installment).toFixed(2)
						}
						name='deposit'
						rules={[
							{
								required: false,
								message: 'Monthly installments',
							},
						]}
					>
						<Input
							disabled
							min={initialDeposit}
							className='form-control'
							type='number'
							placeholder={'KES ' + parseFloat(installment).toFixed(2)}
							value={installment}
							style={{ width: 400, height: 40 }}
						/>
					</Form.Item>
					<Form.Item name='duration' label='Payment Duration'>
						<Select
							size='large'
							defaultValue={3}
							style={{ width: 200 }}
							onChange={selectedPlan}
							options={paymentPlan.map((plan) => ({
								label: plan.text,
								value: plan.val,
							}))}
						/>
					</Form.Item>
				</Space>
			</div>

			<ModulePaymentShipping getShippingAddress={getShippingAddress} />

			<h3 className='ps-form__heading'>Choose Lender</h3>
			<div className='form-group'>
				<Form.Item
					className='mt-5'
					// label='Select a lender'
					name='power_usage_cost'
					required
				>
					<select
						style={{
							width: 400,
							height: '40px',
						}}
						placeholder='Select Lender'
						onChange={onLoanerChange}
						size='large'
					>
						<option selected disabled>
							Choose
						</option>
						{lendersOptions?.map((item) => {
							return (
								<>
									<option value={item?.value}>{item?.label}</option>
								</>
							);
						})}
					</select>
				</Form.Item>
			</div>

			{/* <LoanCheckModule loanCheck={loanCheck} /> */}

			<div className='form-group'>
				{/* <Form.Item required name='agrees_to_terms' valuePropName='checked'>
					<Checkbox required>
						<span style={{ color: '#000000' }}>
							<a
								target='_blank'
								rel='noreferrer'
								style={{ textDecoration: 'underline' }}
								href='/pay-later-agreement'
							>
								I agree and will abide to the specified terms and conditions.
							</a>
						</span>
					</Checkbox>
				</Form.Item> */}
				{/* </div> */}
			</div>
			<div className='ps-form__submit'>
				<Link href='/account/shopping-cart'>
					<a>
						<i className='icon-arrow-left mr-2'></i>
						Return to shopping cart
					</a>
				</Link>
				<div className='ps-block__footer'>
					<button
						disabled={open || helpText}
						title={open ? 'Cannot submit' : null}
						htmlType='submit'
						className={open || helpText ? 'ps-btn mx-5' : 'ps-btn'}
					>
						{sendEmailLoading ? (
							<span className='bnt-auth-text loader'></span>
						) : (
							<span className='bnt-auth-text'>Agree and Submit</span>
						)}
					</button>

					{helpText ? (
						<Popconfirm
							title={title}
							description='Open Popconfirm with async logic'
							open={open}
							onConfirm={handleOk}
							okButtonProps={{
								loading: confirmLoading,
							}}
							onCancel={handleCancel}
						>
							<button className='ps-btn' onClick={showPopconfirm}>
								{helpText}
							</button>
						</Popconfirm>
					) : null}
				</div>
			</div>
		</Form>
	);
}

export default FormCheckoutInformation;
