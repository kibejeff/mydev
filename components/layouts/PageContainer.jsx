import React from 'react';
import Head from 'next/head';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import VendorNavbar from '../partials/vendor/modules/VendorNav';
import { useSelector } from 'react-redux';

const initHeaders = (
	<>
		<HeaderDefault />
		<HeaderMobile />
	</>
);

const vendorHeaders = (
	<>
		<div className='ps-vendor-dashboard'>
			<VendorNavbar />
		</div>
		{/* <HeaderMobile /> */}
	</>
);

const initFooters = (
	<>
		<FooterFullwidth />
	</>
);

export default function PageContainer({
	header = initHeaders,
	header2 = vendorHeaders,
	footer = initFooters,
	children,
	title = 'Page',
}) {
	const { user } = useSelector((state) => state.user);
	let titleView;

	if (title !== '') {
		titleView = process.env.title + ' | ' + title;
	} else {
		titleView = process.env.title + ' | ' + process.env.titleDescription;
	}

	return (
		<>
			<Head>
				<title>{titleView}</title>
			</Head>
			{user?.is_vendor ? header2 : header}
			{children}
			{footer}
		</>
	);
}
