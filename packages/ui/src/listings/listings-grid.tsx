import { Listing } from "@instapark/types";
import { Card, CardContent, CardFooter } from "../components/card";
import { ListingsImageSwiper } from "./listings-image-swiper";
import { Button } from "../components/button";
import { BikeIcon, Car, LucideProps } from "lucide-react";
import Link from "next/link";
import { ListingsWishlist } from "./listings-wishlist";
import { MdCyclone } from "react-icons/md";
import { Badge } from "../components/badge";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface ListingsGridProps {
    data: Listing[];
}

export const ListingsGrid = ({ data }: ListingsGridProps) => {
    const vehicleIcons: Record<
        string,
        ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    > = {
        Car: Car,
        Bike: BikeIcon,
        Cycle: MdCyclone,
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {data?.map((item) => (
                <Card key={item?.listingId} className="overflow-hidden">
                    <div className="relative aspect-[4/3]">
                        <ListingsImageSwiper content={item.photos} />
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-2 right-2 rounded-full"
                        >
                            <ListingsWishlist listingId={item.listingId} />
                        </Button>
                    </div>
                    <CardContent className="p-4">
                        <h2 className="font-semibold text-lg mb-1">
                            {item.city}, {item.state}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-2">
                            {item.city}, {item.state}
                        </p>
                        <p className="text-sm mt-2 flex gap-2">
                            {item.allowedVehicles.map((v) => {
                                const Icon = vehicleIcons[v];
                                return (
                                    <Badge key={v} className="flex items-center gap-1">
                                        {Icon && <Icon size={16} />}
                                        {v}
                                    </Badge>
                                );
                            })}
                        </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div>
                            <span className="font-semibold">${item.basePrice.toFixed(2)}</span> / hour
                        </div>
                        <Button variant="outline" asChild>
                            <Link href={`/parkings/${item.listingId}`}>
                                View Details
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};
