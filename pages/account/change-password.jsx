import React from 'react';
import ChangePassword from '~/components/partials/account/ChangePassword';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';


const ChangePasswordPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Change Password',
        },
    ];

    return(
       
        <>
            <PageContainer footer={<FooterDefault />} title="My Account">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <ChangePassword/>
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
    

}

export default ChangePasswordPage;