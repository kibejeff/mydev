import React, { Component } from 'react';
import Link from 'next/link';
import { notification } from 'antd';
import Menu from '../../elements/menu/Menu';

import menuData from '../../../public/static/data/menu';
import CurrencyDropdown from '../headers/modules/CurrencyDropdown';
import LanguageSwicher from '../headers/modules/LanguageSwicher';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import { useDispatch } from 'react-redux';
import { logout } from '~/features/user/userSlice';

function NavigationDefault() {
	const dispatch = useDispatch();

	function handleFeatureWillUpdate(e) {
		e.preventDefault();
		notification.open({
			message: 'Opp! Something went wrong.',
			description: 'This feature has been updated',
			duration: 500,
		});
	}

	return (
		<nav className='navigation'>
			<div className='ps-container'>
				<div className='navigation__left'>
					<MenuCategoriesDropdown />
				</div>
				<div className='navigation__right'>
					<Menu source={menuData.menuPrimary.menu_1} className='menu' />
					<ul className='navigation__extra'>
						<li>
							<Link href='/vendor/become-a-vendor'>
								<a onClick={() => dispatch(logout())}>Sell on PowerPay</a>
							</Link>
						</li>
						<li>
							<Link href='/account/order-tracking'>
								<a>Track your order</a>
							</Link>
						</li>
						{/* <li>
							<CurrencyDropdown />
						</li>
						<li>
							<LanguageSwicher />
						</li> */}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default NavigationDefault;
