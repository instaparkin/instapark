'use client';

import React from 'react';
import { Button } from '../components/button';
import { redirect } from 'next/navigation';
import { signOut } from 'supertokens-auth-react/recipe/session';

interface SignOutButtonProps {
	text?: string;
}

export const SignOutButton = ({ text = 'Sign out' }: SignOutButtonProps) => {
	const handleSignOut = () => {
		signOut();
		redirect('/auth');
	};

	return (
		<Button
			size={'icon'}
			onClick={handleSignOut}
			className="dark:hover:bg-destructive flex w-full justify-start border-red-500 pl-2 text-red-500 hover:bg-red-50 hover:text-red-500"
			variant={'ghost'}
		>
			{text}
		</Button>
	);
};
