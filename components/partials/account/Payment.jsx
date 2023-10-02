import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import ModulePaymentMethods from '~/components/ecomerce/modules/ModulePaymentMethods';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ModuleDepositpayment from './modules/ModuleDepositPayment';
import { useForm } from 'react-hook-form';
import { create, update } from '~/features/user/createUpdateSlice';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import {
	getOrderNumber,
	initiateMpesa,
	resetMpesaSuccess,
} from '~/features/products/productSlice';
import { confirmPayment } from '~/features/addon/addonSlice';

const Payment = () => {
	const Router = useRouter();
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => handlePaymentSubmit(data);
	const { isLoggedIn, user } = useSelector((state) => state.user);
	const { orderNumber } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	const [payMethod, setpayMethod] = useState('');
	const [fomrData, setfomrData] = useState({});
	const [loading, setloading] = useState(false);
	const [modal2Open, setModal2Open] = useState(false);
	const [hasConfirmed, sethasConfirmed] = useState(false);
	const [timer, settimer] = useState(false);
	const [payData, setpayData] = useState({});
	const [retry, setretry] = useState(false)

	function getPayMethod(val) {
		if (val == 1) {
			setpayMethod('M-Pesa');
		} else {
			setpayMethod('M-Pesa');
		}
	}

	function getFormData(data) {
		setfomrData(data);
	}

	async function handlePaymentSubmit(data) {
		const { amount, checkout_id } = fomrData;
		data.amount = amount;
		data.checkout_id = checkout_id;
		// data.buyer_id = user?.id;
		data.order = null;
		setpayData(data);
		setloading(true);

		const idObj = {
			url: 'transaction-codes/',
		};

		const code = await dispatch(create(idObj));

		if (code?.payload?.code) {
			data.order = code?.payload?.code;
			const newObj = {
				...data,
			};
			await setpayData(newObj);

			const payObj = {
				phone_number: user?.buyer?.phone?.slice(1),
				amount: amount,
				account_reference: code?.payload?.code,
			};
			await dispatch(initiateMpesa(payObj));
			setModal2Open(true);
		}
	}

	async function handleCheckMpesa() {
		setretry(false)
		const { amount } = fomrData;
		await setTimeout( async () => {
			const checkRes = await dispatch(confirmPayment(payData?.order));
			if (checkRes?.payload?.results?.length) {
				const { checkout_id, full_price } = fomrData;
				const newObj = {
					...payData,
					url: `transactions/${checkRes?.payload?.results[0].id}/`,
				};

				const obj = {
					is_payed: true,
				}

				const checkoutObj = {
					...obj,
					url: `checkouts/${checkout_id}/`,
				};

				const loanData = {
					remaining_balance: (Number(full_price) - Number(checkRes?.payload?.results[0].amount)),
					checkout_id: checkRes?.payload?.results[0].id,
				}

				const loanObj = {
					...loanData,
					url: `payment-trackings/`,
				}

				await dispatch(getOrderNumber(payData?.order));
				await dispatch(update(checkoutObj));
				await dispatch(create(loanObj))
				const res = await dispatch(update(newObj));
				if (res?.payload?.id) {
					await Router.push('/account/payment-success');
					await setModal2Open(false);
					await toast.success('Done!');
					await settimer(false);
				} else {
					await setloading(false);
					await setretry(true)
					await toast.error('Could not update your receipt');
					await setModal2Open(false);
					await settimer(false);
				}
			}else{
				await setloading(false);
				await settimer(false);
				await setretry(true)
				await toast.error('Could not verify your payment');
			}
		}, 10000);
	}

	async function handleMpesaOk() {
		await settimer(true);
		await handleCheckMpesa();
	}

	function handleMpesaCancel() {
		settimer(false);
		setloading(false);
		sethasConfirmed(false);
		setModal2Open(false);
		toast.info('You have cancelled this order!');
		dispatch(resetMpesaSuccess());
	}

	if (!isLoggedIn) {
		typeof window !== 'undefined' && Router.push('/account/checkout');
	}

	useEffect(() => {}, [hasConfirmed]);

	return (
		<>
			<Modal
				title='Mpesa Pay Confirmation'
				centered
				visible={modal2Open}
				onOk={handleMpesaOk}
				okText={retry ? "Retry" : "OK" }
				onCancel={handleMpesaCancel}
				okButtonProps={{
					disabled: timer,
					className: 'btn btn-pay',
				}}
				cancelButtonProps={{
					className: 'btn btn-pay-inverse',
				}}
			>
				{timer ? (
					<>
						<span className='loader'></span>
						<p>Verifying payment. Please wait...</p>
					</>
				) : (
					<>
						<p>Check your mobile phone for M-Pesa STK prompt.</p>

						<ol>
							<li>
								The prompt has an initial deposit of (KES {fomrData?.deposit}){' '}
								<br /> and your ORDER ID is <b>{payData?.order}</b>
							</li>
							<li>Enter your M-Pesa pin</li>
							<li>Finalize the transaction</li>
							<li>Once done, click okay here to proceed</li>
						</ol>
					</>
				)}
				{/* <ol>
					<li>Go to the M-pesa Menu.</li>
					<li>Select Pay Bill.</li>
					<li>Enter Business No. 319403</li>
					<li>
						Enter Account No. 07XXXXXXX (Where XXXXXX is your phone number)
					</li>
					<li>Enter the Amount.</li>
					<li>Enter your pin to finish transaction</li>
					<li>Once done, click okay here to proceed.</li>
				</ol> */}
				{/* <p>
					Transaction will cancel automatically in{' '}
					<b>0:{timer > 10 ? timer : '0' + timer}</b> seconds
				</p> */}
			</Modal>
			{/* <Button type='primary' onClick={() => setModal2Open(true)}>
				Vertically centered modal dialog
			</Button> */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='ps-checkout ps-section--shopping'>
					<div className='container'>
						<div className='ps-section__header'>
							<h1>
								Payment <small>(Initial Deposit)</small>
							</h1>
						</div>
						<div className='ps-section__content'>
							<div className='row'>
								<div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
									<div className='ps-block--shipping'>										
										<ModulePaymentMethods getPayMethod={getPayMethod} />
										<div className='ps-block__footer'>
											<Link href='/account/checkout'>
												<a>
													<i className='icon-arrow-left mr-2'></i>
													Return to Checkout
												</a>
											</Link>

											<div className='ps-block__footer'>
												<button
													disabled={loading}
													type='submit'
													className='ps-btn'
												>
													{loading ? (
														<span className='bnt-auth-text loader'></span>
													) : (
														<span className='bnt-auth-text'>
															Continue To Pay
														</span>
													)}
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 '>
									<div className='ps-form__orders'>
										<ModuleDepositpayment getFormData={getFormData} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default Payment;
