import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { Checkbox, Space } from 'antd';
import { Radio, Input } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '~/features/products/productSlice';

const WidgetShopBrands = () => {
	const Router = useRouter();
	const { brands, loading } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	const { slug } = Router.query;

    const [value, setValue] = useState(brands[0] || null);

	async function getBrands() {
		dispatch(fetchBrands());
	}

	function handleSelectBrand(e) {
        setValue(e.target.value)
		Router.push(`/brand/${e.target.value}`);
	}

	useEffect(() => {
		getBrands();
	}, []);

	// Views
	let brandsView;
	if (!loading) {
		if (brands?.length > 0) {
			const items = brands?.map((item) => (
				<li key={item?.id}>
					<Link href={`shop/${item?.brand}`}>{item?.brand}</Link>
				</li>
			));
			brandsView = <ul className='ps-list--brands'>{items}</ul>;
		} else {
		}
	} else {
		brandsView = <p>Loading...</p>;
	}
	return (
		<aside className='widget widget_shop widget_shop--brand'>
			<h4 className='widget-title'>By Brands</h4>
			<figure>
				<Radio.Group onChange={handleSelectBrand} value={value}>
					<Space direction='vertical'>
                        {
                            brands.map(brand => {
                                return (
                            <Radio value={brand.brand}>{brand.brand}</Radio>
                                )
                            })
                        }
					
					</Space>
				</Radio.Group>
			</figure>
		</aside>
	);
};

export default WidgetShopBrands;
