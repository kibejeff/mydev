import React from 'react';
import { Result } from 'antd';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '~/features/products/productSlice';
import { ToastContainer } from 'react-toastify';
import { calculateDiscount } from '~/utilities/product-helper';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const ModuleEcomerceCartItems = ({ cartItems }) => {
	const dispatch = useDispatch();

	function handleRemoveItem(e, productId) {
		e.preventDefault();
		dispatch(removeFromCart(productId));
	}

	function handleIncreaseItemQty(e, productId) {
		e.preventDefault();
	}

	function handleDecreaseItemQty(e, productId) {
		e.preventDefault();
	}

	let cartItemsViews;
	if (cartItems && cartItems.length > 0) {
		const items = cartItems.map((item) => {
			return (
				<tr key={item.id}>
					<td>{item.title}</td>
					<td data-label='price' className='price'>
						KES {calculateDiscount(item?.price, item?.discount)}
					</td>
					<td data-label='quantity'>
						<div className='form-group--number'>
							<button
								disabled
								title='You currently cannot add more than one item!'
								className='up'
								onClick={(e) => handleIncreaseItemQty(e, item.id)}
							>
								+
							</button>
							<button
								disabled
								title='Can only buy one item'
								className='down'
								onClick={(e) => handleDecreaseItemQty(e, item.id)}
							>
								-
							</button>
							<input
								className='form-control'
								type='text'
								placeholder={item.quantity}
								disabled={true}
							/>
						</div>
					</td>
					<td data-label='total'>
						<strong>KES {(calculateAmount(item)).toFixed(2)}</strong>
					</td>
					<td>
						<a href='#' onClick={(e) => handleRemoveItem(e, item.id)}>
							<i className='icon-cross'></i>
						</a>
					</td>
				</tr>
			);
		});

		cartItemsViews = (
			<>
				<table className='table  ps-table--shopping-cart ps-table--responsive'>
					<thead>
						<tr>
							<th>Product</th>
							<th>Amount</th>
							<th>Quantity</th>
							<th>Total</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{items}</tbody>
				</table>
			</>
		);
	} else {
		cartItemsViews = (
            <>
            <Result status='warning' title='No product in cart.' />
            </>
        )
	}
	return (
		<>
			{cartItemsViews}
		</>
	);
};

export default ModuleEcomerceCartItems;
