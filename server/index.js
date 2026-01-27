const express = require("express");
const http = require("http");
const cors = require("cors");
const { WebSocketServer } = require("ws");

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Simple message broadcast for testing
wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === 1) {
        client.send(msg);
      }
    });
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`Pridra Excalidraw collab running on ${PORT}`));
