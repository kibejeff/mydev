import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import VendorProducts from '~/components/partials/vendor/modules/VendorProducts';
import FooterDefault from '~/components/shared/footers/FooterDefault';

export default function VendorProductsList() {
	const breadCrumb = [
		{
			text: 'Vendor Dashboard',
			url: '/vendor/dashboard',
		},
		{
			text: 'Inventory Products',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Dashboard'>
				<div className='ps-page--simple'>
					<BreadCrumb breacrumb={breadCrumb} />
					<VendorProducts />
				</div>
				<div style={{
					marginBottom: '15%'
				}}></div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}
