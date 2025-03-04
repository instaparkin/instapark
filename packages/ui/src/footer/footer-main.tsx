import React from 'react';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';

const legalLinks = [
	{ href: '/TermsandConditions.pdf', label: 'Terms and Conditions' },
	{ href: '/ContactUs.pdf', label: 'Contact Us' },
	{ href: '/RefundPolicy.pdf', label: 'Refund Policy' },
	{ href: '/privacy-policy', label: 'Privacy Policy' },
];

const companyLinks = [
	{ href: '/about-us', label: 'About' },
	{ href: '/contact-us', label: 'Contact' },
];

const socialLinks = [
	{
		href: 'https://www.linkedin.com/in/insta-park-b74178351/',
		label: 'LinkedIn',
		icon: <FaLinkedinIn size={18} />,
	},
	{
		href: 'https://x.com/Instapark2024',
		label: 'Twitter',
		icon: <FaXTwitter size={18} />,
	},
];

export function FooterMain() {
	return (
		<footer className="text-muted-foreground my-28 w-full border-t px-4 pt-12 md:px-6">
			<div className="container mx-auto max-w-5xl">
				<div className="grid grid-cols-1 gap-8 text-sm md:grid-cols-3">
					{/* Legal Links */}
					<div className="space-y-4">
						<h3 className="font-bold">Legal</h3>
						<ul className="space-y-2">
							{legalLinks.map((link, index) => (
								<li key={index}>
									<Link
										className="hover:text-accent-foreground transition-colors duration-200"
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Links */}
					<div className="space-y-4">
						<h3 className="font-bold">Company</h3>
						<ul className="space-y-2">
							{companyLinks.map((link, index) => (
								<li key={index}>
									<Link
										className="hover:text-accent-foreground transition-colors duration-200"
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Social Links */}
					<div className="space-y-4">
						<h3 className="font-bold">Social</h3>
						<ul className="space-y-2">
							{socialLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className="hover:text-accent-foreground flex items-center gap-2 transition-colors duration-200"
									>
										{link.icon}
										<span>{link.label}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
