import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
// import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import { ToastContainer } from 'react-toastify';
// import data from '~/data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductImages } from '~/features/products/productSlice';
// import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct';

function ProductDefaultPage() {
	const router = useRouter();
	const { pid } = router.query;
	const { products, loading, productImages } = useSelector(
		(state) => state.products,
	);
	const dispatch = useDispatch();

	const product = products?.find((item) => item?.uuid == pid);

	async function handleproductImages() {
		const imgObj = {
			product_id: pid,
		};
		await dispatch(fetchProductImages(imgObj));
	}

	useEffect(() => {
		handleproductImages();
	}, []);

	useEffect(() => {
		handleproductImages();
	}, [product, pid]);

	useEffect(() => {}, [pid, productImages]);

	const breadCrumb = [
		{
			text: 'Home',
			url: '/',
		},
		{
			text: 'Shop',
			url: '/shop',
		},
		{
			text: product ? product?.title : 'Loading! Please Wait...',
		},
	];
	// Views
	let productView, headerView;
	if (!loading) {
		if (product) {
			productView = <ProductDetailFullwidth product={product} />;
			headerView = (
				<>
					<HeaderDefault />
					{/* <HeaderMobileProduct /> */}
				</>
			);
		} else {
			headerView = (
				<>
					<HeaderDefault />
					{/* <HeaderMobileProduct /> */}
				</>
			);
		}
	} else {
		productView = <SkeletonProductDetail />;
	}

	return (
		<PageContainer
			header={headerView}
			title={product ? product?.title : 'Loading...'}
		>
			<BreadCrumb breacrumb={breadCrumb} layout='fullwidth' />
			<div className='ps-page--product'>
				<div className='ps-container'>
					<div className='ps-page__container'>
						<div className='ps-page__left'>{productView}</div>
						<div className='ps-page__right'>
							<ProductWidgets
								product_id={product?.uuid}
								collectionSlug={product?.brand?.brand}
							/>
						</div>
					</div>

					{/* <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                    /> */}
					<RelatedProduct collectionSlug={product?.category_name} />
				</div>
			</div>
			<Newletters />
		</PageContainer>
	);
}

export default ProductDefaultPage;
