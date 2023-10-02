import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import VendorCreateProduct from '~/components/partials/vendor/modules/VendorCreateProduct';
import FooterDefault from '~/components/shared/footers/FooterDefault';

export default function NewProduct() {
	const breadCrumb = [
		{
			text: 'Vendor',
			url: '/vendor/dashboard',
		},
        {
			text: 'Products',
			url: '/vendor/products',
		},
		{
			text: 'New Product',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='New Product'>
				<div className='ps-page--simple'>
					<BreadCrumb breacrumb={breadCrumb} />
					<VendorCreateProduct />
				</div>
				<div style={{
					marginBottom: '15%'
				}}></div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}
