import React, { useEffect, useState } from 'react';
import useEcomerce from '~/hooks/useEcomerce';
import ProductCart from '~/components/elements/products/ProductCart';
import data from '~/data';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToCart,
	removeFromCart,
	removeFromWishlist,
} from '~/features/products/productSlice';
import { ToastContainer } from 'react-toastify';

export default function Wishlist() {
	const [loading, setloading] = useState(false);
	const { wishList, cart } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	function handleRemoveFromWishlist(e, id) {
		e.preventDefault();
		dispatch(removeFromWishlist(id));
	}

	function handleAddToCart(e, product) {
		e.preventDefault();
		dispatch(addToCart(product));
	}

    function handleRemoveFromCart(e, id) {
		e.preventDefault();
		dispatch(removeFromCart(id));
	}

	let selectedItem;

	let wishlistItemsView;

	if (wishList?.length) {
		wishlistItemsView = (
			<div className='table-responsive'>
				<table className='table ps-table--whishlist'>
					<thead>
						<tr>
							<th></th>
							<th>Product name</th>
							<th>Unit Price</th>
							<th>Vendor</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{wishList?.map((product) => {
							if (cart?.length) {
								selectedItem = cart.find((item) => item.uuid === product.uuid);
							}
							return (
								<tr key={product.uuid}>
									<td>
										<a
											href='#'
											onClick={(e) => handleRemoveFromWishlist(e, product.uuid)}
										>
											<i className='icon-cross'></i>
										</a>
									</td>
									<td>
										<ProductCart product={product} />
									</td>
									<td className='price'>KES {product.price}</td>
									<td>{product.vendor.name}</td>
									<td>
										{selectedItem ? (
											<a
												className='ps-btn'
												href=''
												onClick={(e) => handleRemoveFromCart(e, product.uuid)}
											>
												Remove from cart
											</a>
										) : (
											<a
												className='ps-btn'
												href=''
												onClick={(e) => handleAddToCart(e, product)}
											>
												Add to cart
											</a>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	} else {
		if (!loading) {
			wishlistItemsView = (
				<div className='alert alert-danger' role='alert'>
					Wishlist is empty!
				</div>
			);
		}
	}
	return (
		<div className='ps-section--shopping ps-whishlist'>
			<div className='container'>
				<div className='ps-section__header'>
					<h1>Wishlist</h1>
				</div>
				<div className='ps-section__content'>{wishlistItemsView}</div>
			</div>
		</div>
	);
}
