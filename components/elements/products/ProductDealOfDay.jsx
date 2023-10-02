import React from 'react';
import Link from 'next/link';
import Rating from '../Rating';
import { StrapiProductPriceExpanded } from '~/utilities/product-helper';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import ModuleProductProgressbar from '~/components/elements/products/modules/ModuleProductProgressbar';
import useProduct from '~/hooks/useProduct';

const ProductDealOfDay = () => {
    const { thumbnailImage, badge, title } = useProduct();
    return (
        <div className="ps-product ps-product--inner">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.uuid}`}>
                    <a>{thumbnailImage()}</a>
                </Link>
                {badge()}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">Young Shop</a>
                </Link>
                <div className="ps-product__content">
                    {StrapiProductPriceExpanded()}
                    {title()}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>7</span>
                    </div>
                    <ModuleProductProgressbar product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDealOfDay;
