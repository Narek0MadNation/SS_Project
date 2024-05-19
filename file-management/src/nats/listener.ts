import { connect, StringCodec, ConnectionOptions } from "nats";

const natsConfig: ConnectionOptions = {
  servers: "nats://localhost:30022",
  timeout: 10000,
  maxReconnectAttempts: 5,
  reconnectTimeWait: 2000,
  name: "NATS Listener",
  //   token:
  //     process.env.NATS_TOKEN ||
  //     "7a5a61f94e5cee8bdd6e4d61ae4c2df45da9357ffaa900351aeae68be6d9234b1363921667584bfc1f4480cf650edcdba4406e8b1500750269695019635eaacb",
};

export const startListener = async () => {
  let nc;

  try {
    nc = await connect(natsConfig);
    console.log("Listener connected to NATS");

    const sc = StringCodec();

    const sub = nc.subscribe("post:created", {
      queue: "post-service-queue-group",
      max: 100,
    });

    console.log("Listening for messages on 'post:created'", sub.getSubject());

    for await (const m of sub) {
      try {
        const data = JSON.parse(sc.decode(m.data));

        console.log("Received a message:", data);
      } catch (error) {
        console.error(`Error parsing message: ${error}`);
      } finally {
        m.respond();
      }
    }
  } catch (error) {
    // console.error("error ==>", error);

    console.error(`Error connecting to NATS: ${error}`);
  }
};
