import { VendorCreateFormType } from '../forms/vendor-create-form';
import { Group } from '../components/sidebar-form';

export const paymentDetailsSteps: Group<VendorCreateFormType>[] = [
	{
		title: 'Personal',
		description: 'You can change these details in the PROFILE section',
		fields: [
			{
				name: 'name',
				description:
					'Please enter your full legal name as per your official documents. This will be used for identification and verification purposes.',
				type: 'text',
				label: 'Name',
				readonly: true,
			},
			{
				name: 'phone',
				description:
					'Provide your active mobile number. Ensure that the number is valid and reachable, as it may be used for verification or future communication.',
				type: 'text',
				label: 'Phone Number',
				readonly: true,
			},
			{
				name: 'email',
				description:
					'Enter your primary email address. This email will be used for important updates, notifications, and future correspondence regarding your account.',
				type: 'email',
				label: 'Email',
				readonly: true,
			},
		],
	},
	{
		title: 'Bank',
		singleSubmit: true,
		fields: [
			{
				name: 'bank.account_holder',
				description:
					'Enter the full name of the account holder exactly as it appears in the bank records. Discrepancies may lead to transaction failures.',
				type: 'text',
				label: 'Account Holder Name',
			},
			{
				name: 'bank.account_number',
				description:
					'Provide your complete bank account number. Double-check the number to avoid any errors, as incorrect details may result in failed transactions.',
				type: 'text',
				label: 'Account Number',
			},
			{
				name: 'bank.ifsc',
				description:
					'Enter the IFSC (Indian Financial System Code) of your bank branch. This is an 11-character alphanumeric code used to identify your specific bank branch for electronic transactions.',
				type: 'text',
				label: 'IFSC Code',
			},
			{
				name: 'kyc_details.pan',
				description:
					'Provide your Permanent Account Number (PAN) issued by the Government of India. This is a mandatory requirement for financial transactions and identity verification.',
				type: 'text',
				label: 'Permanent Account Number (PAN)',
			},
		],
	},
];
