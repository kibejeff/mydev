import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import VendorAgents from '~/components/partials/vendor/modules/VendorAgents';
import VendorProducts from '~/components/partials/vendor/modules/VendorProducts';
import FooterDefault from '~/components/shared/footers/FooterDefault';

export default function VendorAgentsList() {
	const breadCrumb = [
		{
			text: 'Vendor Dashboard',
			url: '/vendor/dashboard',
		},
		{
			text: 'Agents',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Dashboard'>
				<div className='ps-page--simple'>
					<BreadCrumb breacrumb={breadCrumb} />
					<VendorAgents />
				</div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}
