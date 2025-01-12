import { kafka } from "../kafka/kafka";
import kafkaConfig from "../../kafka-config.json";
import { addListingToDB, listingsAddSchema, type ListingsAddType } from "@instapark/listings";
import { axios } from "@instapark/utils";

interface SearchConsumerProps {
    fromBeginning?: boolean;
}

export async function searchConsumer({ fromBeginning = false }: SearchConsumerProps) {
    const consumer = kafka.consumer({
        groupId: kafkaConfig.SEARCH_CONSUMER_GROUP,
    });

    try {
        await consumer.connect();
        await consumer.subscribe({
            topics: [kafkaConfig.SEARCH_TOPIC],
            fromBeginning,
        });

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const receivedFormData: ListingsAddType = JSON.parse(message.value?.toString() || '{}').data;

                    const formData = listingsAddSchema.safeParse(receivedFormData);

                    if (!formData.success) {
                        console.error("Invalid data format:", formData.error.message);
                        return;
                    }

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
                        photos
                    } = formData.data;

                    const listingTypesenseData = {
                        listingId,
                        userId,
                        isOpen,
                        createdAt: createdAt?.getTime(),
                        updatedAt: updatedAt?.getTime(),
                        type: place.type,
                        country: location.country,
                        state: location.state,
                        district: location.district,
                        city: location.city,
                        street: location.street,
                        pincode: location.pincode,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        name: location.name,
                        landmark: location.landmark,
                        basePrice: pricing.basePrice,
                        pphbi: pricing.pphbi,
                        pphcy: pricing.pphcy,
                        pphcr: pricing.pphcr,
                        plph: pricing.plph,
                        allowedVehicles: allowedVehicles.map(v => v.vehicle),
                        photos: photos.map(p => p.url)
                    };

                    try {
                        await Promise.all([
                            await addListingToDB(formData.data).then(() => {
                                console.log("Added to listings DB");
                            }).catch((error) => {
                                console.log("Failed to add to listings Db" + error);
                            }),
                            axios.post("http://localhost:8080/search/typesense/documents/add", {
                                collection: "listing_1",
                                data: listingTypesenseData
                            })
                        ]);
                    } catch (error) {
                        console.error("Error adding documents to Typesense:", error);
                    }
                } catch (error) {
                    console.error("Error processing message:", error);
                }
            },
        });
    } catch (error) {
        console.error("Error connecting to Kafka or subscribing to topics:", error);
    }
}
