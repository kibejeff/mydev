import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import ConfirmDetailsComponent from '~/components/partials/account/modules/ConfirmDetails';

const UserAgreement = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Agree To Terms',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="User Information">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <ConfirmDetailsComponent />
            </div>
        </PageContainer>
    );
};

export default UserAgreement;
