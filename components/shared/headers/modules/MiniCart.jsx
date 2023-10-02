import React, { useEffect } from 'react';

import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import { calculateCartTotal } from '~/utilities/ecomerce-helpers';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '~/features/products/productSlice';

const MiniCart = () => {

	const data = useSelector(state => state.products.cart)
	const dispatch = useDispatch()

	function handleRemoveItem(productId) {
		dispatch(removeFromCart(productId));
	}

	let cartItemsView;
	if (data?.length) {
		const productItems = data.map((item) => {
			return (
				<ProductOnCart product={item} key={item.id}>
					<a onClick={() => handleRemoveItem(item.id)} className='ps-product__remove'>
						<i className='icon-cross'></i>
					</a>
				</ProductOnCart>
			);
		});
		cartItemsView = (
			<div className='ps-cart__content'>
				<div className='ps-cart__items'>{productItems}</div>
				<div className='ps-cart__footer'>
					<h3>
						Total:
						<strong>KES {calculateCartTotal(data)}</strong>
					</h3>
					<figure>
						<Link href='/account/shopping-cart'>
							<a className='ps-btn'>View Cart</a>
						</Link>
						<Link href='/account/checkout'>
							<a className='ps-btn'>Checkout</a>
						</Link>
					</figure>
				</div>
			</div>
		);
	} else {
		cartItemsView = (
			<div className='ps-cart__content'>
				<div className='ps-cart__items'>
					<span>No products in cart</span>
				</div>
			</div>
		);
	}

	return (
		<div className='ps-cart--mini'>
			<a className='header__extra' href='#'>
				<i className='icon-bag2'></i>
				<span>
					<i>{data?.length}</i>
				</span>
			</a>
			{cartItemsView}
		</div>
	);
};

export default MiniCart;
