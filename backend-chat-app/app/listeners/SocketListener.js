const DisconnectService = require("../services/DisconnectService");

class SocketListener {
  constructor({ socketProvider, usersRepository, logProvider }) {
    this.socketProvider = socketProvider;
    this.usersRepository = usersRepository;
    this.logProvider = logProvider;

    this.onDisconnect = this.onDisconnect.bind(this);
  }

  onDisconnect() {
    const disconnectService = new DisconnectService({
      logProvider: this.logProvider,
      socketProvider: this.socketProvider,
      usersRepository: this.usersRepository,
    });

    disconnectService.execute();
  }
}

module.exports = SocketListener;
