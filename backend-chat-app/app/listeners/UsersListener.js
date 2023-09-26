const SetUsernameService = require("../services/SetUsernameService");

class UsersListener {
  constructor({ socketProvider, usersRepository, logProvider }) {
    this.socketProvider = socketProvider;
    this.usersRepository = usersRepository;
    this.logProvider = logProvider;

    this.onSetUsername = this.onSetUsername.bind(this);
  }

  onSetUsername(data) {
    const setUsernameService = new SetUsernameService({
      logProvider: this.logProvider,
      socketProvider: this.socketProvider,
      usersRepository: this.usersRepository,
    });
    setUsernameService.execute(data);
  }
}

module.exports = UsersListener;
