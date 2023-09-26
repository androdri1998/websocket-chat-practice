const { listeners } = require("../constants/listeners");

class StartListenersService {
  constructor({
    socketProvider,
    logProvider,
    usersListener,
    chatListener,
    socketListener,
  }) {
    this.socketProvider = socketProvider;
    this.logProvider = logProvider;
    this.usersListener = usersListener;
    this.chatListener = chatListener;
    this.socketListener = socketListener;

    this.execute = this.execute.bind(this);
  }

  execute() {
    try {
      this.socketProvider.subscribe(
        listeners.setUsername,
        this.usersListener.onSetUsername
      );
      this.socketProvider.subscribe(
        listeners.sendMessage,
        this.chatListener.onSendMessage
      );
      this.socketProvider.subscribe(
        listeners.disconnect,
        this.socketListener.onDisconnect
      );
    } catch (err) {
      this.logProvider.error(err.message, err.stack);
    }
  }
}

module.exports = StartListenersService;
