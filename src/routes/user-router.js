import express from "express";
import UserController from "../controller/user-controller";

export default class UserRoutes {
  constructor() {
    this.userController = new UserController();
    this.router = express.Router();
  }

  createRoutes() {
    return this.router
      .post("/", this.userController.save.bind(this.userController))
      .get("/", this.userController.findAll.bind(this.userController))
      .get("/:id", this.userController.findById.bind(this.userController));
  }
}
