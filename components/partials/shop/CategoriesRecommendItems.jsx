import React, { Component } from 'react';
import Slider from 'react-slick';
import { carouselStandard } from '../../../utilities/carousel-helpers';

import Product from '../../../components/elements/products/Product';
import data from '~/data';
class CategoriesRecommendItems extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let products = data;
        const { collections } = this.props;
        if (collections.length > 0) {
            products = collections.find(
                collection => collection.slug === 'shop-recommend-items'
            ).products;
        }
        return (
            <div className="ps-product-list ps-product-list--2">
                <div className="ps-section__header">
                    <h3>Recommended Items</h3>
                </div>
                <div className="ps-section__content">
                    <Slider {...carouselStandard} className="ps-carousel">
                        {products &&
                            products.length > 0 &&
                            products.map(product => (
                                <Product product={product} key={product.uuid} />
                            ))}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default CategoriesRecommendItems;
