'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { frontendConfig, setRouter } from '../auth/frontend-config';
import { init, SuperTokensWrapper } from 'supertokens-auth-react';

if (typeof window !== 'undefined') {
	init(frontendConfig());
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	setRouter(useRouter(), usePathname() || window.location.pathname);

	return (
		<SuperTokensWrapper>
			<>{children}</>
		</SuperTokensWrapper>
	);
};
