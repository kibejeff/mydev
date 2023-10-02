import React, { useEffect } from 'react';
import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures';
import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns';
// import DownLoadApp from '~/components/partials/commons/DownLoadApp';
import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import Newletters from '~/components/partials/commons/Newletters';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import PageContainer from '~/components/layouts/PageContainer';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '~/features/products/productSlice';

const HomepageDefaultPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <PageContainer title="Home">
            
            <main id="homepage-1">
                <HomeDefaultBanner />
                {/* <SiteFeatures /> */}
                <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" />
                {/* <HomeAdsColumns /> */}
                {/* <HomeDefaultTopCategories /> */}
                <HomeDefaultProductListing
                    collectionSlug="Clean Mobility"
                    title="Clean Mobility"
                    
                />
                <HomeDefaultProductListing
                    collectionSlug="Clean Cooking"
                    title="Clean Cooking"
                />
                {/* <DownLoadApp /> */}
                <NewArrivals collectionSlug="new" />
                <Newletters />
            </main>
        </PageContainer>
    );
};

export default HomepageDefaultPage;
