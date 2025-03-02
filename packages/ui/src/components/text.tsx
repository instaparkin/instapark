import React from 'react';
import { cn } from '../utils/cn';

interface TextProps {
	text: string;
	className?: string;
}

const Text = ({ text, className }: TextProps) => {
	return <div className={cn(className)}>{text}</div>;
};

export { Text };
