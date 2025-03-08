import express from "express";

import userController from "../controllers/user.controller";

import userMiddleware from "../middlewares/user.middleware";

const router = express.Router();

router.post("/", userMiddleware.create, userController.create);
router.get("/:userId", userMiddleware.findOneById, userController.findOne);
router.get("/", userMiddleware.find, userController.find);
router.put("/", userMiddleware.update, userController.update);
router.delete("/", userController.remove);

export default router;