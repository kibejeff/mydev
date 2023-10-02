import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import useProduct from '~/hooks/useProduct';
import { ratesAverage } from '~/utilities/product-helper';

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    let priceView;
    const {price} = useProduct()

    if (product?.is_sale) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">KES {product?.price}</del>
                {price(product?.price, product?.discount)}
            </h4>
        );
    } else {
        priceView = <h4 className="ps-product__price">{product?.price == "0.00" ? "Coming Soon" : "KES " + product?.price }</h4>;
    }
    return (
        <header>
            <h1 className='text-capitalize'>{product?.title}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    <Link href="/shop">
                        <a className="ml-2 text-capitalize">{product?.brand?.brand}</a>
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating rates={3} />
                    <span>({product?.reviews?.length} review(s))</span>
                </div>
            </div>
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
