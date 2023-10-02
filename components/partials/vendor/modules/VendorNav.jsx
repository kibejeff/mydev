import {
	BellOutlined,
	AppstoreOutlined,
	ContainerOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	HomeOutlined,
	SmileOutlined,
	UserAddOutlined,
	ShoppingOutlined,
	DollarOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Menu, Space, Icon } from 'antd';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import { handleToggleSidebar } from '~/features/addon/addonSlice';
import VendorQuickLinks from './VendorQuickLinks';

const exampleCategories = [
	'All',
	'Computers & Technologies',
	'Desktop PC',
	'Laptop',
	'Smartphones',
	'Consumer Electrics',
	'Air Conditioners',
	'Refrigerators',
	'TV Televisions',
	'4K Ultra HD TVs',
	'LED TVs',
	'OLED TVs',
	'Cookware',
];

const items = [
	{
		key: '1',
		label: (
			<a
				target='_blank'
				rel='noopener noreferrer'
				href='https://www.antgroup.com'
			>
				1st menu item
			</a>
		),
	},
	{
		key: '2',
		label: (
			<a
				target='_blank'
				rel='noopener noreferrer'
				href='https://www.aliyun.com'
			>
				2nd menu item (disabled)
			</a>
		),
		icon: <SmileOutlined />,
		disabled: true,
	},
	{
		key: '3',
		label: (
			<a
				target='_blank'
				rel='noopener noreferrer'
				href='https://www.luohanacademy.com'
			>
				3rd menu item (disabled)
			</a>
		),
		disabled: true,
	},
	{
		key: '4',
		danger: true,
		label: 'a danger item',
	},
];

function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		// Update debounced value after delay
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default function VendorNavbar() {
	const { myProducts } = useSelector((state) => state.vendor);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const inputEl = useRef(null);
	const [isSearch, setIsSearch] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [resultItems, setResultItems] = useState(null);
	const [loading, setLoading] = useState(false);
	const debouncedSearchTerm = useDebounce(keyword, 300);

	function handleClearKeyword() {
		setKeyword('');
		setIsSearch(false);
		setLoading(false);
	}

	function handleSubmit(e) {
		e.preventDefault();
		Router.push(`/search?keyword=${keyword}`);
	}

	function toggleSideBar() {
		dispatch(handleToggleSidebar());
	}

	useEffect(() => {
		if (debouncedSearchTerm) {
			setLoading(true);
			if (keyword) {
				const queries = {
					_limit: 5,
					title_contains: keyword,
				};
				const products = myProducts?.filter((item) =>
					item.title.toLowerCase().includes(keyword.toLowerCase()),
				);
				if (products?.length) {
					setLoading(false);
					setResultItems(products);
					setIsSearch(true);
				}
			} else {
				setIsSearch(false);
				setKeyword('');
			}
			if (loading) {
				setIsSearch(false);
			}
		} else {
			setLoading(false);
			setIsSearch(false);
		}
	}, [debouncedSearchTerm]);

	// Views
	let productItemsView,
		clearTextView,
		selectOptionView,
		loadingView,
		loadMoreView;
	if (!loading) {
		if (resultItems && resultItems.length > 0) {
			if (resultItems.length > 5) {
				loadMoreView = (
					<div className='ps-panel__footer text-center'>
						<Link href='/search'>
							<a>See all results</a>
						</Link>
					</div>
				);
			}
			productItemsView = resultItems.map((product) => (
				<ProductSearchResult product={product} key={product.uuid} />
			));
		} else {
			productItemsView = <p>No product found.</p>;
		}
		if (keyword !== '') {
			clearTextView = (
				<span className='ps-form__action' onClick={handleClearKeyword}>
					<i className='icon icon-cross2'></i>
				</span>
			);
		}
	} else {
		loadingView = (
			<span className='ps-form__action'>
				<Spin size='small' />
			</span>
		);
	}

	selectOptionView = exampleCategories.map((option) => (
		<option value={option} key={option}>
			{option}
		</option>
	));

	const menu = (
		<Menu>
			<Menu.Item>
				<a href='#'>This is your notifications section.</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			<ul className='ps-section__links'>
				<li className='ps-vendor__hidden'>
					<Link href='/'>
						<a className='ps-logo'>
							<img
								height='45'
								width='200'
								src='/static/img/logos/logo.png'
								alt='Powerpay Africa'
							/>
						</a>
					</Link>
				</li>
				{/* <li className=''>
					<form
						className='ps-form--quick-search ml-4'
						method='get'
						action='/'
						onSubmit={handleSubmit}
					>
						<div className='ps-form__input'>
							<input
								ref={inputEl}
								className='form-control'
								type='text'
								value={keyword}
								placeholder='Search...'
								onChange={(e) => setKeyword(e.target.value)}
							/>
							{clearTextView}
							{loadingView}
						</div>
						<button onClick={handleSubmit}>Search</button>
						<div
							className={`ps-panel--search-result${isSearch ? ' active ' : ''}`}
						>
							<div className='ps-panel__content'>{productItemsView}</div>
							{loadMoreView}
						</div>
					</form>
				</li> */}

				{/* <li className='d-flex align-items-center justify-content-between'>
					<Link className='active' href='/vendor/dashboard'>
						<AppstoreOutlined className='ps-vendor__icons' />
					</Link>

					<Link className='ml-4 ps-vendor__hidden' href='/shop'>
						<ShoppingOutlined className='ps-vendor__icons ml-5' />
					</Link>

					<Dropdown overlay={menu}>
						<a onClick={(e) => e.preventDefault()} className='mx-5' href='#'>
							<Space>
								<Badge color='#f44336'>
									<BellOutlined className='ps-vendor__icons' />
								</Badge>
							</Space>
						</a>
					</Dropdown>

					<Link className='ps-vendor__hidden' href='/vendor/loans-management'>
						<DollarOutlined className='ps-vendor__icons' />
					</Link>
				</li> */}
				<li className='ps-block--user-account'>
					<VendorQuickLinks />
				</li>
			</ul>
		</>
	);
}
