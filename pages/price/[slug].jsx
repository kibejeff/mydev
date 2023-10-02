import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ProductRepository from '~/repositories/ProductRepository';
import { useRouter } from 'next/router';
import ProductItems from '~/components/partials/product/ProductItems';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';

const ProductByPriceScreen = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const {products, loading} = useSelector(state => state.products)
    const [min, setmin] = useState(0)
    const [max, setmax] = useState(0)

    const filteredProducts = products.filter(item => item.price > min && item.price < max);

    useEffect(() => {
        let prices = slug.split('&')
        setmin(Number(prices[0]))
        setmax(Number(prices[1]))

    }, [slug]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/',
        },
        {
            text: slug ? slug : 'Product Price',
        },
    ];

    //Views
    let productItemsViews;
    if (!loading) {
        if (filteredProducts?.length > 0) {
            productItemsViews = (
                <ProductItems columns={4} products={filteredProducts} />
            );
        } else {
            productItemsViews = <p>No Product found</p>;
        }
    } else {
        productItemsViews = <p>Loading...</p>;
    }


    return (
        <PageContainer
            footer={<FooterDefault />}
            title={slug ? slug : 'Brand'}>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="ps-layout--shop ps-shop--category">
                        <div className="ps-layout__left">
                            <WidgetShopCategories />
                            <WidgetShopBrands />
                            <WidgetShopFilterByPriceRange />
                        </div>
                        <div className="ps-layout__right">
                            <h3 className="ps-shop__heading">
                                Price: From KES {min} to KES {max}
                            </h3>
                            {productItemsViews}
                        </div>
                    </div>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};
export default ProductByPriceScreen;
