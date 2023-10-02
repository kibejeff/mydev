import React, { useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';

import { carouselStandard } from '~/utilities/carousel-helpers';
import CountDownSimple from '~/components/elements/CountDownSimple';
import useGetProducts from '~/hooks/useGetProducts';
import Product from '~/components/elements/products/Product';
import data from '~/data';

const ProductGroupDealOfDay = () => {

    // Views
    let productItemsView;
    let skeletons;

    if (data.length) {
        skeletons = data.map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <Product product={item} />
            </div>
        ));
    }
    else{
        skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
    }
    productItemsView = <div className="row">{skeletons}</div>;

    return (
        <div className="ps-deal-of-day">
            <div className={boxed ? 'container' : 'ps-container'}>
                <div className="ps-section__header">
                    <div className="ps-block--countdown-deal">
                        <div className="ps-block__left">
                            <h3>Upcoming May deals</h3>
                        </div>
                        <div className="ps-block__right">
                            <figure>
                                <figcaption>End in:</figcaption>
                                <CountDownSimple
                                    timeTillDate="05 31 2023, 6:00 am"
                                    timeFormat="MM DD YYYY, h:mm a"
                                />
                            </figure>
                        </div>
                    </div>
                    <Link href="/shop">
                        <a>View all</a>
                    </Link>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default ProductGroupDealOfDay;
