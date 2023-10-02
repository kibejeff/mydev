import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Promotion from '~/components/elements/media/Promotion';
import { fetchBrands } from '~/features/products/productSlice';

const HomeAdsColumns = () => {
    const {brands} = useSelector(state => state.products)
    const dispatch = useDispatch()
    const unique = []
    brands?.map(item => {
        unique.push(item?.brand_url);
    })
    const uniqueBrand = Array.from(new Set(unique));

    console.log(uniqueBrand);
    useEffect(() => {
        dispatch(fetchBrands())
    }, [])
    return (
        <div className="ps-home-ads mb-5">
            <div className="ps-container">
                <div className="ps-product-list">
                    <div className="ps-section__header">
                        <h3>Best Selling Brands</h3>
                    </div>
                </div>
                <div className="row mx-5">
                    {
                        uniqueBrand?.slice(0,2).map(item => {
                            return (
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                    {/* <Promotion
                                        link="/shop"
                                        image={item}
                                    /> */}
                                    <img src={item} alt="brand" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default HomeAdsColumns;
