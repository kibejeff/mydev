import React, { useEffect, useState } from 'react';
import { Table, Tag, Card, Avatar, Tabs } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { getVendorActiveLoans, getVendorPendingDepositLoans, getVendorPendingLoans } from '~/features/vendor/vendorSlice';

const { Meta } = Card;
const { TabPane } = Tabs;

function VendorLoansManagement({ limit }) {
	const { user, isLoggedIn } = useSelector((state) => state.user);
	const { loading, pendingLoans, pendingDepositLoans, activeLoans, vendor } = useSelector((state) => state.vendor);

	const dispatch = useDispatch();
	const router = useRouter();

	const [modal2Open, setModal2Open] = useState(false);
	const [productObj, setproductObj] = useState({});
	const [loanPending, setloanPending] = useState(pendingLoans)
	const [loanDepositPending, setloanDepositPending] = useState(pendingDepositLoans)
	const [loanActive, setloanActive] = useState(activeLoans)

	function openLoanModal(obj) {
		setproductObj(obj);
		setModal2Open(true);
	}

	async function loanModalCancel() {
		await setModal2Open(false);
		await setproductObj({});
	}

	async function handleFollowUp() {
		await toast.info('Notification has been sent');
		await loanModalCancel();
	}

	function callback(key) {
		console.log(key);
	}

	async function handleGetVendorPendingLoans() {
		const res = await dispatch(getVendorPendingLoans(vendor.id));
		if (res?.payload?.results?.length) {
			setloanPending(res?.payload?.results);
		}
	}

	async function handleGetVendorActiveLoans() {
		const res = await dispatch(getVendorActiveLoans(vendor.id));
		if (res?.payload?.results?.length) {
			setloanActive(res?.payload?.results);
		}
	}

	async function handleGetVendorPendingDepositLoans() {
		const res = await dispatch(getVendorPendingDepositLoans(vendor.id));
		if (res?.payload?.results?.length) {
			setloanDepositPending(res?.payload?.results);
		}
	}

	useEffect(() => {
		handleGetVendorPendingLoans()
		handleGetVendorActiveLoans()
		handleGetVendorPendingDepositLoans()
	}, []);

	useEffect(() => {}, [productObj]);

	useEffect(() => {
		setloanPending(pendingLoans)
	}, [pendingLoans]);

	useEffect(() => {
		setloanDepositPending(pendingDepositLoans)
	}, [pendingDepositLoans]);

	useEffect(() => {
		setloanActive(activeLoans)
	}, [activeLoans]);

	useEffect(() => {
	}, [loanActive, loanDepositPending, loanPending]);

	if (!isLoggedIn) {
		router.push('/account/login');
	}

	if (!user?.is_vendor) {
		router.push('/');
	}

	const tableColumn = [
		{
			title: 'Client Details',
			key: 'id',
			width: 200,
			render: (text) => (
				<a>
					<Meta
						// avatar={
						// 	<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />
						// }
						title={text?.buyer_names}
						description={text?.buyer_email}
					/>
				</a>
			),
		},
		{
			title: 'Phone',
			dataIndex: 'buyer_phone',
			key: 'buyer_phone',
			render: (item) => <a>{item}</a>,
		},
		{
			title: 'Balance (KES)',
			dataIndex: 'remaining_balance',
			key: 'remaining_balance',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Installments (KES)',
			dataIndex: 'monthly_installments',
			key: 'monthly_installments',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Status',
			dataIndex: 'loan_status',
			key: 'loan_status',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'First Pay',
			dataIndex: 'first_payment',
			key: 'first_payment',
			render: (item) => <a>{item ? moment(item).format('LL') : 'Pending'}</a>,
		},
		{
			title: 'Next Pay',
			dataIndex: 'last_payment',
			key: 'last_payment',
			render: (item) => <a>{item ? moment(item).add(30, 'days').format('LL') : 'Pending'}</a>,
		},
		{
			title: 'Options',
			render: (item) => (
				<>
					<button onClick={() => openLoanModal(item)} className='btn'>
						<MoreOutlined
							style={{
								fontSize: '24px',
							}}
						/>
					</button>
				</>
			),
		},
	];

	return (
		<>
			<div className='ps-vendor-dashboard ps-vendor-margin'>
				<div className='container'>
					<h3>Loans Management</h3>
					<hr />
					<div className='ps-section__content mt-5'>
						<Tabs defaultActiveKey='1' onChange={callback}>
							<TabPane tab='Active Loans' key='1'>
								<Table
									scroll={{ x: '100%' }}
									loading={loading}
									columns={tableColumn}
									dataSource={loanActive}
									pagination={{
										defaultPageSize: 10,
										hideOnSinglePage: true,
										pageSizeOptions: [10, 20, 50, 100],
									}}
								/>
							</TabPane>
							<TabPane tab='Pending Approvals' key='2'>
								<Table
									scroll={{ x: '100%' }}
									loading={loading}
									columns={tableColumn}
									dataSource={loanPending}
									pagination={{
										defaultPageSize: 10,
										hideOnSinglePage: true,
										pageSizeOptions: [10, 20, 50, 100],
									}}
								/>
							</TabPane>
							<TabPane tab='Pending Deposit Payment' key='3'>
								<Table
									scroll={{ x: '100%' }}
									loading={loading}
									columns={tableColumn}
									dataSource={loanDepositPending}
									pagination={{
										defaultPageSize: 10,
										hideOnSinglePage: true,
										pageSizeOptions: [10, 20, 50, 100],
									}}
								/>
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>

			<Modal
				title={'Loan Follow up: ' + productObj?.buyer_names}
				centered
				visible={modal2Open}
				onOk={handleFollowUp}
				okText={'Ok'}
				onCancel={loanModalCancel}
				okButtonProps={{
					className: 'btn btn-pay',
				}}
				cancelButtonProps={{
					className: 'btn btn-pay-inverse',
				}}
			>
				{loading ? (
					<>
						<span className='loader'></span>
						<p>Loading. Please wait...</p>
					</>
				) : (
					<>
						<p>Available options</p>

						<div className='mt-3'>
							<select name='' id=''>
								<option selected disabled>
									Select an option
								</option>
								<option value='remind'>
									Has paid this month's Installment
								</option>
								<option value='conatct'>Send reminder notification</option>
								<option value='report'>Report</option>
							</select>
						</div>
					</>
				)}
			</Modal>
		</>
	);
}

export default VendorLoansManagement;
