import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { useRouter } from 'next/router';

const ModulePaymentMethods = ({getPayMethod}) => {
	const Router = useRouter();
	const [method, setMethod] = useState(1);

	function handleChangeMethod(e) {
		setMethod(e.target.value); //e.target.value
		let payVal;
		if (e.target.value) {
			payVal = e.target.value
		}else{
			payVal = method
		}
		getPayMethod(payVal)
		
	}

	function handleSubmit(e) {
		e.preventDefault();
		alert('Processing payment please wait');
		// Router.push('/account/payment-success');
	}

	let paymentView;

	if (method === 1) {
		paymentView = (
			<>
				<div className='ps-block__tab'>
					<img
						width='200'
						height='150'
						src='/static/img/icons/mpesa.png'
						alt='m-pesa'
					/>
					<h4 className='text-success'>M-pesa Selected</h4>
					{/* <div className='form-group'>
						<label>Card Number</label>
						<input type='number' className='form-control' />
					</div>
					<div className='form-group'>
						<label>Card Holder Name</label>
						<input type='text' className='form-control' />
					</div>
					<div className='row'>
						<div className='col-sm-4 col-4'>
							<div className='form-group'>
								<label>Expiration Date (MM/YY)</label>
								<input
									type='text'
									className='form-control'
									placeholder='01/12'
								/>
							</div>
						</div>
						<div className=' col-sm-4 col-4'>
							<div className='form-group'>
								<label>CVV</label>
								<input type='text' className='form-control' />
							</div>
						</div>
					</div>
					<div className='form-group'>
						<button
							className='ps-btn ps-btn--fullwidth'
							onClick={(e) => handleSubmit(e)}
						>
							Submit
						</button>
					</div> */}
				</div>
			</>
		);
	} else if (method === 2) {
		paymentView = (
			<>
				<div className='ps-block__tab'>
					<h4 className='text-danger'>Not available at the moment!</h4>
					{/* <a className='ps-btn' href='https://www.paypal.com/' target='_blank'>
						Process with Paypal
					</a> */}
				</div>
			</>
		);
	} else if (method === 3) {
		paymentView = (
			<>
				<div className='ps-block__tab'>
					<h4 className='text-danger'>Not available at the moment!</h4>
					{/* <a>
						<img width="200" height="150" src="/static/img/icons/mpesa.png" alt="m-pesa" />
					</a> */}
					{/* <div className='d-flex align-items-center'>

                        <a href="payment">
                            <img width="120" height="120" src="/static/img/icons/m-pesa.png" alt="mobile money" />
                        </a>

                        <a className='mx-5' href="payment">
                            <img width="100" height="100" src="/static/img/icons/airtel.png" alt="mobile money" />
                        </a>

                        <a href="payment">
                            <img width="100" height="100" src="/static/img/icons/t-kash.png" alt="mobile money" />
                        </a>

                    </div>
					<a className='ps-btn mt-5' href='https://www.paypal.com/' target='_blank'>
						Process with mobile money
					</a> */}
				</div>
			</>
		);
	} else if (method === 4) {
		paymentView = (
			<>
				<div className='ps-block__tab'>
					<h4 className='text-danger'>Not available at the moment!</h4>
				</div>
			</>
		);
	}

	useEffect(() => {
	
	}, [method])

	return (
		<>
			<h4>Payment Method</h4>
			<div className='ps-block--payment-method'>
				<div className='ps-block__header'>
					<Radio.Group onChange={(e) => handleChangeMethod(e)} value={method}>
						<Radio value={1}>Safaricom M-pesa</Radio>
						<Radio value={2}>Airtel Money</Radio>
						<Radio value={3}>Telecom Cash</Radio>
						<Radio value={4}>Visa Card</Radio>
					</Radio.Group>
				</div>
				<div className='ps-block__content'>{paymentView}</div>
			</div>
		</>
	);
};

export default ModulePaymentMethods;
