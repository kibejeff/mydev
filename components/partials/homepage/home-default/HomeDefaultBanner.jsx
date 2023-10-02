import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import Link from 'next/link';
// import MediaRepository from '~/repositories/MediaRepository';
// import { baseUrl } from '~/repositories/Repository';
// import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';

const HomeDefaultBanner = () => {
    const [promotion1, setPromotion1] = useState(null);
    const [promotion2, setPromotion2] = useState(null);


    const carouselSetting = {
        dots: false,
        infinite: true,
        speed: 750,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    // Views
    let mainCarouselView;
    const bannerItems = ["https://res.cloudinary.com/ddntgj0zd/image/upload/v1685083473/imgonline-com-ua-CompressToSize-9y6p8GugfuMtX_kivxy9.jpg"]
    if (bannerItems) {
        const carouseItems = bannerItems.map((item) => (
            <div className="slide-item" key={item}>
                <Link href="/shop">
                    <a
                        className="ps-banner-item--default bg--cover"
                        style={{
                            backgroundImage: `url(${item})`,
                            objectFit: 'contain'
                        }}
                    />
                </Link>
            </div>
        ));
        mainCarouselView = (
            <Slider {...carouselSetting} className="ps-carousel">
                {carouseItems}
            </Slider>
        );
    }
    return (
        <div className="ps-home-banner ps-home-banner--1">
            <div className="ps-container">
                <div className="ps-section__left">{mainCarouselView}</div>
                <div className="ps-section__right">
                    <Promotion
                        link="/shop"
                        image="https://res.cloudinary.com/ddntgj0zd/image/upload/v1685083550/tefal1_udz90n.jpg"
                    />
                    <Promotion
                        link="/shop"
                        image="https://res.cloudinary.com/ddntgj0zd/image/upload/v1685086338/Tefal_CY211627_3206001095_Pack_3D1_hpgcs7.png"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeDefaultBanner;
