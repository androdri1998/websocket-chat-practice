class SetUsernameService {
  constructor({ socketProvider, logProvider, usersRepository }) {
    this.socketProvider = socketProvider;
    this.usersRepository = usersRepository;
    this.logProvider = logProvider;

    this.execute = this.execute.bind(this);
  }

  execute(data) {
    try {
      this.usersRepository.add(this.socketProvider.getId(), data);
    } catch (err) {
      this.logProvider.error(err.message, err);
    }
  }
}

module.exports = SetUsernameService;
