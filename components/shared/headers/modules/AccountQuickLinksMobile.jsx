import React, { Component } from 'react';

import Link from 'next/link';
import { Dropdown, Menu } from 'antd';
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
		// {
		//     text: 'Address',
		//     url: '/account/addresses',
		// },
		{
			text: 'Recent Viewed Product',
			url: '/account/recent-viewed-product',
		},
		{
			text: 'Wishlist',
			url: '/account/wishlist',
		},
	];
	const menu = (
		<Menu>
			{accountLinks.map((link) => (
				<Menu.Item key={link.url}>
					<Link href={link.url}>
						<a>{link.text}</a>
					</Link>
				</Menu.Item>
			))}

			<Menu.Item>
				<a onClick={() => dispatch(logout())}>Logout</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu} placement='bottomLeft'>
			<a href='#' className='header__extra ps-user--mobile'>
				<img
					style={{ objectFit: 'cover' }}
					width='40'
					height='40'
					className='rounded-circle mt-1'
					src={
						user?.avatar
							? user?.avatar
							: 'https://res.cloudinary.com/abzedmohammed/image/upload/v1670316789/defaults/default_black_mv0upm.png'
					}
					alt='user-avatar'
				/>
			</a>
		</Dropdown>
	);
}
