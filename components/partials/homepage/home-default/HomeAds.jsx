import React from 'react';
import Promotion from '~/components/elements/media/Promotion';

const HomeAds = () => {

    return (
        <div className="ps-home-ads">
            <h1>ADDS</h1>
            <div className="ps-container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop"
                            image="https://thatsit.co.za/wp-content/uploads/2019/05/Fotolia_141562522_Subscription_Monthly_M-1080x675-1024x640.jpg"
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop"
                            image="https://thatsit.co.za/wp-content/uploads/2019/05/Fotolia_141562522_Subscription_Monthly_M-1080x675-1024x640.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeAds;
