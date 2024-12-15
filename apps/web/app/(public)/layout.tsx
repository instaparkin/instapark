import { HeaderPublic } from "@instapark/ui";

const PublicLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <>
            <HeaderPublic />
            {children}
        </>
    );
}

export default PublicLayout