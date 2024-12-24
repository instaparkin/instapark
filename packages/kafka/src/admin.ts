import { kafka } from "./client"
import { LISTINGS_ADD_TOPIC } from "./kafka-constants";

interface CreateTopicsUsingAdminProps {
    topic: string
    numPartitions: number
}

export async function createTopicsUsingAdmin({ topic, numPartitions }: CreateTopicsUsingAdminProps) {
    const admin = kafka.admin();

    console.log("Connecting admin to kafka...");

    await admin.connect();

    console.log("Connected admin to kafka...");

    const topicsInKafka = await admin.listTopics();

    console.log("Topics in kafka", topicsInKafka);

    await admin.createTopics({
         topics: [{
             topic: topic,
             numPartitions: numPartitions
         }]
     })

    console.log("Created Topic", topic, "successfully");
    
    await admin.disconnect();
}