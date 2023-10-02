import React from 'react';
import { carouselFullwidth } from '../../../../../utilities/carousel-helpers';
import Product from '../../../../elements/products/Product';
import Slider from 'react-slick';

const CollectionProducts = () => (
    <div>
        <Slider {...carouselFullwidth} infinite={false} className="ps-carousel outside">
            <Product />
        </Slider>
    </div>
);

export default CollectionProducts;
