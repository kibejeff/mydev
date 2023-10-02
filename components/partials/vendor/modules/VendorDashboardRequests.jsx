import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { update } from '~/features/user/createUpdateSlice';
import { getBuyer, getBuyerProfile } from '~/features/user/userSlice';
import {
	fetchVendorCheckoutProducts,
	handleCustomerInfo,
	handleEditProduct,
	sendLoanStatus,
	setBuyerId,
} from '~/features/vendor/vendorSlice';
import { calculateDiscount } from '~/utilities/product-helper';

function VendorDashboardRequests() {
	const { vendorProducts, loading } = useSelector((state) => state.vendor);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	const [updateLoading, setupdateLoading] = useState(false);

	const pendingLoands = vendorProducts?.filter(
		(prod) => prod?.status === 'Pending',
	);

	console.log(vendorProducts);

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

	async function handleAcceptLoan(e, checkout_id) {
		e.preventDefault();
		setupdateLoading(true);
		const product = vendorProducts?.find((prod) => prod?.id === checkout_id);
		const data = { ...product, status: 'Approved' };
		const newObj = {
			...data,
			url: `checkouts/${checkout_id}/`,
		};
		const res = await dispatch(update(newObj));
		if (res?.payload?.id) {
			await dispatch(fetchVendorCheckoutProducts(user?.id));
			await dispatch(
				sendLoanStatus({
					checkout_id: data?.id,
				}),
			);
			await toast.success('Loan offer status updated!');
			await setupdateLoading(false);
		} else {
			await setupdateLoading(false);
			await toast.error(
				'An error occurred while updating the loan offer status! Please try again later.',
			);
		}
	}

	async function handleRejectLoan(e, checkout_id) {
		e.preventDefault();
		setupdateLoading(true);
		const product = vendorProducts?.find((prod) => prod?.id === checkout_id);
		const data = { ...product, status: 'Rejected' };
		const newObj = {
			...data,
			url: `checkouts/${checkout_id}/`,
		};
		const res = await dispatch(update(newObj));
		if (res?.payload?.id) {
			await toast.success('Offer rejected.');
			await dispatch(fetchVendorCheckoutProducts(user?.id));
			await dispatch(
				sendLoanStatus({
					checkout_id: data?.id,
				}),
			);
			await setupdateLoading(false);
		} else {
			await setupdateLoading(false);
			await toast.error(
				'An error occurred while updating the loan offer status! Please try again later.',
			);
		}
	}

	useEffect(() => {}, [updateLoading]);

	return (
		<>
			<div className='ps-block--vendor-dashboard'>
				<div className='ps-block__header'>
					<h3>New Loan Requests</h3>
				</div>
				<div className='ps-block__content'>
					<div className='table-responsive'>
						<table className='table ps-table ps-table--vendor'>
							<thead>
								<tr>
									<th>date</th>
									<th>Product Title</th>
									<th>Client</th>
									<th>Installments</th>
									<th>Total Price</th>
									<th>Duration</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{pendingLoands?.length ? (
									pendingLoands?.map((prod) => {
										return (
											<>
												<tr>
													<td>{moment(prod?.created_at).format('ll')}</td>
													<td>
														<a onClick={(e) => editProduct(e, prod?.product)}>
															{prod?.prouct_title}
														</a>
													</td>
													<td>
														<a onClick={(e) => viewCustomer(e, prod?.buyer_id)}>
															{prod?.buyer_names}
														</a>
													</td>
													<td>KES {prod?.monthly_installments}/month</td>
													<td>
														KES{' '}
														{prod?.new_price
															? prod?.new_price
															: calculateDiscount(
																	prod?.product?.price,
																	prod?.product?.discount,
															  )}
													</td>
													<td>{prod?.duration}</td>
													<td className='d-flex align-items-center justify-content-between'>
														{loading || updateLoading ? (
															<a className='btn-table-loading'>
																<span className='bnt-auth-text loader'></span>
															</a>
														) : (
															<>
																<a
																	onClick={(e) => handleAcceptLoan(e, prod?.id)}
																	className='btn-table-accept'
																>
																	Accept
																</a>
																<a
																	onClick={(e) => handleRejectLoan(e, prod?.id)}
																	className='btn-table-reject'
																>
																	Reject
																</a>
															</>
														)}
													</td>
												</tr>
											</>
										);
									})
								) : (
									<tr>
										<td>No loan requests available.</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

export default VendorDashboardRequests;
