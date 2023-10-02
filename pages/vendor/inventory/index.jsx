import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import VendorInventoryManagement from '~/components/partials/vendor/modules/VendorInventoryManagement';
import VendorProducts from '~/components/partials/vendor/modules/VendorProducts';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import {
	getVendorInventories,
	getVendorProfile,
} from '~/features/vendor/vendorSlice';

export default function VendorProductsList() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { inventory } = useSelector((state) => state.vendor);

	const [data, setdata] = useState(inventory);

	const breadCrumb = [
		{
			text: 'Vendor Dashboard',
			url: '/vendor/dashboard',
		},
		{
			text: 'Inventory',
		},
	];

	async function handleGetVendorInventory() {
		const res = await dispatch(getVendorProfile(user?.id));
		if (res?.payload?.results?.length) {
			const resp = await dispatch(
				getVendorInventories(res.payload?.results[0].id),
			);
			if (resp?.payload?.results?.length) {
				setdata(resp?.payload?.results);
			}
		}
	}

	useEffect(() => {
		setdata(inventory);
	}, [inventory]);

	useEffect(() => {}, [data]);

	useEffect(() => {
		handleGetVendorInventory();
	}, []);

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Dashboard'>
				<div className='ps-page--simple'>
					<BreadCrumb breacrumb={breadCrumb} />
					<VendorInventoryManagement data={data} />
				</div>
				<div style={{
					marginBottom: '15%'
				}}></div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}
