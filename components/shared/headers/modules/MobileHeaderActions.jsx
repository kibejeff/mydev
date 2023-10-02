import React from 'react';

import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import data from '~/data';
import { useSelector } from 'react-redux';

export default function MobileHeaderActions() {
	const { user } = useSelector((state) => state.user);
	const { cart } = useSelector((state) => state.products);

	return (
		<div className='navigation__right'>
			<Link href='/account/shopping-cart'>
				<a className='header__extra' href='#'>
					<i className='icon-bag2'></i>
					<span>
						<i>{cart?.length}</i>
					</span>
				</a>
			</Link>

			{user?.success ? (
				<AccountQuickLinksMobile />
			) : (
				<div className='header__extra'>
					<Link href='/account/login'>
						<i className='icon-user'></i>
					</Link>
				</div>
			)}
		</div>
	);
};
