import React, { useEffect } from 'react';
import AccountLinks from './modules/Accountlinks';
import { getBuyerProfile, logout } from '~/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function UserInformation() {
	const dispatch = useDispatch();
	const router = useRouter();

	const { user, isLoggedIn, buyer } = useSelector((state) => state.user);

	const [profile, setprofile] = useState(buyer);

	async function handleBuyerProfile() {
		const res = await dispatch(
			getBuyerProfile({
				user_id: user.id,
			}),
		);

		if (res?.payload?.results.length) {
			setprofile(res?.payload?.results[0]);
		}
	}

	useEffect(() => {
		handleBuyerProfile();
	}, []);

	useEffect(() => {}, [profile]);

	useEffect(() => {
		setprofile(buyer);
	}, [buyer]);

	if (!isLoggedIn) {
		setTimeout(() => {
			return router.push('/account/login');
		}, 100);
	}

	console.log(buyer);
	return (
		<section className='ps-my-account ps-page--account'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-3'>
						<div className='ps-section__left'>
							<AccountLinks />
						</div>
					</div>
					<div className='col-lg-9'>
						<div className='ps-page__content'>
							<div className='container'>
								<div className='container py-5'>
									<div className='row'>
										<div className='col-lg-4'>
											<div className='card mb-4'>
												<div className='card-body text-center'>
													<img
														width='150'
														height='150'
														src={
															user?.avatar_url
																? user?.avatar_url
																: 'https://res.cloudinary.com/abzedmohammed/image/upload/v1670316789/defaults/default_black_mv0upm.png'
														}
														alt='avatar'
														className='rounded-square img-fluid'
														style={{ objectFit: 'cover' }}
													/>
													<h4 className='my-3 text-capitalize'>
														{user?.first_name ? user?.first_name : null}{' '}
														{user?.last_name ? user?.last_name : null}
													</h4>
													<p className='text-muted mb-1 text-capitalize'>
														<b>
															{buyer?.employment_position
																? buyer?.employment_position
																: 'No work position specified'}
														</b>
													</p>
													<p className='text-muted mb-1'>
														<b>{user?.phone}</b>
													</p>
													<p className='text-muted mb-4 text-capitalize'>
														<b>
															{user?.address ? user?.address : 'Adress: N/A'},{' '}
															{user?.profile?.county
																? user?.profile?.county
																: 'County: N/A'}
														</b>
													</p>
													<div className='d-flex justify-content-center mb-2'>
														{!user?.has_employment_profile ||
														!user?.has_guarantor_profile ||
														!user?.accepts_terms ? (
															<Link href='/account/additional-account-info'>
																<a
																	style={{
																		backgroundColor: '#fcb800',
																		fontSize: '14px',
																	}}
																	className='p-2 text-white btn'
																>
																	Complete Profile
																</a>
															</Link>
														) : null}
													</div>
												</div>
											</div>
											<div className='card mb-4 mb-lg-0'>
												<div className='card-body p-2'>
													<div className='d-flex justify-content-between align-items-center p-3"'>
														<h4 className='text-center my-3 pl-3'>
															Employment Details
														</h4>
													</div>
													<ul className='list-group list-group-flush rounded-3'>
														{user?.has_employment_profile ? (
															<>
																<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																	<p>
																		<b>Employment Name</b>
																	</p>
																	<p className='text-capitalize'>
																		{buyer?.employment_name
																			? buyer?.employment_name
																			: 'N/A'}
																	</p>
																</li>

																<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																	<p>
																		<b>Position</b>
																	</p>
																	<p className='text-left'>
																		{buyer?.position
																			? buyer?.position
																			: 'N/A'}
																	</p>
																</li>

																<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																	<p>
																		<b>Office Location</b>
																	</p>
																	<p className='text-capitalize'>
																		{buyer?.office_address
																			? buyer?.office_address
																			: 'N/A'}
																	</p>
																</li>

																<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																	<p>
																		<b>KRA PIN</b>
																	</p>
																	<p className='text-capitalize'>
																		{buyer?.kra_pin
																			? buyer?.kra_pin
																			: 'N/A'}
																	</p>
																</li>

																<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																	<p>
																		<b>Bank</b>
																	</p>
																	<p className='text-capitalize'>
																		{buyer?.bank_name
																			? buyer?.bank_name
																			: 'No'}{' '}
																		Bank
																	</p>
																</li>
															</>
														) : (
															<p className='ml-3'>Details not available</p>
														)}
													</ul>
												</div>
											</div>
										</div>
										<div className='col-lg-5'>
											{user?.profile?.id ? (
												<div className='card mb-4'>
													<div className='card-body'>
														<div className='row'>
															<div className='col-sm-6'>
																<p className='mb-0'>
																	<b>KPLC Number</b>
																</p>
															</div>
															<div className='col-sm-6'>
																<p className='text-muted mb-0 text-left text-capitalize'>
																	{user?.profile?.kplc_number
																		? user?.profile?.kplc_number
																		: 'N/A'}
																</p>
															</div>
														</div>
														<hr />
														<div className='row'>
															<div className='col-sm-6'>
																<p className='mb-0'>
																	<b>Closest Landmark</b>
																</p>
															</div>
															<div className='col-sm-6'>
																<p className='text-muted mb-0 text-left text-capitalize'>
																	{user?.profile?.landmark
																		? user?.profile?.landmark
																		: 'N/A'}
																</p>
															</div>
														</div>
														<hr />

														<div className='row'>
															<div className='col-sm-6'>
																<p className='mb-0'>
																	<b>County</b>
																</p>
															</div>
															<div className='col-sm-6'>
																<p className='text-muted mb-0 text-left text-capitalize'>
																	{user?.profile?.county
																		? user?.profile?.county
																		: 'N/A'}
																</p>
															</div>
														</div>
														<hr />

														<div className='row'>
															<div className='col-sm-6'>
																<p className='mb-0'>
																	<b>Sub County</b>
																</p>
															</div>
															<div className='col-sm-6'>
																<p className='text-muted mb-0 text-left text-capitalize'>
																	{user?.profile?.sub_county
																		? user?.profile?.sub_county
																		: 'N/A'}
																</p>
															</div>
														</div>
														<hr />

														<div className='row'>
															<div className='col-sm-6'>
																<p className='mb-0'>
																	<b>Marital status</b>
																</p>
															</div>
															<div className='col-sm-6'>
																<p className='text-muted mb-0 text-left text-capitalize'>
																	{user?.profile?.marital_status
																		? user?.profile?.marital_status
																		: 'N/A'}
																</p>
															</div>
														</div>
														<hr />

														<div className='row'>
															<div className='col-sm-6'>
																<p className='mb-0'>
																	<b>Gender</b>
																</p>
															</div>
															<div className='col-sm-6'>
																<p className='text-muted mb-0 text-left text-capitalize'>
																	{user?.profile?.gender
																		? user?.profile?.gender
																		: 'N/A'}
																</p>
															</div>
														</div>
														<hr />

														<div className='row'>
															<div className='col-sm-6'>
																<p className='mb-0'>
																	<b>Age</b>
																</p>
															</div>
															<div className='col-sm-6'>
																<p className='text-muted mb-0 text-left text-capitalize'>
																	{user?.profile?.age
																		? user?.profile?.age
																		: 'N/A'}
																</p>
															</div>
														</div>
													</div>
												</div>
											) : null}
											<div className='row'>
												<div className='col-12'>
													<div className='card mb-4 mb-md-0'>
														<div className='card-body p-4'>
															<div className='d-flex justify-content-between align-items-center"'>
																<h4 className='text-center my-3'>Guarantors</h4>
																{user?.guarantors?.length ? (
																	<Link href='/account/employment-details/update'>
																		<a className='' style={{ color: 'blue' }}>
																			<u>Edit</u>
																		</a>
																	</Link>
																) : null}
															</div>

															{user?.has_guarantor_profile ? (
																<div>
																	<div className='row'>
																		<div className='col-sm-6'>
																			<p className='mb-0'>
																				<b>Full Name</b>
																			</p>
																		</div>
																		<div className='col-sm-6'>
																			<p className='text-muted mb-0 text-left'>
																				{buyer?.guarantor_full_name
																					? buyer?.guarantor_full_name
																					: 'N/A'}
																			</p>
																		</div>
																	</div>
																	<div className='row'>
																		<div className='col-sm-6'>
																			<p className='mb-0'>
																				<b>Phone Number</b>
																			</p>
																		</div>
																		<div className='col-sm-6'>
																			<p className='text-muted mb-0 text-left'>
																				{buyer?.guarantor_phone
																					? buyer?.guarantor_phone
																					: 'N/A'}
																			</p>
																		</div>
																	</div>
																	<div className='row'>
																		<div className='col-sm-6'>
																			<p className='mb-0'>
																				<b>ID Number</b>
																			</p>
																		</div>
																		<div className='col-sm-6'>
																			<p className='text-muted mb-0 text-left'>
																				{buyer?.guarantor_id_number
																					? buyer?.guarantor_id_number
																					: 'N/A'}
																			</p>
																		</div>
																	</div>
																	<div className='row'>
																		<div className='col-sm-6'>
																			<p className='mb-0'>
																				<b>Relationship</b>
																			</p>
																		</div>
																		<div className='col-sm-6'>
																			<p className='text-muted mb-0 text-left'>
																				{buyer?.guarantor_relationship
																					? buyer?.guarantor_relationship
																					: 'N/A'}
																			</p>
																		</div>
																	</div>
																	<hr />
																</div>
															) : (
																<p>Details not available</p>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br />
		</section>
	);
}
