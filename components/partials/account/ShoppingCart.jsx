import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const ShoppingCart = () => {
	const cartItems = useSelector((state) => state.products.cart);

	return (
		<div className='ps-section--shopping ps-shopping-cart'>
			<div className='container'>
				<div className='ps-section__header'>
					<h1>Shopping Cart</h1>
				</div>
				<div className='ps-section__content'>
					<ModuleEcomerceCartItems cartItems={cartItems} />

					<div className='ps-section__cart-actions'>
						<Link href='/shop'>
							<a>
								<i className='icon-arrow-left mr-2'></i>
								Back to Shop
							</a>
						</Link>
					</div>
				</div>
				<div className='ps-section__footer'>
					<div className='row justify-content-end'>
						<div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 '>
							{/* <ModuleCartSummary source={cartItems} /> */}
							<Link href='/account/checkout'>
								<a className='ps-btn ps-btn--fullwidth'>Proceed to checkout</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
