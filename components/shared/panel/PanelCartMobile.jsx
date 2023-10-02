import React, {  } from 'react';
import { calculateCartTotal } from '~/utilities/ecomerce-helpers';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '~/features/products/productSlice';
import { ToastContainer } from 'react-toastify';


const PanelCartMobile = () => {
    const { title, thumbnailImage } = useProduct();

    const products = useSelector(state => state.products.cart)
    const dispatch = useDispatch()

    function handleRemoveCartItem(e, productId) {
        e.preventDefault();
        dispatch(removeFromCart(productId));
    }

    //view
    let cartItemsView, footerView;

    if (products && products.length > 0) {
        const amount = calculateCartTotal(products);
        const items = products.map((item) => (
            <div className="ps-product--cart-mobile" key={item.id}>
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${item.id}`}>
                        <a>{thumbnailImage(item.image_url)}</a>
                    </Link>
                </div>
                <div className="ps-product__content">
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveCartItem(e, item.id)}>
                        <i className="icon-cross"></i>
                    </a>
                    {title(item.title, item.id)}
                    <Link href="/product/[pid]" as={`/product/${item.id}`}>
                        <a className="ps-product__title">{item.title}</a>
                    </Link>
                    <p>
                        <strong>Sold by:</strong> {item.vendor.name}
                    </p>
                    <small>
                        {item.quantity} x KES {item.price}
                    </small>
                </div>
            </div>
        ));
        cartItemsView = <div className="ps-cart__items">{items}</div>;
        footerView = (
            <div className="ps-cart__footer">
                <h3>
                    Sub Total:<strong>KES {amount}</strong>
                </h3>
                <figure>
                    <Link href="/account/shopping-cart">
                        <a className="ps-btn">View Cart</a>
                    </Link>
                    <Link href="/account/checkout">
                        <a className="ps-btn">Checkout</a>
                    </Link>
                </figure>
            </div>
        );
    } else {
        cartItemsView = <p>Cart empty!</p>;
        footerView = (
            <div className="ps-cart__footer">
                <Link href="/shop">
                    <a className="ps-btn ps-btn--fullwidth">Shop now</a>
                </Link>
            </div>
        );
    }
    return (
        <div className="ps-cart--mobile">
            <div className="ps-cart__content">
                {cartItemsView}
                {footerView}
            </div>
        </div>
    );
};
export default PanelCartMobile;
