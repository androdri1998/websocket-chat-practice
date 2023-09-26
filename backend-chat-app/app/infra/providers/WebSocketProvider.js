const { Server } = require("socket.io");
const SocketListener = require("../../listeners/SocketListener");
const ChatListener = require("../../listeners/ChatListener");
const UsersListener = require("../../listeners/UsersListener");
const SocketProvider = require("./SocketProvider");
const StartListenersService = require("../../services/StartListenersService");
const ChatEmiter = require("../../emiters/ChatEmiter");
const { listeners } = require("../../constants/listeners");

class WebSocketProvider {
  constructor({ server, originUrl, usersRepository, logProvider }) {
    this.websocket = new Server(server, {
      cors: {
        origin: originUrl,
      },
    });
    this.usersRepository = usersRepository;
    this.logProvider = logProvider;

    this.getWebsocketServer = this.getWebsocketServer.bind(this);
    this.startListeners = this.startListeners.bind(this);
  }

  getWebsocketServer() {
    return this.websocket;
  }

  subscribe(listenerName, callback = () => {}) {
    this.websocket.on(listenerName, callback);
  }

  startListeners() {
    this.subscribe(listeners.connection, (socket) => {
      const socketProvider = new SocketProvider(socket);
      const chatEmiter = new ChatEmiter({
        socketProvider,
        usersRepository: this.usersRepository,
      });
      const socketListener = new SocketListener({
        socketProvider,
        usersRepository: this.usersRepository,
        logProvider: this.logProvider,
      });
      const chatListener = new ChatListener({
        logProvider: this.logProvider,
        chatEmiter,
      });
      const usersListener = new UsersListener({
        socketProvider,
        usersRepository: this.usersRepository,
        logProvider: this.logProvider,
      });

      const startListenersService = new StartListenersService({
        logProvider: this.logProvider,
        chatListener,
        socketListener,
        socketProvider,
        usersListener,
      });
      startListenersService.execute();
    });
  }
}

module.exports = WebSocketProvider;
