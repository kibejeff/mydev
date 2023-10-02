import React from 'react';
import PasswordReset from '~/components/partials/account/PasswordReset';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';


const PasswordResetPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Password Reset',
        },
    ];

    return(
       
        <>
            <PageContainer footer={<FooterDefault />} title="My Account">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <PasswordReset/>
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
    

}

export default PasswordResetPage;