import React from 'react';
import WidgetProductFeatures from '~/components/shared/widgets/WidgetProductFeatures';
import WidgetSaleOnSite from '~/components/shared/widgets/WidgetSaleOnSite';
import WidgetProductSameBrands from '~/components/shared/widgets/WidgetProductSameBrands';
import WidgetShopAds from '~/components/shared/widgets/WidgetShopAds';

const ProductWidgets = ({collectionSlug, product_id}) => {
    return (
        <section>
            {/* <WidgetProductFeatures /> */}
            <WidgetSaleOnSite />
            {/* <WidgetShopAds /> */}
            <WidgetProductSameBrands collectionSlug={collectionSlug} product_id={product_id} />
        </section>
    );
};

export default ProductWidgets;
