import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import PersonalDetailsComponent from '~/components/partials/account/modules/PersonalDetails';

const AdditionalAccountInfo = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Additional account information',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="User Information">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <PersonalDetailsComponent />
            </div>
        </PageContainer>
    );
};

export default AdditionalAccountInfo;
