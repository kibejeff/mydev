import React, { useEffect } from 'react';
import Link from 'next/link';
import { Rate } from 'antd';
import useProduct from '~/hooks/useProduct';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToCompare,
	removeFromCompare,
	addToCart,
    removeFromCart,
} from '~/features/products/productSlice';
import { ToastContainer } from 'react-toastify';

const Compare = ({ ecomerce }) => {
	// const { products, getProducts } = useEcomerce();
	// const { addItem, removeItem } = useEcomerce();
	const { compareList, cart } = useSelector((state) => state.products);
	const { thumbnailImage, price } = useProduct();
	const dispatch = useDispatch();

	function handleAddItemToCart(product) {
		dispatch(addToCart(product));
	}

	function handleRemoveCompareItem(id) {
		dispatch(removeFromCompare(id));
	}

    function handleRemoveFromCart(id){
        dispatch(removeFromCart(id))
    }

	let selectedItem;

	useEffect(() => {}, []);

	return (
		<div className='ps-compare ps-section--shopping'>
			<div className='container'>
				<div className='ps-section__header'>
					<h1>Compare Product</h1>
				</div>
				<div className='ps-section__content'>
					{!compareList?.length ? (
						<div className='alert alert-danger' role='alert'>
							Compare list is empty!
						</div>
					) : (
						<div className='table-responsive'>
							<table className='table ps-table--compare'>
								<tbody>
									<tr>
										<td className='heading' rowSpan='2'>
											Product
										</td>
										{compareList && compareList.length > 0 ? (
											compareList.map((product) => (
												<td key={product.uuid}>
													<a
														href='#'
														onClick={(e) => handleRemoveCompareItem(product.uuid)}
													>
														Remove
													</a>
												</td>
											))
										) : (
											<td></td>
										)}
									</tr>
									<tr>
										{compareList && compareList.length > 0 ? (
											compareList.map((product) => (
												<td key={product.uuid}>
													<div className='ps-product--compare'>
														<div className='ps-product__thumbnail'>
															<Link
																href='/product/[pid]'
																as={`/product/${product.uuid}`}
															>
																<a>{thumbnailImage(product.image)}</a>
															</Link>
														</div>
														<div className='ps-product__content'>
															<Link
																href='/product/[pid]'
																as={`/product/${product.uuid}`}
															>
																<a className='ps-product__title'>
																	{product.title}
																</a>
															</Link>
														</div>
													</div>
												</td>
											))
										) : (
											<td></td>
										)}
									</tr>
									<tr>
										<td className='heading'>Rating</td>
										{compareList && compareList.length > 0 ? (
											compareList.map((product) => (
												<td key={product.uuid}>
													<Rate disabled defaultValue={4} />
												</td>
											))
										) : (
											<td></td>
										)}
									</tr>
									<tr>
										<td className='heading'>Price</td>
										{compareList && compareList.length > 0 ? (
											compareList.map((product) => {
												if (product.sale === true) {
													return (
														<td key={product.uuid}>
															<h4 className='price sale'>
															KES {product.price}
																<del>
																	KES{price(product.price, product.discount)}
																</del>
															</h4>
														</td>
													);
												} else
													return (
														<td key={product.uuid}>
															<h4 className='price'>KES {product.price}</h4>
														</td>
													);
											})
										) : (
											<td></td>
										)}
									</tr>
									<tr>
										<td className='heading'>Sold By</td>
										{compareList && compareList.length > 0 ? (
											compareList.map((product) => (
												<td key={product.uuid}>
													<Link href='/vendor/store-list'>
														<a>{product.vendor.name}</a>
													</Link>
												</td>
											))
										) : (
											<td></td>
										)}
									</tr>
									<tr>
										<td className='heading'></td>
										{compareList && compareList.length > 0 ? (
											compareList.map((product) => {
												if (cart?.length) {
													selectedItem = cart.find(
														(item) => item.id === product.uuid,
													);
												}

												return (
													<td key={product.uuid}>
														{
                                                            selectedItem ?
                                                            <button
															title='Add to cart'
															style={{
																overflow: 'hidden',
																whiteSpace: 'nowrap',
																textOverflow: 'ellipsis',
															}}
															className='ps-btn'
															onClick={() => handleRemoveFromCart(product.uuid)}
														>
															Remove from cart
														</button>
                                                        :
                                                        <button
															title='Add to cart'
															style={{
																overflow: 'hidden',
																whiteSpace: 'nowrap',
																textOverflow: 'ellipsis',
															}}
															className='ps-btn'
															onClick={() => handleAddItemToCart(product)}
														>
															Add To Cart
														</button>
                                                        }
													</td>
												);
											})
										) : (
											<td></td>
										)}
									</tr>
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Compare;
