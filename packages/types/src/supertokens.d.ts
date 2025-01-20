export declare type User = {
    id: string;
    timeJoined: number;
    isPrimaryUser: boolean;
    tenantIds: string[];
    emails: string[];
    phoneNumbers: string[];
    thirdParty: {
        id: string;
        userId: string;
    }[];
    loginMethods: ("emailpassword" | "thirdparty" | "passwordless" & {
        verified: boolean;
        hasSameEmailAs: (email: string | undefined) => boolean;
        hasSamePhoneNumberAs: (phoneNumber: string | undefined) => boolean;
        hasSameThirdPartyInfoAs: (thirdParty?: { id: string; userId: string }) => boolean;
        toJson: () => any;
    })[];
    toJson: () => any;
};

export type AuthMetadata = {
    userId: string
    first_name: string
    last_name?: string
    preferred_first_name?: string
    emails: User["emails"]
    timeJoined: User["timeJoined"]
    phoneNumbers?: User["phoneNumbers"]
}

export type AuthMetadataRequest = Pick<AuthMetadata, "first_name" | "last_name" | "preferred_first_name">
