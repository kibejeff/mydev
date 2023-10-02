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

export default function VendorEditProduct() {
	const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
	const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
	const formFull = useMediaQuery({ query: '(min-width: 1200px)' });
	const isLaptop = useMediaQuery({ query: '(max-width: 1199px)' });
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

	const [form] = Form.useForm();
	const router = useRouter();
	const { user, isLoggedIn } = useSelector((state) => state.user);
	const { brands, categories } = useSelector((state) => state.products);
	const { editedProducts } = useSelector((state) => state.vendor);
	const dispatch = useDispatch();

	const [category, setcategory] = useState('');
	const [brand, setbrand] = useState('');
	const [loading, setloading] = useState(false);
	const [formData, setformData] = useState({
		title: editedProducts?.title,
		price: editedProducts?.price,
		discount: editedProducts?.discount,
		interest: editedProducts?.interest,
		category: editedProducts?.category?.category,
		brand: editedProducts?.brand?.brand,
		image: editedProducts?.image,
		description: editedProducts?.description,
		is_pressure_cooker: editedProducts?.is_pressure_cooker,
		tags: editedProducts?.tags,
	});

	const onFinish = async (data) => {
		let moreImages = data?.images?.fileList?.filter(
			(acc) => acc.size > 2097152,
		);
		
		if (data?.image?.fileList?.length > 1) {
			setloading(false);
			return message.error(`Main image should be a single image`);
		} else if (data?.image?.fileList[0].originFileObj?.size > 2097152) {
			setloading(false);
			return message.error(`File size should not exceed 2mbs`);
		} else if (data?.images?.fileList?.length > 3) {
			setloading(false);
			return message.error(`Additional images should not exceed 3 files`);
		} else if (moreImages?.length > 0) {
			setloading(false);
			return message.error(`Each additional image should not exceed 2mbs`);
		} else {

			setloading(true);
		let disc = data?.discount || editedProducts?.discount;
		let tags = data?.tags?.split(' ');
		let features = ['Features will be updated shortly'];
		let is_sale = data?.discount || editedProducts?.discount ? true : false;
		let badge = data?.discount || editedProducts?.discount ? disc + '' : '';

		const formData = new FormData();
		if (data?.image?.fileList[0].originFileObj) {
			formData.append('image', data?.image?.fileList[0].originFileObj);
		}

		formData.append('category_id', category || editedProducts?.category_id);
		formData.append('brand_id', brand || editedProducts?.brand_id);
		formData.append('sub_category_id', 2);
		formData.append('vendor_id', user?.id);
		formData.append('tags', tags || editedProducts?.tags);
		formData.append('title', data?.title || editedProducts?.title);
		formData.append(
			'description',
			data?.description || editedProducts?.description,
		);
		formData.append('discount', data?.discount || editedProducts?.discount);
		formData.append('interest', data?.interest || editedProducts?.interest);
		formData.append(
			'is_pressure_cooker',
			data?.is_pressure_cooker || editedProducts?.is_pressure_cooker,
		);
		formData.append('is_sale', is_sale);
		formData.append('badge', badge);
		formData.append('features', features);
		formData.append('price', data?.price || editedProducts?.price);
		const newObj = {
			...formData,
			url: 'products/',
		};

			await fetch(`${url}/products/${editedProducts?.uuid}/`, {
				method: 'PATCH',
				body: formData,
			})
				.then((res) => res.json())
				.then((product) => {
					if (product?.uuid) {
						if (data?.images?.fileList?.length) {
							data?.images?.fileList?.map((file) => {
								const form_data = new FormData();
								form_data.append('images', file);
								form_data.append('product_id', product?.uuid);

								fetch(`${url}/product-images/`, {
									method: 'POST',
									body: form_data,
								})
									.then((res) => res.json())
									.then((data) => {});
							});
						}
						setloading(false);
						router.push('/vendor/inventory/products');
					} else {
						setloading(false);
						// router.push("/vendor/products")
					}
				});
		}

		// dispatch(create(newObj))
	};

	function selectedCategory(value) {
		setcategory(value);
	}

	function selectedBrand(value) {
		setbrand(value);
	}

	function handleGoBack() {
		router.push('/vendor/inventory/products');
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
						<h3 className='mb-5'>Edit Product - {editedProducts?.title}</h3>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='title' label='Product Name'>
									<Input
										placeholder={formData?.title}
										defaultValue={formData.title}
										type='text'
										size='large'
										style={{
											width: '160%',
										}}
									/>
								</Form.Item>
							</Col>

							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='category_id' label='Category'>
									<Select
										style={{
											width: '160%',
										}}
										name='category_id'
										onChange={selectedCategory}
										value={''}
										size='large'
										defaultValue={formData?.category_id}
										placeholder={formData?.category_name}
									>
										{categories?.map((cat) => {
											return (
												<Select.Option key={cat?.id} value={cat?.id}>
													{cat?.category}
												</Select.Option>
											);
										})}
									</Select>
								</Form.Item>
							</Col>

							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='brand_id' label='Brand'>
									<Select
										style={{
											width: '160%',
										}}
										name='brand_id'
										onChange={selectedBrand}
										size='large'
										defaultValue={formData?.brand_id}
										placeholder={formData?.brand_nmae}
									>
										{brands?.map((brand) => {
											return (
												<Select.Option key={brand?.id} value={brand?.id}>
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
								<Form.Item name='price' label='Price (KES)'>
									<Input
										placeholder={formData?.price}
										defaultValue={formData?.price}
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
										placeholder={formData?.discount}
										defaultValue={formData?.discount}
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
										placeholder={formData?.interest}
										defaultValue={formData?.interest}
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
										// placeholder={formData?.tags ? formData?.tags?.join(', ') : "Add Tags"}
										// defaultValue={formData?.tags ? formData?.tags?.join(', ') : ''}
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
										<Radio checked={formData?.is_pressure_cooker} value={true}>
											{' '}
											Yes{' '}
										</Radio>
										<Radio checked={formData?.is_pressure_cooker} value={false}>
											{' '}
											No{' '}
										</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Row flex='column' gutter={0}>
							<Col sm={24} xs={24} md={24} lg={24} xl={24}>
								<Form.Item name='description' label='Description'>
									<TextArea
										placeholder={
											formData?.description ? formData?.description : 'N/A'
										}
										defaultValue={
											formData?.description ? formData?.description : 'N/A'
										}
										rows={6}
									/>
								</Form.Item>
							</Col>
						</Row>

						<Row flex='column' gutter={0}>
							<Col sm={16} xs={16} md={24} lg={8} xl={8}>
								<Form.Item name='image' label='Main Image'>
									{/* <Upload
										accept='image/*'
										multiple='false'
										listType='picture-card'
									>
										<div>
											<PlusOutlined />
											<div
												style={{
													marginTop: 8,
													width: '250px',
												}}
											>
												Add Image
											</div>
										</div>
									</Upload> */}
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
										disabled
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
								<Form.Item name='features' label='Features (Comma separated)'>
									<TextArea
										
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
									<span className='bnt-auth-text'>Update product</span>
								)}
							</button>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
}
