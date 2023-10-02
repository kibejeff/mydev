import React, { useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { carouselFullwidth } from '~/utilities/carousel-helpers';
import CountDownSimple from '~/components/elements/CountDownSimple';
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay';
import { generateTempArray } from '~/utilities/common-helpers';
import Product from '~/components/elements/products/Product';
import { useSelector } from 'react-redux';

const HomeDefaultDealOfDay = () => {
	const { products, loading } = useSelector((state) => state.products);
	const filteredProducts = products?.filter((product) => product.featured);

	let views;

	if (filteredProducts?.length) {
		views = filteredProducts.map((item) => (
			<div className='col-xl-2 col-lg-3 col-sm-3 col-6' key={item}>
				<Product product={item} />
			</div>
		));
	} else if (loading) {
		views = generateTempArray(6).map((item) => (
			<div className='col-xl-2 col-lg-3 col-sm-3 col-6' key={item}>
				<SkeletonProduct />
			</div>
		));
	} else {
		views = (
			<div className='col-xl-2 col-lg-3 col-sm-3 col-6'>
				<p>No product(s) found.</p>
			</div>
		);
	}
	let productItemsView = <div className='row'>{views}</div>;

	return (
		<div className='ps-deal-of-day'>
			<div className='ps-container'>
				<div className='ps-section__header'>
					<div className='ps-block--countdown-deal'>
						<div className='ps-block__left'>
							<h3>Trending Deals</h3>
						</div>
						{/* <div className="ps-block__right">
                            <figure>
                                <figcaption>End in:</figcaption>
                                <CountDownSimple
                                    timeTillDate="03 31 2023, 6:00 am"
                                    timeFormat="MM DD YYYY, h:mm a"
                                />
                            </figure>
                        </div> */}
					</div>
					<Link href='/shop'>
						<a>View all</a>
					</Link>
				</div>
				<div className='ps-section__content'>{productItemsView}</div>
			</div>
		</div>
	);
};

export default HomeDefaultDealOfDay;
