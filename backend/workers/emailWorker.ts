import { getRabbitMqChannel } from "../config/rabbitmq";

export const startEmailWorker = async ()=> {
    const channel = getRabbitMqChannel();
    await  channel.consume("emailQueue",async (msg : any)=>{
       if (!msg) return;
       try{
        const data = await JSON.parse(msg.content.toString());
        console.log("email job recieved")
        console.log(data)

        channel.ack(msg)
       }catch(error){
            console.log("failed to read msg :", error)
            channel.nack(msg,false,false)
       }

       console.log("email worker started ")


    })
}