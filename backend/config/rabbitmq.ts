import amqp from "amqplib";
 

let connection;
let channel : any;

export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL!);

    channel = await connection.createChannel();

    await channel.assertQueue("emailQueue", {
        durable : true,
    })

    console.log("✅RabbitMQ connected successfully");
    console.log("✅RabbitMQ channel created successfully");
    console.log("✅EmailQueue channel created successfully");
    



    return channel;
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }
};

export const getRabbitMqChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }

  return channel;
};
