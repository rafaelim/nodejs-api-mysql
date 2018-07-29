let self = {};
export default class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(user) {
      return await this.repository.create(user);
  }

  update(user) {}

  async findById(userId) {
    return await this.repository.findById(userId);
  }
}
