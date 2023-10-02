import {
	AppstoreOutlined,
	DoubleLeftOutlined,
	DoubleRightOutlined,
	HomeOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleToggleSidebar } from '~/features/addon/addonSlice';

function VendorSideNav() {
	const { sideBarOpen } = useSelector((state) => state.addon);
	const dispatch = useDispatch();

	function toggleSideBar() {
		dispatch(handleToggleSidebar());
	}

	// useEffect(() => {
	// 	let arrow = document.querySelectorAll('.arrow');
	// 	for (var i = 0; i < arrow.length; i++) {
	// 		arrow[i].addEventListener('click', (e) => {
	// 			let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
	// 			arrowParent.classList.toggle('showMenu');
	// 		});
	// 	}

	// 	let sidebar = document.querySelector('.sidebar');
	// 	let sidebarBtn = document.querySelector('.bx-menu');
	// 	sidebarBtn.addEventListener('click', () => {
	// 		sidebar.classList.toggle('close');
	// 	});
	// }, []);

	return (
		<>
			<div className={sideBarOpen ? 'sidebar p-5' : 'sidebar close p-5'}>
				<div className='logo-details'>
					{sideBarOpen ? (
						<>
							<Link href='/'>
								<a className='ps-logo'>
									<img
										height='45'
										width='200'
										src='/static/img/logos/logo.png'
										alt='Powerpay Africa'
									/>
								</a>
							</Link>
							<DoubleLeftOutlined
								onClick={toggleSideBar}
								className='ps-sidebar__toggle'
							/>
						</>
					) : (
						<>
							<DoubleRightOutlined
								onClick={toggleSideBar}
								className='ps-sidebar__icons'
							/>
						</>
					)}
				</div>
				<ul className='nav-links'>
					<li>
						{sideBarOpen ? (
							<>
								<a className='link_name' href='#'>
									Home
								</a>
							</>
						) : (
							<>
								<a href='#'>
									<HomeOutlined className='ps-sidebar__icons' />
								</a>
							</>
						)}
					</li>
					<li>
						<div className='icon-link'>
							<a href='#'>
								<i className='bx bx-bulb'></i>
								<span className='link_name'>Solutions</span>
							</a>
							<i className='bx bxs-chevron-down arrow'></i>
						</div>
						<ul className='sub-menu'>
							<li>
								<a className='link_name' href='#'>
									Solutions
								</a>
							</li>
							<li>
								<a href='#'>Payments API</a>
							</li>
							<li>
								<a href='#'>Accounts APi</a>
							</li>
							<li>
								<a href='#'>Finance API</a>
							</li>
						</ul>
					</li>
					<li>
						<div className='icon-link'>
							<a href='#'>
								<i className='bx bx-news'></i>
								<span className='link_name'>Posts</span>
							</a>
							<i className='bx bxs-chevron-down arrow'></i>
						</div>
						<ul className='sub-menu'>
							<li>
								<a className='link_name' href='#'>
									Posts
								</a>
							</li>
							<li>
								<a href='#'>Recent</a>
							</li>
							<li>
								<a href='#'>Trending</a>
							</li>
							<li>
								<a href='#'>Most Visited</a>
							</li>
						</ul>
					</li>
					<li>
						<div className='icon-link'>
							<a href='#'>
								<i className='bx bx-file-find'></i>
								<span className='link_name'>Insights</span>
							</a>
							<i className='bx bxs-chevron-down arrow'></i>
						</div>
						<ul className='sub-menu'>
							<li>
								<a className='link_name' href='#'>
									Insights
								</a>
							</li>
							<li>
								<a href='#'>Money Movement</a>
							</li>
							<li>
								<a href='#'>Enterprise Spotlight</a>
							</li>
							<li>
								<a href='#'>Financial Burnout</a>
							</li>
						</ul>
					</li>
					<li>
						<a href='#'>
							<i className='bx bxs-credit-card'></i>
							<span className='link_name'>Pricing</span>
						</a>
						<ul className='sub-menu blank'>
							<li>
								<a className='link_name' href='#'>
									Pricing
								</a>
							</li>
						</ul>
					</li>
					<li>
						<a href='#'>
							<i className='bx bx-bar-chart'></i>
							<span className='link_name'>Chart</span>
						</a>
						<ul className='sub-menu blank'>
							<li>
								<a className='link_name' href='#'>
									Chart
								</a>
							</li>
						</ul>
					</li>
					<li>
						<a href='#'>
							<i className='bx bx-compass'></i>
							<span className='link_name'>Explore</span>
						</a>
						<ul className='sub-menu blank'>
							<li>
								<a className='link_name' href='#'>
									Explore
								</a>
							</li>
						</ul>
					</li>
					<li>
						<a href='#'>
							<i className='bx bx-cog'></i>
							<span className='link_name'>Setting</span>
						</a>
						<ul className='sub-menu blank'>
							<li>
								<a className='link_name' href='#'>
									Setting
								</a>
							</li>
						</ul>
					</li>
					{/* <li>
						<div className='profile-details'>
							<div className='profile-content'>
								<img
									src='https://res.cloudinary.com/abzedmohammed/image/upload/v1670316789/defaults/default_black_mv0upm.png'
									alt='profileImg'
								/>
							</div>
							<div className='name-job'>
								<div className='profile_name'>John Doe</div>
								<div className='job'>Crypto Expert</div>
							</div>
							<i className='bx bx-log-out'></i>
						</div>
					</li> */}
				</ul>
			</div>
			{/* <section className='home-section'>
				<div className='home-content'>
					<button className='bx bx-menu'>Click Me!</button>
					<span className='text'>Crypto App</span>
				</div>
			</section> */}
		</>
	);
}

export default VendorSideNav;
