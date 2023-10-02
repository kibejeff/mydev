import Link from 'next/link';
import React, {  } from 'react';
import AccountLinks from './modules/Accountlinks';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableInvoices from './modules/TableInvoices';

export default function Invoices(){

        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {
                                            <AccountLinks active={true} />
                                        }
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__header">
                                        <h3>Invoices</h3>
                                    </div>
                                    <div className="ps-section__content">
                                        <TableInvoices />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
