import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuyer } from '~/features/user/userSlice';
import { handleCustomerInfo, handleEditProduct, setBuyerId } from '~/features/vendor/vendorSlice';
import { calculateDiscount } from '~/utilities/product-helper';

function VendorActiveLoans() {
	const { vendorProducts } = useSelector((state) => state.vendor);
	const dispatch = useDispatch()
	const router = useRouter()

	const activeLoands = vendorProducts?.filter(
		(prod) => prod?.status == 'Approved' && prod?.is_payed == false,
	);

	async function editProduct(e, prod) {
		e.preventDefault();
		// await dispatch(handleEditProduct(prod));
		// await router.push('/vendor/products/edit');
	}

	async function viewCustomer(e, data) {
		e.preventDefault();
		await dispatch(setBuyerId(data))
		await router.push('/vendor/customer-info/');
	}

	return (
		<>
			<div className='ps-block--vendor-dashboard'>
				<div className='ps-block__header'>
					<h3>Pending Deposit Payments</h3>
				</div>
				<div className='ps-block__content'>
					<div className='table-responsive'>
						<table className='table ps-table ps-table--vendor'>
							<thead>
								<tr>
									<th>Date</th>
									<th>Initial Deposit</th>
									<th>Total Amount</th>
									<th>Product Title</th>
									<th>Payment Status</th>
									<th>Client</th>
								</tr>
							</thead>
							<tbody>
								{activeLoands?.length ? (
									activeLoands?.map((prod) => {
										return (
											<>
												<tr>
													<td>{moment(prod?.created_at).format('ll')}</td>
													<td>KES {prod?.deposit}</td>
													<td>
														KES{' '}
														{prod?.new_price
															? prod?.new_price
															: calculateDiscount(
																	prod?.product?.price,
																	prod?.product?.discount,
															  )}
													</td>
													<td>
														<a onClick={(e) => editProduct(e, prod?.product)}>
															{prod?.prouct_title}
														</a>
													</td>
													<td>{prod?.is_payed ? 'Paid' : 'Not paid'}</td>
													<td>
														<a onClick={(e) => viewCustomer(e, prod?.buyer_id)}>
															{prod?.buyer_names}
														</a>
													</td>
												</tr>
											</>
										);
									})
								) : (
									<tr>
										<td>No active loans available.</td>
									</tr>
								)}
								{/* <tr>
									<td colSpan='3'>
										<strong>Total</strong>
									</td>
									<td>
										<strong>124 Sale</strong>
									</td>
									<td colSpan='2'>
										<strong>$12.104.725</strong>
									</td>
								</tr> */}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

export default VendorActiveLoans;
