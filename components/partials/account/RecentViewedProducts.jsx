import React from 'react';
import Link from 'next/link';
import AccountLinks from './modules/Accountlinks';

export default function RecentViewedProducts() {
	return (
		<section className='ps-my-account ps-page--account'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-4'>
						<div className='ps-section__left'>
							<aside className='ps-widget--account-dashboard'>
								<div className='ps-widget__content'>
									<ul className='ps-list--user-links'>
										{<AccountLinks active={true} />}
									</ul>
								</div>
							</aside>
						</div>
					</div>
					<div className='col-lg-8'>
						<section className='ps-section--account-setting'>
							<div className='ps-section__header'>
								<h3>Recently Viewed Products</h3>
							</div>
							<div className='ps-section__content'>
								<p>No product here.</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</section>
	);
}
