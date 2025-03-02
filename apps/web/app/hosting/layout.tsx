import {
	MapsProvider,
	StoreProvider,
	SessionAuthProvider,
	HeaderSkeleton,
} from '@instapark/ui';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
	title: 'Hosting - Instapark',
};

const HeaderMainDynamic = dynamic(
	() => import('@instapark/ui').then((mod) => mod.HeaderMain),
	{
		loading: () => <HeaderSkeleton />,
	},
);

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionAuthProvider>
			<StoreProvider>
				<MapsProvider>
					<main>
						<HeaderMainDynamic />
						{children}
					</main>
				</MapsProvider>
			</StoreProvider>
		</SessionAuthProvider>
	);
}
