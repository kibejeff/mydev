import React, { useEffect } from 'react';
import Link from 'next/link';
import {
	calculateAmount,
	calculateCartTotal,
} from '~/utilities/ecomerce-helpers';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '~/features/products/productSlice';

const ModulePaymentOrderSummary = () => {
	const data = useSelector((state) => state.products.cart);
	const { shippingLocation, shippingPrice, months } = useSelector(
		(state) => state.addon,
	);
	const dispatch = useDispatch();

	function handleRemoveItem(productId) {
		dispatch(removeFromCart(productId));
	}

	let listItemsView, shippingView, totalView;
	let amount;
	let products = data;

	if (products && products.length > 0) {
		amount = calculateCartTotal(products);
		listItemsView = products.map((item) => (
			<Link href='/account/shopping-cart' key={item.id}>
				<a>
					<strong>
						{item.title}
						<span>x{item.quantity}</span>
					</strong>
					<small>KES {calculateAmount(item)}</small>
				</a>
			</Link>
		));
	} else {
		listItemsView = <p>No Product.</p>;
	}

	const processingFee = Math.ceil(amount * (5 / 100))
	const deposit = Math.ceil(amount * (20 / 100))

	if (shippingPrice) {
		shippingView = (
			<>
				<figure>
					<figcaption>
						<strong>Shipping Location</strong>
						<small>{shippingLocation}</small>
					</figcaption>
				</figure>

				<figure>
					<figcaption>
						<strong>Shipping Fee</strong>
						<small>KES {shippingPrice}</small>
					</figcaption>
				</figure>

				<figure>
					<figcaption>
						<strong>Processing Fee</strong>
						<small>KES {processingFee}</small>
					</figcaption>
				</figure>
			</>
		);
		totalView = (
			<figure className='ps-block__total'>
				<h3>
					Total
					<strong>
						KES {Number(deposit) + Number(shippingPrice) + Number(processingFee)}
					</strong>
				</h3>
			</figure>
		);
	} else {
		totalView = (
			<figure className='ps-block__total'>
				<h3>
					Total
					<strong>KES {parseInt(amount)}.00</strong>
				</h3>
			</figure>
		);
	}

	return (
		<div className='ps-block--checkout-order'>
			<div className='ps-block__content'>
				<figure>
					<figcaption>
						<strong>Product</strong>
						<strong>total</strong>
					</figcaption>
				</figure>
				<figure className='ps-block__items'>{listItemsView}</figure>
				<figure>
					<figcaption>
						<strong>Deposit</strong>
						<small>KES {deposit}</small>
					</figcaption>
				</figure>
				{shippingView}
				{totalView}
			</div>
		</div>
	);
};
export default ModulePaymentOrderSummary;
