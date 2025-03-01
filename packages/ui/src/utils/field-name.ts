export function fieldName(name: string) {
    return (name.split(".").slice(-1)[0]
        ?.charAt(0).toUpperCase() as string +
        name.split(".").slice(-1)[0]?.slice(1))
}

export function formatPrice(value: number | string) {
    return `₹${value}`
}

export const formatLocation = (
    country?: string,
    state?: string,
    district?: string,
    city?: string,
    street?: string,
    pincode?: number,
    full: boolean = true
) => {
    if (full) {
        const parts = [street, city, district, state, country].filter(Boolean);
        return pincode !== undefined ? `${parts.join(", ")} - ${pincode}` : parts.join(", ");
    } else {
        const parts = [street, city].filter(Boolean);
        return parts.join(", ");
    }
};

export const formatAmount = (
    amount: number) => {
    return `₹ ${amount}`
}

export const formatName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`
}