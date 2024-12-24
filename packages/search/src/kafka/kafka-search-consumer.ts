"use server";

import { Consumer, Kafka } from "kafkajs";
import { addDocumentToTypesense } from "../typesense/add-documents";
import config from "../typesense/config.json";
import { ListingsAddType } from "@instapark/listings";

let kafkaConsumer: Consumer | null = null;

async function initConsumer() {
  if (kafkaConsumer) return kafkaConsumer;

  const kafka = new Kafka({
    clientId: "instapark",
    brokers: ["localhost:9092"],
  });

  const consumer = kafka.consumer({
    groupId: "listings-add-group",
  });

  await consumer.connect();
  kafkaConsumer = consumer;
  return kafkaConsumer;
}

const processAndAddToTypesense = async <T extends Record<string, unknown>>(
  collection: string,
  data: T[]
) => {
  try {
    await addDocumentToTypesense({ collection, data });
  } catch (error) {
    console.error(`Error adding to collection ${collection}:`, error);
  }
};

export async function consumeMessage() {
  try {
    const consumer = await initConsumer();

    await consumer.subscribe({
      topic: "listings-add-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const messageValue = JSON.parse(message?.value?.toString() as string);
          const formData = JSON.parse(message.value?.toString() as string).data
          console.log({
            message: "Message Reveived from server",
            key: message.key?.toString(),
            value: formData,
            headers: message.headers,
          })

          if (messageValue.type === 'POST') {
            const listing = messageValue.data;

            // Add Listing Data
            await processAndAddToTypesense(config.schemas.LISTING_SCHEMA_NAME, [{
              listingId: listing.listingId,
              userId: listing.userId,
              isOpen: listing.isOpen,
              createdAt: listing.createdAt,
              updatedAt: listing.updatedAt,
            }]);

            // Add Location Data
            await processAndAddToTypesense(config.schemas.LOCATION_SCHEMA_NAME, [listing.location]);

            // Add Place Data
            await processAndAddToTypesense(config.schemas.PLACE_SCHEMA_NAME, [listing.place]);

            // Add Pricing Data
            await processAndAddToTypesense(config.schemas.PRICING_SCHEMA_NAME, [listing.pricing]);

            // Add Allowed Vehicles Data
            if (Array.isArray(listing.allowedVehicles)) {
              await processAndAddToTypesense(config.schemas.ALLOWED_VEHICLES_SCHEMA_NAME, listing.allowedVehicles);
            }

            console.log('All data added to Typesense successfully');
          } else {
            console.warn('Unhandled message type:', messageValue.type);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });
  } catch (error) {
    console.error("Error consuming messages:", error);
    throw error;
  }
}
