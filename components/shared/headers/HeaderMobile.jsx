import React from 'react';
import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';
import { logout } from '~/features/user/userSlice';
import { useDispatch } from 'react-redux';

export default function HeaderMobile() {
	const dispatch = useDispatch()

    return (
			<header className='header header--mobile'>
				<div className='header__top'>
					<div className='header__left'>
						<p>Appliances for The Next Billion</p>
					</div>
					<div className='header__right'>
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
				<div className='navigation--mobile'>
					<div className='navigation__left'>
						<Link href='/'>
							<a className='ps-logo'>
								<img
									height='50'
									width='200'
									src='/static/img/logos/logo.png'
									alt='Powerpay Africa'
								/>
								{/* <h2><span style={{color: 'green'}}><i><b>POWER</b></i></span><span style={{color: 'white', marginLeft: "3px"}}><b>PLAY</b></span></h2> */}
							</a>
						</Link>
					</div>
					<MobileHeaderActions />
				</div>
				<div className='ps-search--mobile'>
					<form className='ps-form--search-mobile' action='/' method='get'>
						<div className='form-group--nest'>
							<input
								className='form-control'
								type='text'
								placeholder='Search something...'
							/>
							<button>
								<i className='icon-magnifier'></i>
							</button>
						</div>
					</form>
				</div>
			</header>
		);
    }

