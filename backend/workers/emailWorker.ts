import { getRabbitMqChannel } from "../config/rabbitmq";
import { sendOTPEmail } from "../services/email-service";

export const startEmailWorker = async () => {
  const channel = getRabbitMqChannel();
  await channel.prefetch(5)
  console.log("email worker started")


  await channel.consume("emailQueue", async (msg: any) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());

      console.log("📧 Email job received",data);
      if(data.type === 'otp'){
        await sendOTPEmail(data.email ,data.otp)
      }
      channel.ack(msg);
    } catch (error) {
      console.error("Failed to process message:", error);

      channel.nack(msg, false, false);
    }
  });

  console.log("🚀 Email worker started");
};
