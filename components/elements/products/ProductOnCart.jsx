import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import useCartProduct from '~/hooks/useCartProduct';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { calculateDiscount } from '~/utilities/product-helper';

const ProductOnCart = ({ product, children }) => {
    const { title } = useProduct();
    const { cartImage } = useCartProduct()

    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product?.uuid}`}>
                    <a>{cartImage(product?.image_url)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product.title, product.uuid)}
                <p>
                    <small>
                        KES {calculateDiscount(product?.price, product?.discount)} x {product?.quantity}
                    </small>
                    <br />
                    <small>
                        <b>Subtotal</b>: KES {calculateAmount(product)}
                    </small>
                </p>{' '}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
