import React from 'react';
import Link from 'next/link';

export default function FooterWidgets(){
    return (
			<div className='ps-footer__widgets'>
				<aside className='widget widget_footer widget_contact-us'>
					<h4 className='widget-title'>Contact us</h4>
					<div className='widget_content'>
						<h3>+254 787 418 707</h3>
						<p>
							Nairobi, Kenya <br />
							<a href='mailto:sales@powerpayafrica.com'>
								sales@powerpayafrica.com
							</a>
						</p>
						<ul className='ps-list--social'>
							<li>
								<a className='twitter' target='_blank' rel='noreferrer' href='https://twitter.com/PowerPayAfrica'>
									<i className='fa fa-twitter'></i>
								</a>
							</li>
							<li>
								<a className='google-plus' target='_blank' rel='noreferrer' href='https://wa.me/254787418707'>
									<i className='fa fa-whatsapp'></i>
								</a>
							</li>
							<li>
								<a className='facebook' target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/greeninnovationventuresenterprisesltd/'>
									<i className='fa fa-linkedin'></i>
								</a>
							</li>
						</ul>
					</div>
				</aside>
				<aside className='widget widget_footer'>
					<h4 className='widget-title'>Quick links</h4>
					<ul className='ps-list--link'>
						<li>
							<Link href='#'>
								<a>Policy</a>
							</Link>
						</li>

						<li>
							<Link href='#'>
								<a>Term & Condition</a>
							</Link>
						</li>
						<li>
							<Link href='#'>
								<a>Shipping</a>
							</Link>
						</li>
						<li>
							<Link href='#'>
								<a>Return</a>
							</Link>
						</li>
						<li>
							<Link href='#'>
								<a>FAQs</a>
							</Link>
						</li>
					</ul>
				</aside>
				<aside className='widget widget_footer'>
					<h4 className='widget-title'>Company</h4>
					<ul className='ps-list--link'>
						<li>
							<Link href='#'>
								<a>About Us</a>
							</Link>
						</li>
						<li>
							<Link href='#'>
								<a>Affiliate</a>
							</Link>
						</li>
						<li>
							<Link href='#'>
								<a>Career</a>
							</Link>
						</li>
						<li>
							<Link href='#'>
								<a>Contact</a>
							</Link>
						</li>
					</ul>
				</aside>
				<aside className='widget widget_footer'>
					<h4 className='widget-title'>Bussiness</h4>
					<ul className='ps-list--link'>
						<li>
							<Link href='#'>
								<a>Our Press</a>
							</Link>
						</li>
						<li>
							<Link href='/account/checkout'>
								<a>Checkout</a>
							</Link>
						</li>
						<li>
							<Link href='/account/user-information'>
								<a>My account</a>
							</Link>
						</li>
						<li>
							<Link href='/shop'>
								<a>Shop</a>
							</Link>
						</li>
					</ul>
				</aside>
			</div>
		);
}

