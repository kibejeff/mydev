import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import { ProductGroupWithCarousel } from '~/components/partials/product/ProductGroupWithCarousel';
import data from '~/data';
import { useSelector } from 'react-redux';

const HomeDefaultProductListing = ({ collectionSlug, title }) => {
    const {products, loading} = useSelector(state => state.products)
    const data = products?.filter(product => product?.category_name.includes(collectionSlug))
    const [currentCollection, setCurrentCollection] = useState('new-arrivals');

    const sectionLinks = [
        // {
        //     title: 'New Arrivals',
        //     name: 'new-arrivals',
        //     slug: collectionSlug,
        // },
        // {
        //     title: 'Best seller',
        //     name: 'best-seller',
        //     slug: 'fullwidth-clothing-best-sellers',
        // },
        // {
        //     title: 'Most Popular',
        //     name: 'most-popular',
        //     slug: 'fullwidth-clothing-most-popular',
        // },
    ];

    function handleChangeTab(e, tab) {
        e.preventDefault();
        setCurrentCollection(tab.name);
    }

    useEffect(() => {
    }, [collectionSlug]);

    const sectionLinksView = sectionLinks.map((link) => (
        <li
            className={currentCollection === link.name ? 'active' : ''}
            key={link.name}>
            <a href="#" onClick={(e) => handleChangeTab(e, link)}>
                {link.title}
            </a>
        </li>
    ));

    let productItemsView;
    if (!loading) {
        if (data && data.length > 0) {
            productItemsView = (
                <ProductGroupWithCarousel
                    products={data}
                    type="fullwidth"
                />
            );
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }
    
    return (
        <div className="ps-product-list">
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3>{title}</h3>
                    <ul className="ps-section__links">
                        {sectionLinksView}
                        <li>
                            <Link href={`/shop`}>
                                <a>View All</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default HomeDefaultProductListing;
