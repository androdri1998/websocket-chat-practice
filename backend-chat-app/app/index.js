const express = require("express");
const { createServer } = require("node:http");
const helmet = require("helmet");
const cors = require("cors");

const config = require("./config");
const WebSocketProvider = require("./infra/providers/WebSocketProvider");
const UsersRepository = require("./infra/repositories/UsersRepository");
const { messages } = require("./constants/messages");
const LogProvider = require("./infra/providers/LogProvider");

const app = express();
const server = createServer(app);
const usersRepository = new UsersRepository();
const logProvider = new LogProvider();
const webSocketProvider = new WebSocketProvider({
  server,
  originUrl: config.frontendURL,
  usersRepository,
  logProvider: logProvider,
});

app.use(helmet());
app.use(express.json());
app.use(cors());

webSocketProvider.startListeners();

app.use((err, req, res, next) => {
  logProvider.error(err.message, err);
  res.json({ message: messages.errorDefault, error: err.statuCode });
  next(err);
});

module.exports = server;
