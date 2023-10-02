import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addItemToPay } from '~/features/products/productSlice';
import { useRouter } from 'next/router';

function TableNotifications({ data }) {
	const dispatch = useDispatch();
	const router = useRouter();

	const { loading } = useSelector((state) => state.products);

	const [orders, setorders] = useState(data);

	useEffect(() => {}, [orders]);

	useEffect(() => {
		setorders(data);
	}, [data]);

	async function handleAddItemToPay(e, item) {
		e.preventDefault();
		await dispatch(addItemToPay(item));
		await router.push('/account/payment');
	}

	const tableColumn = [
		{
			title: 'Date',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text) => <a>{moment(text).format('MMMM Do, h:mm a')}</a>,
			width: '100px',
		},
		{
			title: 'Product Title',
			dataIndex: 'product_title',
			key: 'product_title',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Deposit (KES)',
			dataIndex: 'deposit',
			key: 'deposit',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Duration',
			dataIndex: 'duration',
			key: 'duration',
			render: (item) => <a className=''>{item} Months</a>,
		},
		{
			title: 'Approval Status',
			key: 'approval_status',
			dataIndex: 'approval_status',
			render: (status) => (
				<span>
					<Tag
						color={
							status === 'Pending'
								? 'yellow'
								: status === 'Rejected'
								? 'red'
								: 'green'
						}
					>
						{status?.toUpperCase()}
					</Tag>
				</span>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (item) =>
				item?.status === 'Approved' && !item?.is_payed ? (
					<a
						className='btn btn-pay'
						onClick={(e) => handleAddItemToPay(e, item)}
					>
						<a>Proceed To pay</a>
					</a>
				) : item?.is_payed ? (
					<Tag color='green'>
						<a className='text-success p-2'>Payed Successfully</a>
					</Tag>
				) : item?.status === 'Rejected' ? (
					<span>
						<a>Loan rejected</a>
					</span>
				) : (
					<span>
						<a>Awaiting approval</a>
					</span>
				),
		},
	];

	return (
		<Table
			loading={loading}
			pagination={{
				defaultPageSize: 10,
				hideOnSinglePage: true,
				pageSizeOptions: [10, 20, 50, 100],
			}}
			columns={tableColumn}
			dataSource={orders}
		/>
	);
}

export default TableNotifications;
