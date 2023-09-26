const { emiters } = require("../constants/emiters");

class ChatEmiter {
  constructor({ socketProvider, usersRepository }) {
    this.socketProvider = socketProvider;
    this.usersRepository = usersRepository;

    this.emitReceiveMessage = this.emitReceiveMessage.bind(this);
  }

  emitReceiveMessage(data) {
    this.socketProvider.emit(emiters.receiveMessage, {
      name: this.usersRepository.get(this.socketProvider.getId()),
      message: data,
    });
  }
}

module.exports = ChatEmiter;
