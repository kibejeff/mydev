import React, { useEffect } from 'react';
import Link from 'next/link';
import { calculateAmount, calculateCartTotal } from '~/utilities/ecomerce-helpers';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '~/features/products/productSlice';
import { calculateDiscount } from '~/utilities/product-helper';

const ModuleDepositpayment = ({getFormData}) => {

    const { productToPay } = useSelector((state) => state.products);
    
    function handleSendDataToPay(){
        getFormData({
            amount: productToPay?.deposit,
            checkout_id: productToPay?.id,
            product_id: productToPay?.product?.uuid,
            deposit: productToPay?.deposit,
            full_price: productToPay?.new_price
        })
    }

    useEffect(() => {
        handleSendDataToPay()
    }, [])


    let listItemsView, shippingView, totalView;

    if (productToPay?.id) {
        listItemsView = (
					<Link href='/account/applications' key={productToPay?.id}>
						<a>
							<strong>
								{productToPay?.product?.title}
								<span>x{productToPay?.product?.quantity}</span>
							</strong>
							<small>
								KES{' '}
								{calculateDiscount(
									productToPay?.product?.price,
									productToPay?.product?.discount,
								)}
							</small>
						</a>
					</Link>
				);
    } else {
        listItemsView = <p>No Product.</p>;
    }
    if (productToPay?.product?.shipping_fee > 0) {
        shippingView = (
            <figure>
                <figcaption>
                    <strong>Shipping Fee</strong>
                    <small>KES {productToPay?.product?.shipping_fee}</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>KES {productToPay?.deposit}</strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>KES {productToPay?.deposit}.00</strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <>Initial Deposit</>
                        <small>KES {productToPay?.deposit}</small>
                    </figcaption>
                </figure>
                <figure>
                    <figcaption>
                        <>Monthly Installments</>
                        <small>KES {productToPay?.monthly_installments}</small>
                    </figcaption>
                </figure>

                <figure>
                    <figcaption>
                        <>Payment Duration</>
                        <small>{productToPay?.duration}</small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default ModuleDepositpayment;
