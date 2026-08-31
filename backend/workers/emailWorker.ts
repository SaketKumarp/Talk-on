import { connectRabbitMQ, getRabbitMqChannel } from "../config/rabbitmq";

 

export const startEmailWorker = async () => {
  await connectRabbitMQ();

  const channel = getRabbitMqChannel();

  await channel.consume("emailQueue", async (msg : any) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());

      console.log("📧 Email job received");
      console.log(data);

      channel.ack(msg);
    } catch (error) {
      console.error("Failed to process message:", error);

      channel.nack(msg, false, false);
    }
  });

  console.log("🚀 Email worker started");
};

startEmailWorker();
