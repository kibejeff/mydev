import React, { useState } from 'react';
import { Modal } from 'antd';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import { useDispatch } from 'react-redux';
import { addToCart, addToCompare, addToWishlist } from '~/features/products/productSlice';

const ModuleProductActions = ({ product }) => {
    const [isQuickView, setIsQuickView] = useState(false);
    const dispatch = useDispatch()
    // const { addItem } = useEcomerce();

    function handleAddItemToCart(e) {
        e.preventDefault();
        dispatch(addToCart(product))
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        dispatch(addToWishlist(product))
    }

    function handleAddItemToCompare(e) {
        e.preventDefault()
        dispatch(addToCompare(product))
    }

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true);
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false);
    };
    return (
        <ul className="ps-product__actions">
            <li>
                <a 
                    disabled={product?.coming_soon}
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add To Cart"
                    onClick={handleAddItemToCart}>
                    <i className="icon-bag2"></i>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Quick View"
                    onClick={handleShowQuickView}>
                    <i className="icon-eye"></i>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add to wishlist"
                    onClick={(e) => handleAddItemToWishlist(e)}>
                    <i className="icon-heart"></i>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                    onClick={(e) => handleAddItemToCompare(e)}>
                    <i className="icon-chart-bars"></i>
                </a>
            </li>
            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={(e) => handleHideQuickView(e)}
                visible={isQuickView}
                closeIcon={<i className="icon icon-cross2"></i>}>
                <h3>Quickview</h3>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

export default ModuleProductActions;
