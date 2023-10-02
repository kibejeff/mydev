import React from 'react';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import { calculateDiscount } from '~/utilities/product-helper';

export default function useProduct() {
	return {
		thumbnailImage: (value) => {
			return (
				<>
					<LazyLoad>
						<img
							style={{
								objectFit: 'cover'
							}}
							width='100%'
							height='auto'
							src={value}
							alt='dishes'
						/>
					</LazyLoad>
				</>
			);
		},
		price: (price, discount) => {
			let view;

			view = (
				<p className='ps-product__price sale'>
					{discount > 0 ? (
						<>
							<span>KES </span>
							{calculateDiscount(price, discount)}
							<del className='ml-2'>
								<span>KES </span>
								{price}
							</del>
						</>
					) : (
						<>
							<span>KES </span>
							{price}
						</>
					)}
				</p>
			);
			return view;
		},
		badges: (values) => {
			let view = null;
			const badges = ['hot', 'new', 'sale'];
			const items = badges.map((item) => {
				return (
					<span className='ps-product__badge hot' key={item.id}>
						Hot
					</span>
				);
			});
			view = <div className='ps-product__badges'>{items}</div>;
			return view;
		},

		badge: (value) => {
			return <div className='ps-product__badge'>{value}</div>;
		},
		brand: (value) => {
			return (
				<Link href='/shop'>
					<a className='text-capitalize'>{value}</a>
				</Link>
			);
		},
		title: (value, id) => {
			return (
				<Link href={`/product/${id}`}>
					<a className='ps-product__title text-capitalize'>{value}</a>
				</Link>
			);
		},
	};
}
