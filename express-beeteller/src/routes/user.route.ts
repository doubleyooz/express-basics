import { Router, Request, Response } from "express";
import UserController from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";
import UserMiddleware from "../middlewares/user.middleware";

const routes = Router();

routes.post("/users", UserMiddleware.store, UserController.store);
routes.get("/users", auth(), UserMiddleware.list, UserController.list);
routes.get(
  "/users/findOne",
  auth(),
  UserMiddleware.findById,
  UserController.findOne
);
routes.delete("/users", auth(), UserMiddleware.findById, UserController.remove);

export default routes;
