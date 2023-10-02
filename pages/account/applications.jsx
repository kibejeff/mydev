import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Applications from '~/components/partials/account/Applications';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

const AccountNotificationsPage = () => {
	const breadCrumb = [
		{
			text: 'Home',
			url: '/',
		},
		{
			text: 'Applications',
		},
	];
	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Applications'>
				<div className='ps-page--my-account'>
					<BreadCrumb breacrumb={breadCrumb} />
					<Applications />
				</div>
				<Newletters layout='container' />
			</PageContainer>
		</>
	);
};

export default AccountNotificationsPage;
