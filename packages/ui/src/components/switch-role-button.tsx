'use client';

import React from 'react';
import { Button } from './button';
import { cn } from '../utils/cn';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

const switchRoleButtonVariants = cva('', {
	variants: {
		variant: {
			header: 'hidden md:flex',
			sheet: 'flex md:hidden',
			dropdown:
				'flex md:hidden border-none justify-start font-normal w-fit pl-2',
		},
	},
});

interface SwitchRoleButtonProps
	extends VariantProps<typeof switchRoleButtonVariants> {
	className?: string;
}

export function SwitchRoleButton({
	className,
	variant,
}: SwitchRoleButtonProps) {
	const pathname = usePathname();

	return (
		<Button
			asChild
			className={cn(switchRoleButtonVariants({ variant }), className, 'w-full')}
			variant={'outline'}
		>
			<Link href={pathname.includes('hosting') ? '/' : '/hosting'}>
				Switch to {pathname.includes('hosting') ? 'Buyer' : 'Hosting'}
			</Link>
		</Button>
	);
}
