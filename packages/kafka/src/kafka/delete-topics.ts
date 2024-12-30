import { kafka } from "./kafka";

interface DeleteTopicsProps {
    topics: string[]
}

export async function deleteTopics({ topics }: DeleteTopicsProps) {
    const admin = kafka.admin();

    console.log("Connecting admin to kafka...");

    await admin.connect();

    console.log("Connected admin to kafka...");

    const topicsInKafka = await admin.listTopics();

    console.log("Topics in kafka: ", topicsInKafka);

    await admin.deleteTopics({
        topics: topics
    }).then(() => {
        topics.map(t => {
            console.log(t, "Deleted Successfully");
        })
    }).catch((error)=>{
        console.log("Failed to delete topics" + error);
    })

    await admin.disconnect();
}

deleteTopics({
    topics : ["listings-add-topic"]
})