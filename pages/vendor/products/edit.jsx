import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import VendorEditProduct from '~/components/partials/vendor/modules/VendorEditProduct';
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
			text: 'Edit Product',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Edit Product'>
				<div className='ps-page--simple'>
					<BreadCrumb breacrumb={breadCrumb} />
					<VendorEditProduct />
				</div>
				<div style={{
					marginBottom: '15%'
				}}></div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}
