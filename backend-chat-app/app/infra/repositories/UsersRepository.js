class UsersRepository {
  constructor() {
    this.users = new Map();
  }

  add(key, value) {
    this.users.set(key, value);
  }

  get(key) {
    return this.users.get(key);
  }

  getAll() {
    return this.users;
  }

  destroy(key) {
    this.users.delete(key);
  }
}

module.exports = UsersRepository;
