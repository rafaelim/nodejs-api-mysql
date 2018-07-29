import { sequelize } from "../config/datasource";

export default class UserRepository {
  constructor(user) {
    this.user = user;
  }
  async create(user) {
    return await sequelize
      .transaction(async transaction => {
        return await this.user.create(user, { transaction: transaction });
      })
      .catch(err => {
        throw err;
      });
  }

  update(user) {}

  async findAll() {
    return await this.user.findAll();
  }

  async findById(userId) {
    return await this.user.findById(userId);
  }
}
