import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addItemToPay } from '~/features/products/productSlice';
import { useRouter } from 'next/router';
import {
	deleteProduct,
	fetchMyProducts,
	getVendorInventories,
	handleEditProduct,
} from '~/features/vendor/vendorSlice';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

function VendorProducts() {
	const { loading, deleting, activeInventory, vendor } = useSelector(
		(state) => state.vendor,
	);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	const [modal2Open, setModal2Open] = useState(false);
	const [productObj, setproductObj] = useState({});
	const [invProducts, setinvProducts] = useState(activeInventory)

	function addNewProduct() {
		router.push('/vendor/products/new-product');
	}

	async function editProduct(prod) {
		await dispatch(handleEditProduct(prod));
		await router.push('/vendor/products/edit');
	}

	async function deleteVendorProduct() {
		await dispatch(deleteProduct(productObj?.uuid));
		await dispatch(getVendorInventories(vendor.id));
		await setproductObj({});
		await setModal2Open(false);
	}

	async function handleGetInventory() {
		const resp = await dispatch(
			getVendorInventories(vendor.id),
		);

		if (resp?.payload?.results?.length) {
			const actv = resp?.payload?.results.find(item => item.id === activeInventory.id)
			setinvProducts(actv);
		}
	}

	function openDeleteModal(obj) {
		console.log(obj);
		setproductObj(obj);
		setModal2Open(true);
	}

	function openDeleteModalCancel(obj) {
		setproductObj({});
		setModal2Open(false);
	}

	useEffect(() => {
		handleGetInventory()
	}, []);

	useEffect(() => {}, [invProducts, activeInventory]);

	const tableColumn = [
		{
			title: '',
			dataIndex: 'image_url',
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
			title: 'Product Title',
			dataIndex: 'title',
			key: 'title',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Price (KES)',
			dataIndex: 'price',
			key: 'price',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Category',
			dataIndex: 'category_name',
			key: 'category_name',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Brand',
			dataIndex: 'brand_name',
			key: 'brand_name',
			render: (item) => <a className='text-capitalize'>{item}</a>,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (item) => <a className=''>{item} pieces</a>,
		},
		{
			title: 'Discount',
			key: 'discount',
			dataIndex: 'discount',
			render: (item) => <a className=''>{item ? item : 0}</a>,
		},
		{
			title: 'Action',
			key: 'uuid',
			render: (item) => (
				<>
					<button
						onClick={() => editProduct(item)}
						disabled={deleting}
						className='btn-table-edit'
					>
						Edit
					</button>
					<button
						disabled={deleting}
						onClick={() => openDeleteModal(item)}
						className='btn-table-reject ml-3'
					>
						Delete
					</button>
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
								<h3>{activeInventory?.inventory_name} Inventory</h3>
								<button
									onClick={addNewProduct}
									className='btn-table-add d-flex align-items-center'
								>
									Add new product
								</button>
							</div>
						</div>
						<Table
							scroll={{ x: '100%' }}
							loading={loading}
							columns={tableColumn}
							dataSource={invProducts.products}
						/>
					</div>
				</div>
			</div>

			<Modal
				title='Confirm Deleting Product'
				centered
				visible={modal2Open}
				onOk={deleteVendorProduct}
				okText={'Delete'}
				onCancel={openDeleteModalCancel}
				okButtonProps={{
					disabled: deleting,
					className: 'btn btn-pay',
				}}
				cancelButtonProps={{
					disabled: deleting,
					className: 'btn btn-pay-inverse',
				}}
			>
				{loading || deleting ? (
					<>
						<span className='loader'></span>
						<p>Deleting product. Please wait...</p>
					</>
				) : (
					<>
						<p>Confirm deleting this product. This process is irreversible.</p>

						<ul>
							<li>Title: {productObj?.title}</li>
							<li>Price: {productObj?.price}</li>
							<li>Category: {productObj?.category?.category}</li>
						</ul>
					</>
				)}
			</Modal>
		</>
	);
}

export default VendorProducts;
