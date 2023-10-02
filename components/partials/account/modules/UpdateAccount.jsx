import React, {  } from 'react';
import Link from 'next/link';
import AccountLinks from './Accountlinks';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';

export default function UpdateAccount(){


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
                        <div className="ps-section--account-setting">
                            <div className="ps-section__content">
                            <FormChangeUserInformation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
