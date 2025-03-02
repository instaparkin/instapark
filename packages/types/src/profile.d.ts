export type Profile = {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	timeJoined: number;
	phoneNumber: string;
	kyc: {
		uidai?: string;
		verified: boolean;
	};
	country?: string;
	state?: string;
	district?: string;
	city?: string;
	street?: string;
	pincode?: number;
	name?: string;
	landmark?: string;
};

export type ProfileRequest = Omit<
	Profile,
	'userId' | 'kyc' | 'firstName' | 'lastName' | 'email' | 'timeJoined'
> & {
	kyc: Pick<Profile['kyc'], 'uidai'>;
};
