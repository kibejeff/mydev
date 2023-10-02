import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/features/user/userSlice';

export default function AccountLinks() {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const router = useRouter();
	const accountLinks = [
		{
			text: 'Account Information',
			url: '/account/user-information',
			icon: 'icon-user',
		},
		{
			text: 'Update Account',
			url: '/account/update-account',
			icon: 'icon-cog',
		},
		{
			text: 'Applications',
			url: '/account/applications',
			icon: 'icon-alarm-ringing',
		},
		{
			text: 'Invoices',
			url: '/account/invoices',
			icon: 'icon-papers',
		},
		// {
		//     text: 'Address',
		//     url: '/account/addresses',
		//     icon: 'icon-map-marker',
		// },
		{
			text: 'Recent Viewed Product',
			url: '/account/recent-viewed-product',
			icon: 'icon-store',
		},
		{
			text: 'Wishlist',
			url: '/account/wishlist',
			icon: 'icon-heart',
		},
	];

	const accountLinkView = accountLinks.map((item) => (
		<li key={item.text} className={router.pathname == item.url ? 'active' : ''}>
			<Link href={item.url}>
				<a>
					<i className={item.icon}></i>
					{item.text}
				</a>
			</Link>
		</li>
	));
	return (
		<aside className='ps-widget--account-dashboard'>
			<div className='ps-widget__header'>
				{/* <img width="55" height="55" src={user?.buyer.user_detail.avatar ? session.user.user_detail.avatar : "https://res.cloudinary.com/abzedmohammed/image/upload/v1670316789/defaults/default_black_mv0upm.png"} /> */}
				<figure>
					<h2>
						Hello,{' '}
						<span style={{ textTransform: 'capitalize' }}>
							{user?.first_name}
						</span>
					</h2>
					<p>{user?.email ? user?.email : null}</p>
				</figure>
			</div>
			<div className='ps-widget__content'>
				<ul className='ps-list--user-links'>
					{accountLinkView}
					<li>
						<a onClick={() => dispatch(logout())}>
							<i className='icon-power-switch'></i>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</aside>
	);
}
