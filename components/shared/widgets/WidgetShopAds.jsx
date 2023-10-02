import React from 'react';
import Link from 'next/link';

const WidgetShopAds = () => {
    return (
        <aside className="widget widget_ads">
            <Link href="/shop">
                <a>
                    <img src="https://i.ytimg.com/vi/LoXhlzuRMVc/maxresdefault.jpg" alt="powerpay-africa" />
                </a>
            </Link>
        </aside>
    );
};

export default WidgetShopAds;
