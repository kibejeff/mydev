import React from 'react';
import Link from 'next/link';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import AccountQuickLinks from '~/components/shared/headers/modules/AccountQuickLinks';
import { useSelector } from 'react-redux';

export default function HeaderActions() {
    const { compareList, wishList} = useSelector(state => state.products)
    
    return (
        <div className="header__actions">
            <Link href="/account/compare">
                <a className="header__extra">
                    <i className="icon-chart-bars"></i>
                    <span>
                        <i>{compareList?.length}</i>
                    </span>
                </a>
            </Link>
            <Link href="/account/wishlist">
                <a className="header__extra">
                    <i className="icon-heart"></i>
                    <span>
                        <i>{wishList?.length}</i>
                    </span>
                </a>
            </Link>
            <MiniCart />
            <AccountQuickLinks />
        </div>
    );
};
