'use client';

import { Page } from '@instapark/ui';
import Image from 'next/image';

export default function AboutUsPage() {
	return (
		<Page>
			<div className="min-h-screen">
				{/* Header Section - Hero Like Vercel */}
				<header className="from-instapark text-background dark:bg-background w-full bg-gradient-to-r to-blue-500 py-32 text-center">
					<div className="mx-auto max-w-4xl px-6">
						<h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
							Instapark
						</h1>
						<p className="text-xl">Just park it.</p>
					</div>
				</header>

				<main className="mx-auto max-w-6xl py-16">
					{/* Heading Section */}
					<div className="mb-16 text-center">
						<h2 className="text-3xl font-bold sm:text-4xl">
							How Instapark works?
						</h2>
						<p className="mt-2 text-lg text-gray-400">
							Your complete guide to our parking booking process
						</p>
					</div>

					{/* Steps - Styled like Vercel's Cards */}
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								title: 'Host Registration',
								description:
									'Hosts sign up on InstaPark and provide their payment details. After verification, they can list their parking spaces.',
								image:
									'https://utfs.io/f/DTCR05MWPf1vV5Y7UWumvW5DGPrCbdfsJQ7X3BO0EtjAlUqR',
							},
							{
								title: 'Browsing Spots',
								description:
									'Buyers can browse available listings from the homepage, filtering by location, price, and amenities.',
								image:
									'https://utfs.io/f/DTCR05MWPf1v933iyzk3CjFIY40tDoaKkQdAJTz5VXhmyUiq',
							},
							{
								title: 'Reserve',
								description:
									'After selecting a spot, the buyer makes an initial payment to reserve the spot for the selected duration.',
								image:
									'https://utfs.io/f/DTCR05MWPf1vDssOo0MWPf1vnLFGwyAkBhQO2Ul3CzNID6rc',
							},
							{
								title: 'OTP Verification',
								description:
									"The buyer arrives at the host's location and shares the OTP with the host for verification.",
								image:
									'https://utfs.io/f/DTCR05MWPf1v8n3OUUWSRaNg4UHEk2vhTW0s3715VAKFjxcM',
							},
							{
								title: 'Park Your Vehicle',
								description:
									'Once the verification is done you can now safely park you vehicle for the duration you had booked initially',
								image:
									'https://utfs.io/f/DTCR05MWPf1v4u0WnQ8ob0BAtlnWv1urj7yPizYZxcNaqGgh',
							},
							{
								title: 'Final Payment',
								description:
									'After the booked duration is completed, you can make the final payment and complete your trip with instapark',
								image:
									'https://utfs.io/f/DTCR05MWPf1vgyojpkqQwoHk6FGdcP1hC0f5VKRe7jTtig4s',
							},
						].map((step, index) => (
							<div
								key={index}
								className="hover:border-instapark rounded-lg border p-6 transition-all"
							>
								<div className="h-[200px] w-full overflow-hidden rounded-lg">
									<Image
										src={step.image}
										width={300}
										height={200}
										alt={step.title}
										className="h-full w-full object-cover"
									/>
								</div>
								<h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
								<p className="mt-2 text-gray-400">{step.description}</p>
							</div>
						))}
					</div>
				</main>
			</div>
		</Page>
	);
}
