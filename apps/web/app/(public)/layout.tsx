import { StoreProvider } from "@instapark/state";
import { HeaderPublic } from "@instapark/ui";

const PublicLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <div>
            <StoreProvider>
                <HeaderPublic />
                {children}
            </StoreProvider>
        </div>
    );
}

export default PublicLayout