import React, {  } from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Checkout = () => {

	return (
		<div className='ps-checkout ps-section--shopping mb-5'>
			<div className='container'>
				<div className='ps-section__header'>
					<h1>Checkout Information</h1>
				</div>
				<div className='ps-section__content'>
					<div className='ps-form--checkout'>
						<div className='ps-form__content'>
							<div className='row'>
								<div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
									<FormCheckoutInformation />
								</div>
								<div className='col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order'>
									<div className='ps-form__orders'>
										<h3>Your order(s)</h3>
										<ModulePaymentOrderSummary />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
