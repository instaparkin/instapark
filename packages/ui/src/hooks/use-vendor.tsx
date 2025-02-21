import { useQuery } from "@apollo/client";
import { GET_VENDOR } from "../graphql/get-vendor";
import { Vendor } from "@instapark/types";

type UseVendorProps = {
    vendorId: string
}

export const useVendor = ({ vendorId }: UseVendorProps) => {
    const { data, loading, error } = useQuery(GET_VENDOR, {
        variables: {
            vendorId
        }
    });

    return {
        loading,
        error,
        isVendor: data?.VendorQuery?.getVendor?.vendor_id != null,
        vendorInfo: data?.VendorQuery?.getVendor as Vendor
    }
}