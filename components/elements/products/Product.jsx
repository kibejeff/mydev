import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';
import { ratesAverage } from '~/utilities/product-helper';
import { useSelector } from 'react-redux';

const Product = ({ product }) => {
	const { thumbnailImage, price, badge, title } = useProduct();
	const { user } = useSelector((state) => state.user);

	return (
		<div className='ps-product'>
			<div className='ps-product__thumbnail'>
				<Link href='/product/[pid]' as={`/product/${product?.uuid}`}>
					<a>{thumbnailImage(product.image_url)}</a>
				</Link>
				{product?.badge
					? badge(product?.badge)
					: product?.coming_soon
					? 'Coming Soon'
					: null}
				{user?.is_vendor ? null : <ModuleProductActions product={product} />}
			</div>
			<div className='ps-product__container'>
				<Link href='/shop'>
					<a className='ps-product__vendor'>{product?.product_created_by}</a>
				</Link>
				<div className='ps-product__content'>
					{title(product.title, product.uuid)}
					<div className='ps-product__rating'>
						<Rating rates={3} />
					</div>
					{price(product.price, product.discount)}
				</div>
				<div className='ps-product__content hover'>
					{title(product.title, product.uuid)}
					{price(product.price, product.discount)}
				</div>
			</div>
		</div>
	);
};

export default Product;
