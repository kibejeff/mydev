import React from 'react';
import LazyLoad from 'react-lazyload';
// import Link from 'next/link';
// import { calculateDiscount } from '~/utilities/product-helper';


export default function useCartProduct() {
    return {
        cartImage: (value) => {
            return (
                <>
                    <LazyLoad>
                        <img width="100" height="50"
                            src={value}
                            alt="dishes"
                        />
                    </LazyLoad>
                </>
            );
        },
    };
}
