import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { getMessage } from "../utils/message.util";
import { rules } from "../utils/rules";

async function store(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    await yup
      .object()
      .shape({
        email: rules.email.required(),
        password: rules.password.required(),
      })
      .validate({ email, password }, { stripUnknown: true });

    return next();
  } catch (err: any) {
    return res.status(400).json({
      message: getMessage("default.badRequest"),
      data: err.errors,
    });
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    await yup
      .object()
      .shape({
        _id: rules.mongoId.required(),
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

async function list(req: Request, res: Response, next: NextFunction) {
  try {
    await yup
      .object()
      .shape({
        skip: rules.skip,
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

export default { store, findById, list };
