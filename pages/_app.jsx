import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import MasterLayout from '~/components/layouts/MasterLayout';
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '~/public/static/css/bootstrap.min.css';
import '~/public/static/css/slick.min.css';
import '~/scss/style.scss';
import '~/scss/home-default.scss';
import '~/scss/market-place-1.scss';
import '~/scss/market-place-2.scss';
import '~/scss/market-place-3.scss';
import '~/scss/market-place-4.scss';
import '~/scss/electronic.scss';
import '~/scss/furniture.scss';
import '~/scss/organic.scss';
import '~/scss/technology.scss';
import '~/scss/autopart.scss';
import '~/scss/electronic.scss';
import '~/scss/vendor/loan-view.scss';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store, persistor } from '~/app/store';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

function App({ Component, pageProps: { session, ...pageProps } }) {
	useEffect(() => {
		setTimeout(function () {
			document.getElementById('__next').classList.add('loaded');
		}, 100);
	});

	return (
		<>
			<Head>
				<title>Powerpay Africa | Appliances for The Next Billion</title>
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='format-detection' content='telephone=no' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='author' content='Abzed Mohammed' />
				<meta
					name='keywords'
					content='powerpay-africa, powerpayafrica, ending in kenya, loan on items'
				/>
				<meta
					name='description'
					content='Powerpay Africa - Appliances for The Next Billion'
				/>
			</Head>
			<SessionProvider session={session}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<CookiesProvider>
							<MasterLayout>
								<ToastContainer
									position='bottom-left'
									autoClose={3000}
									hideProgressBar={true}
									closeOnClick={true}
									pauseOnHover={false}
									draggable={false}
									progress={undefined}
									theme='colored'
								/>
								<Component {...pageProps} />
							</MasterLayout>
						</CookiesProvider>
					</PersistGate>
				</Provider>
			</SessionProvider>
		</>
	);
}

export default App;
