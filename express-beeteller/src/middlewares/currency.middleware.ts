import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { getMessage } from "../utils/message.util";
import { rules } from "../utils/rules";

async function latestPrice(req: Request, res: Response, next: NextFunction) {
  try {
    await yup
      .object()
      .shape({
        currency: rules.currency.required(),
        days: rules.days.required(),
      })
      .validate(req.query, { stripUnknown: true });
    next();
  } catch (err: any) {
    return res.status(400).json({
      message: getMessage("default.badRequest"),
      data: err.errors,
    });
  }
}

async function currentPrice(req: Request, res: Response, next: NextFunction) {
  try {
    await yup
      .object()
      .shape({
        query: yup.object().shape({}),
      })
      .validate({ body: req.body, query: req.query }, { stripUnknown: true });
    next();
  } catch (err: any) {
    return res.status(400).json({
      message: getMessage("default.badRequest"),
      data: err.errors,
    });
  }
}

async function getCurrency(req: Request, res: Response, next: NextFunction) {
  try {
    await yup
      .object()
      .shape({
        currency: rules.currency.required(),
      })
      .validate(req.query, { stripUnknown: true });
    next();
  } catch (err: any) {
    return res.status(400).json({
      message: getMessage("default.badRequest"),
      data: err.errors,
    });
  }
}

export default { getCurrency, currentPrice, latestPrice };
