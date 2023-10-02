import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '~/features/products/productSlice';

function ModuleDetailShoppingActions({ product, extended = false }) {
	const [quantity, setQuantity] = useState(1);
	const Router = useRouter();

	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.products.cart);

	let selectedItem;

	if (cartItems?.length) {
		selectedItem = cartItems.find((item) => item.uuid === product.uuid);
	}

	function handleAddItemToCart() {
		dispatch(addToCart(product));
	}

	function handleRemoveFromCart(id) {
		dispatch(removeFromCart(id));
	}

	function handleBuynow(e) {
		e.preventDefault();
		setTimeout(function () {
			Router.push('/account/checkout');
		}, 1000);
	}

	const handleAddItemToCompare = (e) => {
		e.preventDefault();
		e.preventDefault();
		// addItem({ id: product.id }, ecomerce.compareItems, 'compare');
		// const modal = Modal.success({
		//     centered: true,
		//     title: 'Success!',
		//     content: `This product has been added to compare listing!`,
		// });
		modal.update;
	};

	const handleAddItemToWishlist = (e) => {
		e.preventDefault();
		// addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
		// const modal = Modal.success({
		//     centered: true,
		//     title: 'Success!',
		//     content: `This item has been added to your wishlist`,
		// });
		modal.update;
	};

	function handleIncreaseItemQty(e) {
		e.preventDefault();
		setQuantity(quantity + 1);
	}

	function handleDecreaseItemQty(e) {
		e.preventDefault();
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	}
	if (!extended) {
		return (
			<div className='ps-product__shopping'>
				<figure>
					<figcaption>Quantity</figcaption>
					<div className='form-group--number'>
						<button
							disabled
							title='You currently cannot add more than one item!'
							className='up'
							onClick={(e) => handleIncreaseItemQty(e)}
						>
							<i className='fa fa-plus'></i>
						</button>
						<button
							disabled
							title='Can only buy one item'
							className='down'
							onClick={(e) => handleDecreaseItemQty(e)}
						>
							<i className='fa fa-minus'></i>
						</button>
						<input
							className='form-control'
							type='text'
							placeholder={quantity}
							disabled
						/>
					</div>
				</figure>
				{!selectedItem ? (
					<a disabled={product?.coming_soon}
						className='btn ps-btn'
						onClick={() => dispatch(addToCart(product))}
					>
						Add to cart
					</a>
				) : (
					<a disabled={product?.coming_soon} className='btn ps-btn' onClick={(e) => handleBuynow(e)}>
						Proceed to checkout
					</a>
				)}

				<a
					className='ps-btn ps-btn--black'
					onClick={(e) => handleAddItemToWishlist(e)}
				>
					Add to wishlist
				</a>
			</div>
		);
	} else {
		return (
			<div className='ps-product__shopping extend'>
				<div className='ps-product__btn-group'>
					<figure>
						<figcaption>Quantity</figcaption>
						<div className='form-group--number'>
							<button
								disabled
								title='You currently cannot add more than one item!'
								className='up'
								onClick={(e) => handleIncreaseItemQty(e)}
							>
								<i className='fa fa-plus'></i>
							</button>
							<button
								disabled
								className='down'
								title='Can only buy one item'
								onClick={(e) => handleDecreaseItemQty(e)}
							>
								<i className='fa fa-minus'></i>
							</button>
							<input
								className='form-control'
								type='text'
								placeholder={quantity}
								disabled
							/>
						</div>
					</figure>
					{!selectedItem ? (
						<a disabled={product?.coming_soon}
							className='btn ps-btn'
							onClick={() => dispatch(addToCart(product))}
						>
							Add to cart
						</a>
					) : (
						<a
							className='ps-btn'
							onClick={() => handleRemoveFromCart(product.uuid)}
						>
							Remove from cart
						</a>
					)}
					{/* <div className='ps-product__actions'>
						<a href='#' onClick={(e) => handleAddItemToWishlist(e)}>
							<i className='icon-heart'></i>
						</a>
						<a href='#' onClick={(e) => handleAddItemToCompare(e)}>
							<i className='icon-chart-bars'></i>
						</a>
					</div> */}
				</div>
				{selectedItem ? (
					<a disabled={product?.coming_soon} className='btn ps-btn' onClick={(e) => handleBuynow(e)}>
						Proceed to checkout
					</a>
				) : null}
			</div>
		);
	}
}

export default ModuleDetailShoppingActions;
