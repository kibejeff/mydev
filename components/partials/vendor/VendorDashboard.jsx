import React, { useEffect, useState } from 'react';
import VendorNavbar from './modules/VendorNav';
import VendorDashboardCard from './modules/VendorDashboardCard';
import VendorDashboardRequests from './modules/VendorDashboardRequests';
import VendorActiveLoans from './modules/VendorActiveLoans';
import VendorRejectedLoans from './modules/VenorRejectedLoans';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchMyProducts,
	fetchVendorCheckoutProducts,
	getVendorActiveLoans,
	getVendorAgents,
	getVendorInventories,
	getVendorPendingDepositLoans,
	getVendorPendingLoans,
	getVendorProfile,
} from '~/features/vendor/vendorSlice';
import { useRouter } from 'next/router';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import VendorSideNav from './modules/VendorSideNav';
import VendorInventoryManagement from './modules/VendorInventoryManagement';

function VendorDashboard() {
	const { user, isLoggedIn } = useSelector((state) => state.user);
	const { vendorAgents, inventory, pendingLoans, pendingDepositLoans, activeLoans, vendor } = useSelector((state) => state.vendor);
	const dispatch = useDispatch();
	const router = useRouter();

	const [data, setdata] = useState(inventory)
	const [userData, setuserData] = useState(vendorAgents)
	const [loanPending, setloanPending] = useState(pendingLoans)
	const [loanDepositPending, setloanDepositPending] = useState(pendingDepositLoans)
	const [loanActive, setloanActive] = useState(activeLoans)

	async function handleGetVendorProfile(){
		const res = await dispatch(getVendorProfile(user?.id))
		if (res?.payload?.results?.length) {
			const resp = await dispatch(getVendorInventories(res.payload?.results[0].id))
			
			if (resp?.payload?.results?.length) {
				setdata(resp?.payload?.results)
			}
		}
		handleGetVendorPendingLoans()
		handleGetVendorActiveLoans()
		handleGetVendorPendingDepositLoans()
	}

	async function handleGetVendorAgents() {
		const res = await dispatch(getVendorAgents(user.id));
		if (res?.payload?.results?.length) {
			setuserData(res?.payload?.results);
		}
	}

	async function handleGetVendorPendingLoans() {
		const res = await dispatch(getVendorPendingLoans(vendor.id));
		if (res?.payload?.results?.length) {
			setloanPending(res?.payload?.results);
		}
	}

	async function handleGetVendorActiveLoans() {
		const res = await dispatch(getVendorActiveLoans(vendor.id));
		if (res?.payload?.results?.length) {
			setloanActive(res?.payload?.results);
		}
	}

	async function handleGetVendorPendingDepositLoans() {
		const res = await dispatch(getVendorPendingDepositLoans(vendor.id));
		if (res?.payload?.results?.length) {
			setloanDepositPending(res?.payload?.results);
		}
	}

	useEffect(() => {
		handleGetVendorProfile()
		handleGetVendorAgents()
	}, []);

	useEffect(() => {
		setdata(inventory)
	}, [inventory]);

	useEffect(() => {
		setuserData(vendorAgents)
	}, [vendorAgents]);

	useEffect(() => {
		setloanPending(pendingLoans)
	}, [pendingLoans]);

	useEffect(() => {
		setloanDepositPending(pendingDepositLoans)
	}, [pendingDepositLoans]);

	useEffect(() => {
		setloanActive(activeLoans)
	}, [activeLoans]);

	useEffect(() => {
	}, [data, userData, loanActive, loanDepositPending, loanPending]);

	if (!isLoggedIn) {
		router.push('/account/login');
	}

	if (!user?.is_vendor) {
		router.push('/');
	}

	return (
		<>
			<div className='ps-vendor-dashboard ps-vendor-margin'>
				<div className='container'>
					<div className='ps-section__content'>
						<div className='mb-5'>
							<VendorDashboardCard loanPending={loanPending} loanActive={loanActive} userData={userData} data={data} />
						</div>

						<div>
							<VendorInventoryManagement data={data} />
						</div>

						{/* <div>
							<VendorDashboardRequests />
						</div>

						<div>
							<VendorActiveLoans />
						</div>

						<div>
							<VendorRejectedLoans />
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default VendorDashboard;
