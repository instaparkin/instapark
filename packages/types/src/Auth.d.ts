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