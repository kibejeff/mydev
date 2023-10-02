import React from 'react';
import Link from 'next/link';

const HomeDefaultTopCategories = () => (
	<div className='ps-top-categories'>
		<div className='ps-container'>
			<h3>Other Products That Might Interest You</h3>
			<div className='row'>
				<div className='col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 '>
					<div className='ps-block--category'>
						<Link href='/shop'>
							<a className='ps-block__overlay'></a>
						</Link>
						<img
							width='200'
							height='150'
							src='https://www.iottechtrends.com/assets/uploads/2019/09/what-is-a-smart-tv-hero.jpg'
							alt='powerpay-africa'
						/>
						<p>TV's</p>
					</div>
				</div>

				<div className='col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 '>
					<div className='ps-block--category'>
						<Link href='/shop'>
							<a className='ps-block__overlay'></a>
						</Link>
						<img
							width='200'
							height='150'
							src='https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/29/058596/1.jpg?3249'
							alt='powerpay-africa'
						/>
						<p>Electric Heaters</p>
					</div>
				</div>

				<div className='col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 '>
					<div className='ps-block--category'>
						<Link href='/shop'>
							<a className='ps-block__overlay'></a>
						</Link>
						<img
							width='200'
							height='150'
							src='https://lh5.googleusercontent.com/ttNl5YUjtjSCSbauI-ywmCVtHaZD5RB8m4ahVFNbKV2d-fswy0Spbsm33yF1eh983F1fXUZi0VTAw0MyLyDL0cYeLRxQBwtSiEgfQ8p1Owi1poVMXMgXgZZ9Ef2eSz07aH3jZMxq'
							alt='powerpay-africa'
						/>
						<p>Microwaves</p>
					</div>
				</div>

				<div className='col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 '>
					<div className='ps-block--category'>
						<Link href='/shop'>
							<a className='ps-block__overlay'></a>
						</Link>
						<img
							width='200'
							height='150'
							src='https://images.immediate.co.uk/production/volatile/sites/3/2021/08/Best-budget-laptop-86d85a5.png'
							alt='powerpay-africa'
						/>
						<p>Laptops</p>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default HomeDefaultTopCategories;
