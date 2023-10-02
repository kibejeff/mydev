import React, { useEffect, useState } from 'react';
import { Table, Tag, Card, Avatar } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import {
	clearActiveInventory,
	fetchMyLoans,
	getVendorInventories,
	setActiveInventory,
} from '~/features/vendor/vendorSlice';
import { MoreOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { create } from '~/features/user/createUpdateSlice';

const { Meta } = Card;

function VendorInventoryManagement({ data }) {
	const { loading, vendor } = useSelector((state) => state.vendor);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	const [modal2Open, setModal2Open] = useState(false);
	const [productObj, setproductObj] = useState({});
	const [inventories, setinventories] = useState(data);

	function handleChange(e) {
		setproductObj((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	function openLoanModal() {
		setModal2Open(true);
	}

	async function inventoryModalCancel() {
		await setModal2Open(false);
		await setproductObj({});
	}

	async function handleInvetoryChange(obj) {
		await dispatch(setActiveInventory(obj));
		await router.push("/vendor/inventory/products")
	}

	async function handleCreateInventory() {
		productObj.vendor_id = vendor.id;
		productObj.status = 'Active';
		productObj.products_id = [];
		productObj.products = [];
		const newObj = {
			url: 'inventories/',
			...productObj,
		};
		const res = await dispatch(create(newObj));
		if (res?.payload?.id) {
			toast.success('Inventory created successful');

			const resp = await dispatch(getVendorInventories(vendor.id));

			if (resp?.payload?.results?.length) {
				setinventories(resp?.payload?.results);
			}
			inventoryModalCancel();
		} else {
			toast.error('Could not create a new inventory. Please try again later.');
		}
	}

	useEffect(() => {}, [productObj, inventories]);

	useEffect(() => {
		setinventories(data);
	}, [data]);

	useEffect(() => {
		dispatch(clearActiveInventory());
	}, []);

	const tableColumn = [
		{
			title: 'Inventory Name',
			dataIndex: 'inventory_name',
			key: 'inventory_name',
			render: (item) => <a>{item}</a>,
		},
		{
			title: 'Inventory Type',
			dataIndex: 'inventory_type',
			key: 'inventory_type',
			render: (item) => <a>{item}</a>,
		},
		{
			title: 'Total Items',
			key: 'products',
			render: (item) => (
				<a className='text-capitalize'>{item?.products_id?.length}</a>
			),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Action',
			render: (item) => (
				<>
					<button onClick={() => handleInvetoryChange(item)} className='btn'>
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
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<h3>Inventory Management</h3>
						<button onClick={() => openLoanModal({ xyz: 'xyz' })} className=''>
							Create Inventory
						</button>
					</div>
					<hr />
					<div className='ps-section__content mt-5'>
						<Table
							scroll={{ x: '100%' }}
							pagination={{
								defaultPageSize: 10,
								hideOnSinglePage: true,
								pageSizeOptions: [10, 20, 50, 100],
							}}
							loading={loading}
							columns={tableColumn}
							dataSource={inventories}
						/>
					</div>
				</div>
			</div>

			<Modal
				title={true ? 'Create Inventory' : 'Edit Inventory'}
				centered
				visible={modal2Open}
				onOk={handleCreateInventory}
				okText={loading ? 'Saving...' : 'Save'}
				onCancel={inventoryModalCancel}
				okButtonProps={{
					disabled: loading,
					className: 'btn btn-pay',
				}}
				cancelButtonProps={{
					disabled: loading,
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
						<div className='mt-3'>
							<div className='d-flex flex-column'>
								<label for='name'>Inventory Name</label>
								<input
									type='text'
									name='inventory_name'
									onChange={handleChange}
								/>
							</div>
							<div className='d-flex flex-column mt-3'>
								<label for='type'>Inventory Type</label>
								<input
									type='text'
									name='inventory_type'
									onChange={handleChange}
								/>
							</div>
						</div>
					</>
				)}
			</Modal>
		</>
	);
}

export default VendorInventoryManagement;
