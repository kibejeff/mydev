import React, { useEffect, useState } from 'react';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import Product from '~/components/elements/products/Product';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { useSelector } from 'react-redux';

const WidgetProductSameBrands = ({collectionSlug, product_id}) => {
    const { products, loading} = useSelector(state => state.products)
    const productItems = products.filter(product => product?.brand_name == collectionSlug && product?.uuid != product_id)

    useEffect(() => {
    }, []);

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems?.length) {
            productItemsView = productItems.slice(0, 2).map((item) => (
                <Product product={item} key={item.id} />
            ));
        } else {
            productItemsView = <p>No product found.</p>;
        }
    } else {
        productItemsView = generateTempArray(1).map((item) => (
            <SkeletonProduct key={item} />
        ));
    }

    return (
        <aside className="widget widget_same-brand">
            <h3>Same Brand</h3>
            <div className="widget__content">{productItemsView}</div>
        </aside>
    );
};

export default WidgetProductSameBrands;
