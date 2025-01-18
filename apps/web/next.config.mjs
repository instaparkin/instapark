/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
			},
			{
				protocol: 'https',
				hostname: 'example.com',
			},
      {
				protocol: 'https',
				hostname: 'j44q34msba.ufs.sh',
			},
		],
	},
};

export default nextConfig;
