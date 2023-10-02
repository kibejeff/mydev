import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import useProduct from '~/hooks/useProduct';
import { ratesAverage } from '~/utilities/product-helper';

const ProductHorizontal = ({product}) => {
    const { thumbnailImage, price, title } = useProduct();

    return (
        <div className="ps-product--horizontal">
            <div className="ps-product__thumbnail">
                <Link href="/product/1" as={`/product/${product.uuid}`}>
                    <a>{thumbnailImage(product?.image_url)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product.title, product?.uuid)}
                <div className="ps-product__rating">
                <Rating rates={3} />
                </div>
                {price(product?.price, product?.discount)}
            </div>
        </div>
    );
};

export default ProductHorizontal;
