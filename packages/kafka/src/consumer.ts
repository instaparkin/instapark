import { kafka } from "./client";
import { addDocumentToTypesense } from "./create-document";

interface ConsumeMessagesProps {
    groupId: string
    topics: (string | RegExp)[]
    fromBeginning: boolean
}

export async function consumeMessages({ groupId, topics, fromBeginning }: ConsumeMessagesProps) {
    const consumer = kafka.consumer({ groupId });
    console.log("Connecting consumer to Kafka");

    await consumer.connect();
    console.log("Connected consumer to Kafka");

    console.log("Subscribing to topic(s)", topics);
    await consumer.subscribe({ topics, fromBeginning });
    console.log("Subscription successful");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const formData = JSON.parse(message.value?.toString() as string).data;

            console.log("Parsed formData:", formData);

            const {
                listingId,
                userId,
                createdAt,
                updatedAt,
                isOpen,
                pricing,
                location,
                allowedVehicles,
                place,
            } = formData;

            const createdAtFormatted = new Date(createdAt).getTime()
            const updatedAtFormatted = new Date(updatedAt).getTime()
            const listingData = {
                listingId,
                userId,
                createdAt: createdAtFormatted,
                updatedAt: updatedAtFormatted,
                isOpen,
            };

            const pricingData = {
                pricingId: pricing.pricingId,
                basePrice: pricing.basePrice,
                pphbi: pricing.pphbi,
                pphcy: pricing.pphcy,
                pphcr: pricing.pphcr,
                plph: pricing.plph,
            };

            const locationData = {
                locationId: location.locationId,
                country: location.country,
                state: location.state,
                district: location.district,
                latitude : location.latitude,
                longitude: location.longitude,
                city: location.city,
                street: location.street,
                pincode: location.pincode,
                name: location.name,
                landmark: location.landmark,
                createdAt: new Date(location.createdAt).getTime(),
                updatedAt: new Date(location.updatedAt).getTime(),
            };

            const allowedVehiclesData = allowedVehicles.map((vehicle: any) => ({
                id: vehicle.id,
                listingId: vehicle.listingId,
                vehicle: vehicle.vehicle,
            }));

            const placeData = {
                placeId: place.placeId,
                type: place.type,
            };

            /**
             * Add data to Typesense collections.
             */
            addDocumentToTypesense({ collection: "listings_1", data: listingData });
            addDocumentToTypesense({ collection: "pricing_1", data: pricingData });
            addDocumentToTypesense({ collection: "places_1", data: placeData });
            addDocumentToTypesense({ collection: "location_1", data: locationData });

            allowedVehiclesData.forEach((vehicle: any) => {
                addDocumentToTypesense({ collection: "allowed_vehicles_1", data: vehicle });
            });
        },
    });
}
