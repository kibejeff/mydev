import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductHorizontal from '~/components/elements/products/ProductHorizontal';
import { useSelector } from 'react-redux';
// import useGetProducts from '~/hooks/useGetProducts';

const NewArrivals = ({ collectionSlug }) => {
    const {products, loading} = useSelector(state => state.products)
    const productCopy = products?.length ? [...products] : []
    const data = productCopy?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    useEffect(() => {
    }, [collectionSlug]);

    let productItemView;
    if (!loading) {
        if (data?.length) {
            productItemView = data?.slice(0,4).map((item) => (
                <div
                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                    key={item.id}>
                    <ProductHorizontal product={item} />
                </div>
            ));
        } else {
            productItemView = <p>No product found.</p>;
        }
    } else {}
    
    
    return (
        <div className="ps-product-list ps-new-arrivals">
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3>Hot New Arrivals</h3>
                    <ul className="ps-section__links">
                        <li>
                            <Link href="/shop">
                                <a>View All</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">
                    <div className="row">{productItemView}</div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
