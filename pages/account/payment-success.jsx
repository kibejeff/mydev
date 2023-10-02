import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import Link from 'next/link';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const PaymentSuccessPage = () => {
	const {orderNumber} = useSelector(state => state.products)
    const Router = useRouter();

	const breadCrumb = [
		{
			text: 'Home',
			url: '/',
		},
		{
			text: 'Shopping Cart',
			url: '/account/shopping-cart',
		},
		{
			text: 'Payment Success',
		},
	];


	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Payment'>
				<div className='ps-page--simple'>
					<BreadCrumb breacrumb={breadCrumb} />
					<div className='ps-checkout ps-section--shopping'>
						<div className='container'>
							<div className='ps-section__header'>
								{/* <svg width='100' height='100' fill='#4BB543' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path d='M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z' />
								</svg> */}
								<h1 className='text-left mt-5'>Order Success</h1>
							</div>
							<div className='ps-section__content'>
								<div className='row'>
									<div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
										<div className='ps-block--payment-success'>
											<div className='ps-block__content'>
												<h3>Thank you! Your order is processing.</h3>
												<p>
													Your order number is{' '}
													<strong>
														{orderNumber
															? orderNumber
															: 'being generated and will be available shortly.'}
													</strong>
												</p>
												<p>
													Once processing is done, an email will be sent
													containing status updates of your product. If you have
													any questions about your order, email us at{' '}
													<a
														href='sales@powerpayafrica.com'
														className='ps-highlight'
													>
														<strong>sales@powerpayafrica.com</strong>
													</a>
												</p>
											</div>
											<div className='ps-block__bottom'>
												<Link href='/'>
													<a className='ps-btn'>
														<i className='icon-arrow-left mr-2'></i>
														Back to shop
													</a>
												</Link>
											</div>
										</div>
									</div>
									{/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                                        <div className="ps-form__orders">
                                            <ModulePaymentOrderSummary />
                                        </div>
                                    </div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Newletters layout='container' />
			</PageContainer>
		</>
	);
};

export default PaymentSuccessPage;
