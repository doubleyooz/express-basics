import { Router, Request, Response } from "express";
import CurrencyController from "../controllers/currency.controller";
import CurrencyMiddleware from "../middlewares/currency.middleware";
import { auth } from "../middlewares/auth.middleware";

const routes = Router();

routes.get("/currencies", auth(), CurrencyController.getCurrency);
routes.get(
  "/currencies/now",
  auth(),
  CurrencyMiddleware.currentPrice,
  CurrencyController.currentPrice
);
routes.get(
  "/currencies/lately",
  auth(),
  CurrencyMiddleware.latelyPrice,
  CurrencyController.latelyPrice
);

export default routes;
