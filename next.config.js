/*
* Powerpay Africa - Appliances for The Next Billion
* Author: nouthemes
* Homepage: https://www.powerpayafrica.com
* */

const nextSettings = {
	optimizeFonts: false,
	// distDir: 'build next build && next export',
	// disable eslint
	eslint: {
		ignoreDuringBuilds: true,
	},
	// Change your site title here
	env: {
		title: 'Powerpay Africa',
		titleDescription: 'Appliances for The Next Billion',
	},
	async rewrites() {
		return [
			{
				source: '/home',
				destination: '/',
			},
		];
	},
};

module.exports = nextSettings;
