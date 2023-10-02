import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import VendorLoansManagement from '~/components/partials/vendor/modules/VendorLoansManagement';
import FooterDefault from '~/components/shared/footers/FooterDefault';

export default function VendorProductsList() {
	const breadCrumb = [
		{
			text: 'Vendor',
			url: '/vendor/dashboard',
		},
		{
			text: 'Loans Management',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Loans Management'>
				<div className='ps-page--simple'>
					<BreadCrumb breacrumb={breadCrumb} />
					<VendorLoansManagement />
				</div>
				<div
					style={{
						marginBottom: '15%',
					}}
				></div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}
