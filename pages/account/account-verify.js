import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newsletters from '~/components/partials/commons/Newletters';
import PassVerify from '~/components/partials/account/PassVerify';

function AccountVerify() {
	const breadCrumb = [
		{
			text: 'Home',
			url: '/',
		},
		{
			text: 'Verify account',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Verify Account'>
				<BreadCrumb breacrumb={breadCrumb} />
				<div>
					<div
						style={{ background: '#f1f1f1' }}
						className='ps-page--my-account'
					>
							<PassVerify />

						<hr style={{ border: '2px solid #f1f1f1' }} />
					</div>
				</div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}

export default AccountVerify;
