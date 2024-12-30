import { kafka } from "./kafka";

interface CreateTopicsUsingAdminProps {
    topic: string
    numPartitions: number
}

export async function createTopic({ topic, numPartitions }: CreateTopicsUsingAdminProps) {
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
    }).then(() => {
        console.log("Created Topic", topic, "successfully");
    }).catch(() => {
        console.log("Failed to create Topic", topic);
    })

    await admin.disconnect();
}