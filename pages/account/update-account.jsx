import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import UpdateAccount from '~/components/partials/account/modules/UpdateAccount';

const UpdateUserInformation = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Account Update',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="User Information">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <UpdateAccount />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default UpdateUserInformation;
