import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import useProduct from '~/hooks/useProduct';

const ProductSearchResult = ({ product }) => {
    const { thumbnailImage, price, title } = useProduct();

    return (
        <div className="ps-product ps-product--wide ps-product--search-result">
            <div className="ps-product__thumbnail">
                <Link href={`/product/${product.uuid}`} as={`/product`}>
                    <a>{thumbnailImage(product.image)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product.title, product.uuid)}
                <div className="ps-product__rating">
                    <Rating />
                    <span>3</span>
                </div>
                {price(product.price, product.discount)}
            </div>
        </div>
    );
};
export default ProductSearchResult;
