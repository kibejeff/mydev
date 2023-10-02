import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import VendorBanner from '~/components/partials/vendor/VendorBanner';
import VendorAbout from '~/components/partials/vendor/VendorAbout';
import VendorMileStone from '~/components/partials/vendor/VendorMileStone';
import VendorBestFees from '~/components/partials/vendor/VendorBestFees';
import VendorTestimonials from '~/components/partials/vendor/VendorTestimonials';
import VendorFaqs from '~/components/partials/vendor/VendorFaqs';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import StoreList from '~/components/partials/vendor/StoreList';
import StoreList2 from '~/components/partials/vendor/StoreList2';
import VendorRegister from '~/components/partials/vendor/VendorRegister';

const BecomeAVendorPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Become a Vendor',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Become a vendor">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <VendorRegister />
                {/* <VendorBanner />
                <VendorAbout />
                <VendorMileStone />
                <VendorBestFees />
                <VendorTestimonials />
                <VendorFaqs />
                <VendorBanner />
                <StoreList />
                <StoreList2 /> */}
            </div>
            <Newsletters layout="container" />
        </PageContainer>
    );
};

export default BecomeAVendorPage;
