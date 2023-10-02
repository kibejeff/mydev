import React, { useEffect } from 'react';
import { BackTop } from 'antd';

import PageLoader from '~/components/elements/common/PageLoader';
import NavigationList from '~/components/shared/navigation/NavigationList';

const MasterLayout = ({ children }) => {

    return (
        <>
            {children}
            <PageLoader />
            <NavigationList />
            <BackTop>
                <button className="ps-btn--backtop">
                    <i className="icon-arrow-up" />
                </button>
            </BackTop>
        </>
    );
};

export default MasterLayout;
