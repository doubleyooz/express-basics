import express from "express";

import vehicleController from "../controllers/vehicles.controller";

import vehicleMiddleware from "../middlewares/vehicles.middleware";

const router = express.Router();

router.post("/", vehicleMiddleware.create, vehicleController.create);
router.get("/:userId", vehicleMiddleware.findOneById, vehicleController.findOne);
router.get("/", vehicleMiddleware.find, vehicleController.find);
router.put("/", vehicleMiddleware.update, vehicleController.update);
router.delete("/", vehicleMiddleware.findOneById, vehicleController.remove);

export default router;