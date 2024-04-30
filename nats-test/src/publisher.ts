import { connect, StringCodec, ConnectionOptions } from "nats";

const natsConfig: ConnectionOptions = {
  servers: "nats://localhost:30022",
  timeout: 10000,
  maxReconnectAttempts: 5,
  reconnectTimeWait: 2000,
  name: "NATS Publisher",
  // token: process.env.NATS_TOKEN || "GFjhhg35543FGFhggh#$hgffg",
};

const startPublisher = async () => {
  let nc;

  try {
    nc = await connect(natsConfig);
    const js = nc.jetstream();

    console.log("Publisher connected to NATS");

    const data = {
      id: "123",
      title: "My first post title",
      content: "My first post content",
    };

    const sc = StringCodec();

    const pubAck = await js.publish(
      "post:created",
      sc.encode(JSON.stringify(data))
    );

    console.log("Published message with sequence number", pubAck.seq);
  } catch (err) {
    console.log(err);

    console.error(`Error connecting to NATS: ${err}`);
  } finally {
    if (nc) {
      try {
        const done = nc.closed();

        await nc.close();

        const err = await done;
        if (err) {
          console.error(`Error closing NATS connection: ${err}`);
        }

        console.log("NATS connection closed.");
      } catch (error) {
        console.error(`Error closing NATS connection: ${error}`);
      }
    }
  }
};

startPublisher();
