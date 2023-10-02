import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteObj, update } from '~/features/user/createUpdateSlice';
import {
	fetchVendorCheckoutProducts,
	sendLoanStatus,
} from '~/features/vendor/vendorSlice';
import { calculateDiscount } from '~/utilities/product-helper';

function VendorRejectedLoans() {
	const { vendorProducts } = useSelector((state) => state.vendor);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const rejectedLoands = vendorProducts?.filter(
		(prod) => prod?.status == 'Rejected',
	);

	async function handleDeleteLoan(e, checkout_id) {
		e.preventDefault();
		const product = vendorProducts?.find((prod) => prod?.id === checkout_id);
		const data = { ...product, status: 'Approved' };
		const newObj = {
			url: `checkouts/${checkout_id}/`,
		};

		const res = await dispatch(deleteObj(newObj));
		await toast.success('Loan offer deleted successful!');
		await dispatch(fetchVendorCheckoutProducts(user?.id));
	}

	async function handleAcceptLoan(e, checkout_id) {
		e.preventDefault();
		const product = vendorProducts?.find((prod) => prod?.id === checkout_id);
		const data = { ...product, status: 'Approved' };
		const newObj = {
			...data,
			url: `checkouts/${checkout_id}/`,
		};
		const res = await dispatch(update(newObj));
		if (res?.payload?.id) {
			await toast.success('Loan offer status updated!');
			await dispatch(fetchVendorCheckoutProducts(user?.id));
			await dispatch(
				sendLoanStatus({
					checkout_id: data?.id,
				}),
			);
		} else {
			await toast.error(
				'An error occurred while updating the loan offer status! Please try again later.',
			);
		}
	}

	return (
		<>
			<div className='ps-block--vendor-dashboard'>
				<div className='ps-block__header'>
					<h3>Rejected Loans</h3>
				</div>
				<div className='ps-block__content'>
					<div className='table-responsive'>
						<table className='table ps-table ps-table--vendor'>
							<thead>
								<tr>
									<th>Date</th>
									<th>Product Title</th>
									<th>Installments</th>
									<th>Amount</th>
									<th>Duration</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{rejectedLoands?.length ? (
									rejectedLoands?.map((prod) => {
										return (
											<>
												<tr>
													<td>{moment(prod?.created_at).format('ll')}</td>
													<td>
														<a>{prod?.prouct_title}</a>
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
													<td className='d-flex align-items-center'>
														<a
															onClick={(e) => handleAcceptLoan(e, prod?.id)}
															className='btn-table-accept'
														>
															Reconsider
														</a>
														<a
															onClick={(e) => handleDeleteLoan(e, prod?.id)}
															className='btn-table-reject ml-5'
														>
															Delete
														</a>
													</td>
												</tr>
											</>
										);
									})
								) : (
									<tr>
										<td>Nothing to show here.</td>
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

export default VendorRejectedLoans;
