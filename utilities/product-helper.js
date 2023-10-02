import React from 'react';
import LazyLoad from 'react-lazyload';
import { baseUrl } from '~/repositories/Repository';
import Link from 'next/link';

export function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
    }
}

export function calculateDiscount(price, discount) {
    return Math.abs(Math.round(((100 - discount) / 100) * price));
}

export function ratesAverage(reviews){
    const ratesAvr = reviews?.reduce((acc, value) => acc + value.rating, 0)
    const ratesCount = reviews?.filter(review => review.rating).length;
    return Math.round(ratesAvr / ratesCount)
}

export function getColletionBySlug(collections, slug) {
    if (collections.length > 0) {
        const result = collections.find(
            (item) => item.slug === slug.toString()
        );
        if (result !== undefined) {
            return result.products;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

export function getItemBySlug(banners, slug) {
    if (banners.length > 0) {
        const banner = banners.find((item) => item.slug === slug.toString());
        if (banner !== undefined) {
            return banner;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export function convertSlugsQueryString(payload) {
    let query = '';
    if (payload.length > 0) {
        payload.forEach((item) => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
    }
    return query;
}

export function StrapiProductPriceExpanded() {
    let view;
    view = (
        <p className="ps-product__price sale">
            ${formatCurrency(907)}
            <del className="ml-2">
                ${formatCurrency(800)}
            </del>
            <small>18% off</small>
        </p>
    );
    // } else {
    //     view = (
    //         <p className="ps-product__price">
    //             ${formatCurrency(product.price)}
    //         </p>
    //     );
    // }
    return view;
}

export function StrapiProductThumbnail() {
																						let view;
																						view = (
																							<Link
																								href='/product/[pid]'
																								as={`/product/${product.uuid}`}
																							>
																								<a>
																									<LazyLoad>
																										<img
																											src='https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_2.6,f_auto,h_460/fqmuzs6n1wn0k6l5ogmh'
																											alt='product.title'
																										/>
																									</LazyLoad>
																								</a>
																							</Link>
																						);
																						// else {
																						//     view = (
																						//         <Link href="/product/[pid]" as={`/product/${product.uuid}`}>
																						//             <a>
																						//                 <LazyLoad>
																						//                     <img src="/static/img/not-found.jpg" alt="powerpay-africa" />
																						//                 </LazyLoad>
																						//             </a>
																						//         </Link>
																						//     );
																						// }

																						return view;
																					}
