import { Kafka } from "kafkajs";
import dataStorage from "./dataStorage.js";

// kafka client
const kafka = new Kafka({
  clientId: "simple-producer-consumer-application",
  //brokers: ["broker:29092"],
  brokers: ["localhost:9092"]
  
});

const startConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "simple-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "messages", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      
      const responseMessage = await dataStorage(JSON.parse(message.value))
      console.log({
        responseMessage,
        topic,
        partition,
      });
    },
  });
};


export default startConsumer;