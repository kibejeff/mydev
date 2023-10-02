import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import GuarantorDetailsComponent from '~/components/partials/account/modules/Guarantors';

const GuarantorDetails = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Guarantor Details',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="User Information">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <GuarantorDetailsComponent />
            </div>
        </PageContainer>
    );
};

export default GuarantorDetails;
