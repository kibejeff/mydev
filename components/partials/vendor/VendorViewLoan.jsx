import React from 'react';
import VendorNavbar from './modules/VendorNav';
import { Tabs } from 'antd';

function VendorViewLoan() {
	const { TabPane } = Tabs;

	function callback(key) {
		return true;
	}

	return (
		<>
			<div className='ps-page__content'>
				<VendorNavbar />
				<div className='container'>
					<div className='container py-5'>
						<div className='row'>
							<Tabs defaultActiveKey='1' onChange={callback}>
								<TabPane tab='Loan Overview' key='1'>
									Content of Tab Pane 1
								</TabPane>
								<TabPane tab='User profile' key='2'>
									Content of Tab Pane 2
								</TabPane>
								<TabPane tab='Additional Profile
                                 Details' key='3'>
									Content of Tab Pane 3
								</TabPane>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default VendorViewLoan;
