import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/features/user/userSlice';
import { useRouter } from 'next/router';
import { Avatar } from 'antd';

export default function VendorQuickLinks() {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	const accountLinks = [
		{
			text: 'Dashboard',
			url: '/vendor/dashboard',
		},
		{
			text: 'Home',
			url: '/',
		},
		{
			text: 'Shop',
			url: '/shop',
		},
		{
			text: 'User Management',
			url: '/vendor/agents',
		},
		{
			text: 'Inventories',
			url: '/vendor/inventory',
		},
		{
			text: 'Loan Management',
			url: '/vendor/loans-management',
		},
		// {
		// 	text: 'Recent Viewed Product',
		// 	url: '/account/recent-viewed-product',
		// },
		// {
		// 	text: 'My Account',
		// 	url: '/vendor/profile',
		// },
	];

	const linksView = accountLinks.map((item) => (
		<li style={{
			paddingBottom: '5px'
		}} key={item.text}>
			<Link href={item.url}>
				<a
					style={{
						fontSize: '14px',
                        textAlign: 'left !important',
                        padding: '0px !important',
                        margin: '0px !important'
					}}
				>
					{item.text}
				</a>
			</Link>
		</li>
	));

	if (user?.id) {
		return (
			<div className='ps-block--user-account'>
				<div className='ps-section__avatar'>
					<Avatar
						shape='square'
						size={44}
						// icon={<i className='fa fa-user'></i>}
						src='https://res.cloudinary.com/abzedmohammed/image/upload/v1670316789/defaults/default_black_mv0upm.png'
					/>
					<div className='d-flex flex-column align-items-start p-3 ps-vendor__hidden'>
						<span>
							<b>
								{user?.first_name} {user?.last_name}
							</b>
						</span>
						<span>
							<small>
								<b>Vendor Account</b>
							</small>
						</span>
					</div>
				</div>
				<div className='ps-block__content'>
					<ul
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'start',
							alignItems: 'left',
                            textAlign: 'left',
                            padding: '5px',
						}}
						className='ps-list--arrow'
					>
						{linksView}
						<li className='ps-block__footer'>
							<a onClick={() => dispatch(logout())}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		);
	} else {
		return router.push('/account/login');
	}
}
