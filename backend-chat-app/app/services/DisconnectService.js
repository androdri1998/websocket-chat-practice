class DisconnectService {
  constructor({ socketProvider, logProvider, usersRepository }) {
    this.socketProvider = socketProvider;
    this.logProvider = logProvider;
    this.usersRepository = usersRepository;

    this.execute = this.execute.bind(this);
  }

  execute() {
    try {
      this.usersRepository.destroy(this.socketProvider.getId());
    } catch (err) {
      this.logProvider.error(err.message, err);
    }
  }
}

module.exports = DisconnectService;
