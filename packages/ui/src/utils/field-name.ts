export function fieldName(name: string) {
    return (name.split(".").slice(-1)[0]
        ?.charAt(0).toUpperCase() as string +
        name.split(".").slice(-1)[0]?.slice(1))
}

export function formatPrice(value: number) {
    return `₹${value}`
}