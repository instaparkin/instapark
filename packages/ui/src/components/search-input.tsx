'use client';

import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from './input';
import { cn } from '../utils/cn';

const SearchInput = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ placeholder = 'Search...', className, ...props }, ref) => {
		return (
			<div className="relative w-full">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400" />
				<Input
					ref={ref}
					type="text"
					placeholder={placeholder}
					className={cn(
						'pl-10 pr-10 focus-visible:ring-0 focus-visible:ring-offset-0',
						className,
					)}
					{...props}
				/>
			</div>
		);
	},
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
