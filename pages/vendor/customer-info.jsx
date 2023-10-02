import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import VendorCustomerData from '~/components/partials/vendor/modules/VendorCustomerData';
import FooterDefault from '~/components/shared/footers/FooterDefault';

export default function CustomerInformation() {
	const breadCrumb = [
		{
			text: 'Vendor',
			url: '/vendor/dashboard',
		},
		{
			text: 'Customer Information',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Customer Info'>
				<div className='ps-page--simple'>
					<BreadCrumb breacrumb={breadCrumb} />
					<VendorCustomerData />
				</div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}
