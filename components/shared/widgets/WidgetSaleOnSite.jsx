import React from 'react';
import Link from 'next/link';

const WidgetSaleOnSite = () => {
    return (
        <aside className="widget widget_sell-on-site">
            <p>
                <i className="icon-store"></i> Sell on Powerpay Africa ? <br />
                <Link href="/account/vendor-registration">
                    <a> Register Now As A Vendor !</a>
                </Link>
            </p>
        </aside>
    );
};

export default WidgetSaleOnSite;
