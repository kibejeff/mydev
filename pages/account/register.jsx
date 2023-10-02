import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Register from '~/components/partials/account/Register';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newsletters from '~/components/partials/commons/Newletters';
// import Newletters from '~/components/partials/commons/Newletters';

function RegisterPage() {
	const breadCrumb = [
		{
			text: 'Home',
			url: '/',
		},
		{
			text: 'Register an account',
		},
	];

	return (
		<>
			<PageContainer footer={<FooterDefault />} title='Register'>
				<BreadCrumb breacrumb={breadCrumb} />
				<div>
					<div
						style={{ background: '#f1f1f1' }}
						className='ps-page--my-account'
					>
							<Register />

						<hr style={{ border: '2px solid #f1f1f1' }} />
					</div>
				</div>
				<Newsletters layout='container' />
			</PageContainer>
		</>
	);
}

export default RegisterPage;
