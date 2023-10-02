import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import EmploymentDetailsComponent from '~/components/partials/account/modules/EmploymentDetails';

const EmploymentDetails = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Employment Details',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="User Information">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <EmploymentDetailsComponent />
            </div>
        </PageContainer>
    );
};

export default EmploymentDetails;
