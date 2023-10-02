import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
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
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { toast, ToastContainer } from 'react-toastify';
import { fetchBrands, fetchCategories } from '~/features/products/productSlice';
import { create, update } from '~/features/user/createUpdateSlice';
import { getVendorInventories } from '~/features/vendor/vendorSlice';

const { Dragger } = Upload;

// 10,485,760

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

let limit;

const props = {
	name: 'file',
	multiple: true,
	maxCount: 3,
};

const props2 = {
	name: 'image',
	multiple: false,
	maxCount: 1,
};

const props3 = {
	name: 'serials',
	multiple: false,
	maxCount: 1,
};

export default function VendorCreateProduct() {
	const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
	const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
	const formFull = useMediaQuery({ query: '(min-width: 1200px)' });
	const isLaptop = useMediaQuery({ query: '(max-width: 1199px)' });
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

	const [form] = Form.useForm();
	const router = useRouter();
	const { user, isLoggedIn } = useSelector((state) => state.user);
	const { vendor, activeInventory } = useSelector((state) => state.vendor);
	const { brands, categories } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	const [category, setcategory] = useState('');
	const [brand, setbrand] = useState('');
	const [loading, setloading] = useState(false);

	const invCopy = activeInventory;
	const invArray = [...invCopy.products];
	const invIdArray = [...invCopy.products_id];

	const handleDownloadTemplate = (e) => {
		e.preventDefault();
	};

	const onFinish = async (data) => {
		// data.image = data?.image?.fileList[0].originFileObj
		// data.features = features
		// data.category_id = category
		// data.brand_id = brand
		// data.sub_category_id = 2
		// data.vendor_id = user?.id
		// data.tags = tags
		// const newObj = {
		// 	...formData,
		// 	url: 'products/',
		// };

		let moreImages = data?.images?.fileList?.filter(
			(acc) => acc.size > 2097152,
		);

		if (data?.image?.fileList?.length > 1) {
			return message.error(`Main image should be a single image`);
		} else if (data?.image?.fileList[0].originFileObj?.size > 2097152) {
			return message.error(`File size should not exceed 2mbs`);
		} else if (data?.images?.fileList?.length > 3) {
			return message.error(`Additional images should not exceed 3 files`);
		} else if (moreImages?.length > 0) {
			return message.error(`Each additional image should not exceed 2mbs`);
		} else if (!data?.serials) {
			return message.error(
				`Please upload a file with serial numbers for the product`,
			);
		} else if (data?.serials?.fileList?.length > 1) {
			return message.error(
				`You are only allowed to upload one excel file for serial numbers`,
			);
		} else {
			setloading(true);
			let tags = data?.tags?.split(' ');
			let features = 'Features will be updated shortly'; //['Features will be updated shortly'];
			let is_sale = data?.discount ? true : false;
			const formData = new FormData();
			const serData = new FormData();

			if (data?.image?.fileList?.length) {
				formData.append(
					'image',
					data?.image?.fileList[0].originFileObj,
					data?.image?.name,
				);
			}

			if (data?.serials?.fileList?.length) {
				serData.append(
					'file',
					data?.serials?.fileList[0].originFileObj,
					data?.serials?.name,
				);
			}

			formData.append('category_id', category);
			formData.append('price', data.price || 0);
			formData.append('brand_id', brand);
			formData.append('tags', tags);
			formData.append('title', data?.title);
			formData.append('description', data?.description);
			formData.append('discount', data?.discount ? data?.discount : 0);
			formData.append('interest', data?.interest ? data?.interest : 0);
			formData.append(
				'is_pressure_cooker',
				data?.is_pressure_cooker ? data?.is_pressure_cooker : false,
			);
			formData.append('is_sale', is_sale);
			formData.append('features', features);
			formData.append('product_created_by', vendor.business_name);

			await fetch(`${url}/products/`, {
				method: 'POST',
				body: formData,
			})
				.then((res) => res.json())
				.then((product) => {
					if (product.uuid) {
						serData.append('product_id', product.uuid);
						invArray.push(product);
						invIdArray.push(product.uuid);

						const newObj = {
							...invCopy,
							products: invArray,
							products_id: invIdArray,
						};

						const invObj = {
							...newObj,
							url: `inventories/${invCopy.id}/`,
						};

						fetch(`${url}add-serials/`, {
							method: 'POST',
							body: serData,
						})
							.then((res) => res.json())
							.then((data) => {
								if (data.status === false) {
									fetch(`${url}products/${product.uuid}/`, {
										method: 'DELETE',
									})
										.then((res) => res.json())
										.then(data);
									return toast.error(data.message);
								}
							});

						dispatch(update(invObj));

						if (data?.images?.fileList?.length) {
							data?.images?.fileList?.map((file) => {
								const form_data = new FormData();
								form_data.append('images', file);
								form_data.append('product_id', product?.uuid);

								fetch(`${url}product-images/`, {
									method: 'POST',
									body: form_data,
								})
									.then((res) => res.json())
									.then((data) => {
										console.log(data);
									});
							});
						}

						dispatch(getVendorInventories(vendor.id));

						setloading(false);
						router.push('/vendor/inventory/products');
					} else {
						setloading(false);
						toast.error(
							'Cannot create product at the moment please try again later.',
						);
						// router.push('/vendor/products');
					}
				});
		}
	};

	function selectedCategory(value) {
		setcategory(value);
	}

	function selectedBrand(value) {
		setbrand(value);
	}

	function handleGoBack() {
		router.push('/vendor/products');
	}

	async function fetchProductOptions() {
		await dispatch(fetchBrands());
		await dispatch(fetchCategories());
	}

	useEffect(() => {
		fetchProductOptions();
	}, []);

	useEffect(() => {}, [loading]);

	return (
		<>
			<div className='ps-my-account ps-vendor-margin'>
				<div className='container'>
					<Form
						enctype='multipart/form-data'
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
							background: 'transparent',
							padding: '30px 30px 30px',
							color: '#000',
						}}
					>
						<h3 className='mb-5'>Create New product</h3>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='title' required label='Product Name'>
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

							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='category_id' required label='Category'>
									<Select
										style={{
											width: '160%',
										}}
										name='category_id'
										required
										onChange={selectedCategory}
										value={''}
										size='large'
									>
										{categories?.map((cat) => {
											return (
												<Select.Option required key={cat?.id} value={cat?.id}>
													{cat?.category}
												</Select.Option>
											);
										})}
									</Select>
								</Form.Item>
							</Col>

							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item required name='brand_id' label='Brand'>
									<Select
										style={{
											width: '160%',
										}}
										name='brand_id'
										required
										onChange={selectedBrand}
										value={''}
										size='large'
									>
										{brands?.map((brand) => {
											return (
												<Select.Option
													required
													key={brand?.id}
													value={brand?.id}
												>
													{brand?.brand}
												</Select.Option>
											);
										})}
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={24} lg={8} xl={8} wrap={true}>
								<Form.Item name='price' required label='Price (KES)'>
									<Input
										required
										type='number'
										style={{
											width: '160%',
										}}
										size='large'
									/>
								</Form.Item>
							</Col>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='discount' label='Discount (%)'>
									<Input
										type='number'
										style={{
											width: '160%',
										}}
										size='large'
									/>
								</Form.Item>
							</Col>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='interest' label='Interest (%)'>
									<InputNumber
										size='large'
										style={{
											width: '160%',
										}}
									/>
								</Form.Item>
							</Col>
						</Row>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='tags' label='Tags (Comma separated)'>
									<Input
										type='text'
										style={{
											width: '160%',
										}}
										size='large'
									/>
								</Form.Item>
							</Col>

							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item
									size='large'
									name='is_pressure_cooker'
									label='Is the product a pressure cooker?'
									style={{
										width: isMobile ? '100%' : '160%',
									}}
								>
									<Radio.Group
										style={{
											width: '100%',
										}}
									>
										<Radio value={true}> Yes </Radio>
										<Radio value={false}> No </Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Row flex='column' gutter={0}>
							<Col sm={24} xs={24} md={24} lg={16} xl={16}>
								<Form.Item name='description' label='Description'>
									<TextArea
										placeholder='Enter an eye catching description'
										rows={6}
									/>
								</Form.Item>
							</Col>

							<Col sm={24} xs={24} md={24} lg={8} xl={8}>
								<span>
									<a
										download
										href='/static/img/powerpayke_serials_template.xlsx'
										style={{
											width: '100%',
										}}
										className=''
									>
										Click here to download template file for serial numbers
									</a>
								</span>
								<Form.Item required name='serials' label='Serial Numbers'>
									<Dragger
										accept='.xls, .xlsx'
										multiple={false}
										style={{
											width: '160%',
										}}
										{...props3}
									>
										<p className='ant-upload-drag-icon'>
											<PlusOutlined />
										</p>
										<p className='ant-upload-text'>
											Click or drag files to upload
										</p>
										<p className='ant-upload-hint'>
											Excel file with serial numbers
										</p>
									</Dragger>
								</Form.Item>
							</Col>
						</Row>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item required name='image' label='Main Image'>
									<Dragger
										style={{
											width: '160%',
										}}
										{...props2}
									>
										<p className='ant-upload-drag-icon'>
											<PlusOutlined />
										</p>
										<p className='ant-upload-text'>Upload file</p>
										<p className='ant-upload-hint'>
											Add single image (2mbs max)
										</p>
									</Dragger>
								</Form.Item>
							</Col>

							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='images' label='Other Images'>
									<Dragger
										style={{
											width: '160%',
										}}
										{...props}
									>
										<p className='ant-upload-drag-icon'>
											<PlusOutlined />
										</p>
										<p className='ant-upload-text'>
											Click or drag files to upload
										</p>
										<p className='ant-upload-hint'>
											Upto 3 images (each 2mbs max)
										</p>
									</Dragger>
								</Form.Item>
							</Col>
							{/* 
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item required name='features' label='Features (Comma separated)'>
									<TextArea
										required
										style={{
											height: '102px',
										}}
										placeholder='eg. Features 1, features 2, features 3'
									/>
								</Form.Item>
							</Col> */}
						</Row>

						<div className='d-flex align-items-center mt-5'>
							<button
								onClick={handleGoBack}
								disabled={loading ? true : false}
								id='page-one-btn'
								class='btn-table-add mr-3'
							>
								Back
							</button>

							<button
								disabled={loading ? true : false}
								id='page-one-btn'
								htmlType='submit'
								class='btn-auth-submit'
							>
								{loading ? (
									<span className='bnt-auth-text loader'></span>
								) : (
									<span className='bnt-auth-text'>Create product</span>
								)}
							</button>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
}
