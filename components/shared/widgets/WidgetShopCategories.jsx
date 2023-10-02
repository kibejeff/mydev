import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '~/features/products/productSlice';

const WidgetShopCategories = () => {
    const Router = useRouter();
    const {categories, loading} = useSelector(state => state.products)
    const dispatch = useDispatch()
    const { slug } = Router.query;

    async function getCategories() {
        dispatch(fetchCategories())
    }

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        
    }, [slug]);

    // Views
    let categoriesView;
    if (!loading) {
        if (categories?.length > 0) {
            const items = categories.map((item) => (
                <li
                    key={item.id}
                    className={item.category === slug ? 'active' : ''}>
                    <Link href={`/category/${item.category}`}>{item.category}</Link>
                </li>
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>
            {categoriesView}
        </aside>
    );
};

export default WidgetShopCategories;
