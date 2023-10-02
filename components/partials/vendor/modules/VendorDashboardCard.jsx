import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';
import {
	ArrowUpOutlined,
	DislikeOutlined,
	LikeOutlined,
	ShoppingCartOutlined,
	StarOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

export default function VendorDashboardCard({ data, userData, loanPending, loanActive }) {
	const { vendorProducts, myProducts } = useSelector((state) => state.vendor);
	const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
	const router = useRouter()

	let productsCountArr = [];

	data.forEach((item) => {
		item?.products_id.map((x) => {
			productsCountArr.push(x);
		});
	});


	return (
		<>
			<Row flex='column' gutter={16}>
				<Col sm={24} xs={24} md={12} lg={8} xl={8}>
					<Statistic
						className='ps-vendor__cards'
						title='Inventories'
						value={data?.length}
					/>
				</Col>

				<Col sm={24} xs={24} md={12} lg={8} xl={8}>
					<Statistic
						className='ps-vendor__cards'
						title='Total Products'
						value={productsCountArr.length}
					/>
				</Col>

				<Col sm={24} xs={24} md={24} lg={8} xl={8}>
					<Statistic
						className='ps-vendor__cards'
						title='My Agents'
						value={userData?.length}
					/>
				</Col>
			</Row>

			<Row gutter={16} className='mt-5'>
				<Col span={12}>
					<Statistic title='Active Loans' value={loanActive?.length} />
				</Col>
				<Col span={12}>
					<Statistic
						title='Pending Approvals'
						value={loanPending?.length}
					/>
					<Button onClick={() => router.push("/vendor/loans-management")} style={{ marginTop: 16 }} type='primary'>
						View All
					</Button>
				</Col>
			</Row>

			{/* <Row className='mt-5' flex='column' gutter={16}>
				<Col sm={24} xs={24} md={12} lg={12} xl={12}>
					<Statistic
						className='ps-vendor__cards'
						title='Active '
						value={data?.length}
						prefix={<button>View All</button>}
					/>
				</Col>

				<Col sm={24} xs={24} md={12} lg={12} xl={12}>
					<Statistic
						className='ps-vendor__cards'
						title='Pending Approvals'
						value={productsCountArr.length}
					/>
				</Col>
			</Row> */}

			{/* {isMobile ? null : (
				<Row className='mt-5' gutter={16}>
					<Col
						sm={12}
						xs={12}
						md={6}
						lg={6}
						xl={6}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#4caf50',
							padding: '10px',
							height: '100px',
						}}
					>
						<Statistic
							valueStyle={{
								color: '#fff',
								fontWeight: 700,
								fontSize: '16px',
							}}
							className=''
							// title='Active Loans'
							value={activeLoans?.length + ' Active loan(s)'}
						/>
					</Col>

					<Col
						sm={12}
						xs={12}
						md={6}
						lg={6}
						xl={6}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#ff3d00',
							padding: '10px',
							height: '100px',
						}}
					>
						<Statistic
							valueStyle={{
								color: '#fff',
								fontWeight: 700,
								fontSize: '16px',
							}}
							className=''
							// title='Active Loans'
							value={rejectedLoans?.length + ' Rejected loan(s)'}
						/>
					</Col>

					<Col
						sm={12}
						xs={12}
						md={6}
						lg={6}
						xl={6}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#fcb800',
							padding: '10px',
							height: '100px',
						}}
					>
						<Statistic
							valueStyle={{
								color: '#fff',
								fontWeight: 700,
								fontSize: '16px',
							}}
							className=''
							// title='Active Loans'
							value={'0 Average Rating(s)'}
							prefix={<StarOutlined />}
						/>
					</Col>

					<Col
						sm={12}
						xs={12}
						md={6}
						lg={6}
						xl={6}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#000',
							padding: '10px',
							height: '100px',
						}}
					>
						<Statistic
							valueStyle={{
								color: '#fff',
								fontWeight: 700,
								fontSize: '16px',
							}}
							className=''
							value={'0 Product Rating(s)'}
							prefix={<LikeOutlined />}
						/>
					</Col>
				</Row>
			)} */}
		</>
	);
}
