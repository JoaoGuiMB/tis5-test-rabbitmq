require("dotenv").config("");
var amqp = require("amqplib/callback_api");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 9876;
const RABBITMQ_HOST = process.env.RABBITMQ_HOST || "amqp://localhost:5672";
app.listen(PORT);

app.post("/sendMessage", (req, res) => {
  amqp.connect("", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = "task_queue";
      var msg = process.env.MESSAGE || "Hello World!";

      channel.assertQueue(queue, {
        durable: true,
      });
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      });
      console.log(" [x] Sent '%s'", msg);
      return res.json({ message: msg });
    });
  });
});

app.use(express.json());

console.log(`Start server on port ${PORT}`);
