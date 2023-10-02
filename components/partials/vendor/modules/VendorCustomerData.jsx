import React, { useEffect } from 'react';
import { logout } from '~/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AccountLinks from '../../account/modules/Accountlinks';
import { Collapse } from 'antd';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import { getBuyerProfile } from '~/features/vendor/vendorSlice';

const { Panel } = Collapse;

export default function VendorCustomerData() {
	const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
	const { customerInfo, loading, customerId } = useSelector(
		(state) => state.vendor,
	);
	const dispatch = useDispatch();
	const router = useRouter();

	async function handleCustomerData() {
		await dispatch(getBuyerProfile(customerId));
	}

	useEffect(() => {}, [customerInfo, customerId]);

	useEffect(() => {
		handleCustomerData();
	}, []);

	return (
		<section className='ps-my-account ps-page--account'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12'>
						{loading ? (
							<>
								<span className='loader'></span>
								<p>Loading. Please wait...</p>
							</>
						) : (
							<div className='ps-page__content'>
								<div className='container'>
									<div className='container'>
										<div className='row'>
											<div className='col-lg-4'>
												<div className='card mb-4'>
													<div className='card-body text-center'>
														<img
															width='150'
															height='150'
															src={
																customerInfo?.buyer?.avatar_url
																	? customerInfo?.buyer?.avatar_url
																	: 'https://res.cloudinary.com/abzedmohammed/image/upload/v1670316789/defaults/default_black_mv0upm.png'
															}
															alt='avatar'
															className='rounded-square img-fluid'
															style={{ objectFit: 'cover' }}
														/>
														<h4 className='my-3 text-capitalize'>
															{customerInfo?.buyer?.first_name
																? customerInfo?.buyer?.first_name
																: null}{' '}
															{customerInfo?.buyer?.last_name
																? customerInfo?.buyer?.last_name
																: null}
														</h4>

														<p className='text-muted mb-1'>
															<b>{customerInfo?.buyer?.phone}</b>
														</p>

														<p className='text-muted mb-1'>
															<b>{customerInfo?.buyer?.email}</b>
														</p>

														<p className='text-muted mb-4 text-capitalize'>
															<b>
																{customerInfo?.profile?.address
																	? customerInfo?.profile?.address
																	: 'Adress: N/A'}
																,{' '}
																{customerInfo?.profile?.county
																	? customerInfo?.profile?.county
																	: 'County: N/A'}
															</b>
														</p>
													</div>
												</div>
											</div>
											<div className='col-lg-8'>
												<Collapse defaultActiveKey={['1']} accordion>
													<Panel header='Personal Details' key='1'>
														{customerInfo?.profile?.id ? (
															<div className='mb-4'>
																<div className='card-body'>
																	<div className='row'>
																		<div className='col-sm-6'>
																			<p className='mb-0'>
																				<b>Joined ON</b>
																			</p>
																		</div>
																		<div className='col-sm-6'>
																			<p className='text-muted mb-0 text-left text-capitalize'>
																				{moment(
																					customerInfo?.buyer?.created_at,
																				).format('LLL')}
																			</p>
																		</div>
																	</div>
																	<hr />
																	<div className='row'>
																		<div className='col-sm-6'>
																			<p className='mb-0'>
																				<b>Highest Education</b>
																			</p>
																		</div>
																		<div className='col-sm-6'>
																			<p className='text-muted mb-0 text-left text-capitalize'>
																				{customerInfo?.profile?.education}
																			</p>
																		</div>
																	</div>
																	<hr />
																	<div className='row'>
																		<div className='col-sm-6'>
																			<p className='mb-0'>
																				<b>KPLC Number</b>
																			</p>
																		</div>
																		<div className='col-sm-6'>
																			<p className='text-muted mb-0 text-left text-capitalize'>
																				{customerInfo?.profile?.kplc_number
																					? customerInfo?.profile?.kplc_number
																					: 'N/A'}
																			</p>
																		</div>
																	</div>
																	<hr />
																	<div className='row'>
																		<div className='col-sm-6'>
																			<p className='mb-0'>
																				<b>Home Address</b>
																			</p>
																		</div>
																		<div className='col-sm-6'>
																			<p className='text-muted mb-0 text-left text-capitalize'>
																				{customerInfo?.profile?.address
																					? customerInfo?.profile?.address
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
																				{customerInfo?.profile?.landmark
																					? customerInfo?.profile?.landmark
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
																				{customerInfo?.profile?.county
																					? customerInfo?.profile?.county
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
																				{customerInfo?.profile?.sub_county
																					? customerInfo?.profile?.sub_county
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
																				{customerInfo?.profile?.marital_status
																					? customerInfo?.profile
																							?.marital_status
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
																				{customerInfo?.profile?.gender
																					? customerInfo?.profile?.gender
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
																				{customerInfo?.profile?.age
																					? customerInfo?.profile?.age
																					: 'N/A'}
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														) : null}
													</Panel>
													<Panel header='Employment Details' key='2'>
														<div className=' mb-4 mb-lg-0'>
															<div className='card-body p-2'>
																<div className='d-flex justify-content-between align-items-center p-3"'>
																	<h4 className='text-center my-3 pl-3'>
																		Employment Details
																	</h4>
																</div>
																<ul className='list-group list-group-flush rounded-3'>
																	{customerInfo?.employment_profile?.id ? (
																		<>
																			<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																				<p>
																					<b>Business/Company Name</b>
																				</p>
																				<p className='text-capitalize'>
																					{customerInfo?.employment_profile
																						?.employment_name
																						? customerInfo?.employment_profile
																								?.employment_name
																						: 'N/A'}
																				</p>
																			</li>

																			<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																				<p>
																					<b>Type of Employment</b>
																				</p>
																				<p className='text-capitalize'>
																					{customerInfo?.employment_profile
																						?.employment_type
																						? customerInfo?.employment_profile
																								?.employment_type
																						: 'N/A'}
																				</p>
																			</li>

																			<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																				<p>
																					<b>Position</b>
																				</p>
																				<p className='text-left'>
																					{customerInfo?.employment_profile
																						?.position
																						? customerInfo?.employment_profile
																								?.position
																						: 'N/A'}
																				</p>
																			</li>

																			<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																				<p>
																					<b>Office Location</b>
																				</p>
																				<p className='text-capitalize'>
																					{customerInfo?.employment_profile
																						?.office_address
																						? customerInfo?.employment_profile
																								?.office_address
																						: 'N/A'}
																				</p>
																			</li>

																			<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																				<p>
																					<b>KRA PIN</b>
																				</p>
																				<p className='text-capitalize'>
																					{customerInfo?.employment_profile
																						?.kra_pin
																						? customerInfo?.employment_profile
																								?.kra_pin
																						: 'N/A'}
																				</p>
																			</li>

																			<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																				<p>
																					<b>Monthly Income</b>
																				</p>
																				<p className='text-capitalize'>
																					KES{' '}
																					{customerInfo?.employment_profile
																						?.salary_range
																						? customerInfo?.employment_profile
																								?.salary_range
																						: 'N/A'}
																				</p>
																			</li>

																			<li className='list-group-item d-flex justify-content-between align-items-center p-3'>
																				<p>
																					<b>Bank</b>
																				</p>
																				<p className='text-capitalize'>
																					{customerInfo?.employment_profile
																						?.bank
																						? customerInfo?.employment_profile
																								?.bank
																						: 'No'}{' '}
																					Bank
																				</p>
																			</li>
																		</>
																	) : (
																		<p className='ml-3'>
																			Details not available
																		</p>
																	)}
																</ul>
															</div>
														</div>
													</Panel>
													<Panel header='Guarantors' key='3'>
														<div className='mb-4 mb-md-0'>
															<div className='card-body p-4'>
																<div className='d-flex justify-content-between align-items-center"'>
																	<h4 className='text-center my-3'>
																		Guarantors
																	</h4>
																</div>

																{customerInfo?.guarantors?.id ? (
																	<div>
																		<div className='row'>
																			<div className='col-sm-6'>
																				<p className='mb-0'>
																					<b>Full Name</b>
																				</p>
																			</div>
																			<div className='col-sm-6'>
																				<p className='text-muted mb-0 text-left'>
																					{customerInfo?.guarantors?.full_name
																						? customerInfo?.guarantors
																								?.full_name
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
																					{customerInfo?.guarantors?.phone
																						? customerInfo?.guarantors?.phone
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
																					{customerInfo?.guarantors?.id_number
																						? customerInfo?.guarantors
																								?.id_number
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
																					{customerInfo?.guarantors
																						?.relationship
																						? customerInfo?.guarantors
																								?.relationship
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
													</Panel>
												</Collapse>

												<div className='d-flex flex-wrap align-items-center mt-3'>
													<div className='d-flex flex-column'>
														<img
															style={{
																width: isMobile ? '100vw' : 'auto',
																objectFit: isMobile ? 'cover' : 'contain',
															}}
															height={170}
															src={
																customerInfo?.profile?.id_card
																	? customerInfo?.profile?.id_card
																	: 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
															}
															alt='ID Image'
														/>
														<span>National ID Card</span>
													</div>

													<div
														style={{
															margin: isMobile ? 0 : '0px 20px 0px',
														}}
														className='d-flex flex-column'
													>
														<img
															style={{
																width: isMobile ? '100vw' : 'auto',
																objectFit: isMobile ? 'cover' : 'contain',
															}}
															height={170}
															src={
																customerInfo?.profile?.mpesa_statement
																	? customerInfo?.profile?.mpesa_statement
																	: 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
															}
															alt='Mpesa Statement'
														/>
														<span>Mpesa Statement</span>
													</div>

													<div className='d-flex flex-column'>
														<img
															style={{
																width: isMobile ? '100vw' : 'auto',
																objectFit: isMobile ? 'cover' : 'contain',
															}}
															height={170}
															src={
																customerInfo?.profile?.bank_statement
																	? customerInfo?.profile?.bank_statement
																	: 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
															}
															alt='Bank Statement'
														/>
														<span>Bank Statement</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<br />
		</section>
	);
}
