import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Form, Input, Radio, DatePicker } from 'antd';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableNotifications from './modules/TableNotifications';
import AccountLinks from './modules/Accountlinks';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/features/user/userSlice';
import { getUserCheckouts } from '~/features/products/productSlice';
import { useRouter } from 'next/router';

export default function Applications() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { userCheckouts } = useSelector((state) => state.products);
	const { user, isLoggedIn } = useSelector((state) => state.user);
	const { loading } = useSelector((state) => state.products);

	const [data, setdata] = useState(userCheckouts);

	async function handlefetchUserOrders() {
		const res = await dispatch(getUserCheckouts(Number(user?.id)));
		if (res?.payload?.results.length) {
			setdata(res?.payload?.results);
		}
	}

	useEffect(() => {
		handlefetchUserOrders();
	}, []);

	useEffect(() => {}, [data]);

	useEffect(() => {
		setdata(userCheckouts);
	}, [userCheckouts]);

	if (!isLoggedIn) {
		return router.push('/account/login');
	}
	return (
		<section className='ps-my-account ps-page--account'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-4'>
						<div className='ps-section__left'>
							<aside className='ps-widget--account-dashboard'>
								{/* <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" />
                                    <figure>
                                        <figcaption>Hello</figcaption>
                                        <p>username@gmail.com</p>
                                    </figure>
                                </div> */}
								<div className='ps-widget__content'>
									<ul className='ps-list--user-links'>
										{<AccountLinks active={true} />}
									</ul>
								</div>
							</aside>
						</div>
					</div>
					<div className='col-lg-8'>
						<div className='ps-page__content'>
							<div className='ps-section--account-setting'>
								<div className='ps-section__header'>
									<h3>Applications</h3>
								</div>
								<div className='ps-section__content'>
									{loading ? (
										<button
											disabled
											id='page-one-btn'
											htmlType='button'
											className='btn-auth mt-3'
										>
											<span className='bnt-auth-text loader'></span>
										</button>
									) : (
										<TableNotifications data={data} />
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
