import UserService from "../service/user-service";
import UserRepository from "../repository/user-repository";
import { dbInstance } from "../main";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository(dbInstance.models.user);
    this.userService = new UserService(this.userRepository);
  }
  async save(req, res) {
    try {
      const savedUser = await this.userService.create(req.body);
      console.log(savedUser);
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async findAll(req, res) {
    try {
      const users = await this.userRepository.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json(error);
    }
    return;
  }

  async findById(req, res) {
    try {
      const userId = req.params.id;
      console.log(userId);
      const user = await this.userService.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  generateResetPasswordLink() {
    // url with link to reset password
  }
}
