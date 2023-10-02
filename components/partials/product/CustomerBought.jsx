import React, { useEffect } from 'react';
import Slider from 'react-slick';
import {
    carouselFullwidth,
    carouselStandard,
} from '~/utilities/carousel-helpers';
import Product from '~/components/elements/products/Product';
import { useSelector } from 'react-redux';
// import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';


const CustomerBought = ({ collectionSlug, boxed, layout }) => {

    const {products} = useSelector(state => state.products)

    const productsCopy = [...products]

    const data = productsCopy.slice(0, 6).map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    useEffect(() => {
    }, [collectionSlug]);

    // Views
    let carouselView;
    if (data) {
        if ((layout = 'fullwidth')) {
            carouselView = (
                <Slider {...carouselFullwidth} className="ps-carousel outside">
                    {data.map((item, index) => {
                        if (index < 8) {
                            return <Product product={item} key={item.id} />;
                        }
                    })}
                </Slider>
            );
        } else {
            carouselView = (
                <Slider {...carouselStandard} className="ps-carousel outside">
                    {data.map((item, index) => {
                        if (index < 8) {
                            return <Product product={item} key={item.id} />;
                        }
                    })}
                </Slider>
            );
        }
    }
    else {
        carouselView = <p>No product found.</p>
    }

    return (
        <div
            className={`ps-section--default ps-customer-bought ${
                boxed === true ? 'boxed' : ''
            }`}>
            <div className="ps-section__header">
                <h3>Customers who bought this item also bought</h3>
            </div>
            <div className="ps-section__content">{carouselView}</div>
        </div>
    );
};

export default CustomerBought;
