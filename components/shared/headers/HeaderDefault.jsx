import React, { useEffect } from 'react';
import Link from 'next/link';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import NavigationDefault from '~/components/shared/navigation/NavigationDefault';
import HeaderActions from '~/components/shared/headers/modules/HeaderActions';
import { stickyHeader } from '~/utilities/common-helpers';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';

export default function HeaderDefault(){
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);

    return (
			<header className='header header--1' data-sticky='true' id='headerSticky'>
				<div className='header__top'>
					<div className='ps-container'>
						<div className='header__left'>
							<Link href='/'>
								<a className='ps-logo'>
									<img
										height='50'
										width='250'
										src='/static/img/logos/logo.png'
										alt='Powerpay Africa'
									/>
								</a>
							</Link>
							<MenuCategoriesDropdown />
						</div>
						<div className='header__center'>
							<SearchHeader />
						</div>
						<div className='header__right'>
							<HeaderActions />
						</div>
					</div>
				</div>
				<NavigationDefault />
			</header>
		);
};

