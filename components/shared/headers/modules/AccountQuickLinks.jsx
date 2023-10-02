import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/features/user/userSlice';

export default function AccountQuickLinks() {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const accountLinks = [
		{
			text: 'Account Information',
			url: '/account/user-information',
		},
		{
			text: 'Applications',
			url: '/account/applications',
		},
		{
			text: 'Invoices',
			url: '/account/invoices',
		},
		{
			text: 'Recent Viewed Product',
			url: '/account/recent-viewed-product',
		},
		{
			text: 'Wishlist',
			url: '/account/wishlist',
		},
	];

	const linksView = accountLinks.map((item) => (
		<li key={item.text}>
			<Link href={item.url}>
				<a>{item.text}</a>
			</Link>
		</li>
	));

	if (user?.success) {
		return (
			<div className='ps-block--user-account'>
				<img
					style={{ objectFit: 'cover' }}
					width='40'
					height='40'
					className='rounded-circle'
					src={
						user?.avatar
							? user?.avatar
							: 'https://res.cloudinary.com/abzedmohammed/image/upload/v1670316789/defaults/default_black_mv0upm.png'
					}
					alt='user-avatar'
				/>
				<div className='ps-block__content'>
					<ul className='ps-list--arrow'>
						{linksView}
						<li className='ps-block__footer'>
							<a onClick={() => dispatch(logout())}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		);
	} else {
		return (
			<div className='ps-block--user-header'>
				<div className='ps-block__left'>
					<i className='icon-user'></i>
				</div>
				<div className='ps-block__right'>
					<Link href='/account/login'>
						{/* <a onClick={() => signIn()}>Login</a> */}
						<a>Login</a>
					</Link>
					<Link href='/account/register'>
						<a>Register</a>
					</Link>
				</div>
			</div>
		);
	}
}
