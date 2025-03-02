import {
	MapsProvider,
	StoreProvider,
	SessionAuthProvider,
	HeaderSkeleton,
} from '@instapark/ui';
import dynamic from 'next/dynamic';

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const HeaderMainDynamic = dynamic(
		() => import('@instapark/ui').then((mod) => mod.HeaderMain),
		{
			loading: () => <HeaderSkeleton />,
		},
	);

	return (
		<SessionAuthProvider>
			<StoreProvider>
				<MapsProvider>
					<HeaderMainDynamic />
					{children}
				</MapsProvider>
			</StoreProvider>
		</SessionAuthProvider>
	);
}
