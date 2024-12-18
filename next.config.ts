import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.freepik.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'a-static.mlcdn.com.br',
			},
		],
	},
};

export default nextConfig;
