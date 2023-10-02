import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import VendorDashboard from '~/components/partials/vendor/VendorDashboard';
import FooterDefault from '~/components/shared/footers/FooterDefault';

export default function Dashboard() {
	const breadCrumb = [
		{
			text: 'Vendor',
			url: '/vendor/dashboard',
		},
		{
			text: 'Dashboard',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Dashboard'>
				<div className='ps-page--simple'>
					<BreadCrumb breacrumb={breadCrumb} />
					<VendorDashboard />
				</div>

				<div style={{
					marginBottom: '15%'
				}}>

				</div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}
