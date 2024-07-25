import { Request, Response, NextFunction } from "express";

import User from "../models/user.model";
import jwt from "../utils/jwt.util";
import { getMessage } from "../utils/message.util";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: getMessage("default.unauthorized"),
      });
    }

    const [, token] = authHeader.split(" ");
    let payload: any;
    try {
      payload = jwt.verifyJwt(token, 1);
    } catch (err) {
      return res.status(401).json({
        message: getMessage("default.unauthorized"),
        err: err instanceof Error ? err.message : undefined,
      });
    }

    try {
      const doesUserExists = await User.exists({
        _id: payload._id,
        tokenVersion: payload.tokenVersion,
      });
      console.log({ doesUserExists });
      if (!doesUserExists) {
        return res.status(401).json({
          message: getMessage("default.unauthorized"),
        });
      }

      req.auth = payload._id;
      const current_time = Date.now().valueOf() / 1000;
      if ((payload.exp - payload.iat) / 2 > payload.exp - current_time) {
        const newToken = jwt.generateJwt(
          { _id: payload._id, tokenVersion: payload.tokenVersion },
          1
        );
        req.new_token = newToken || undefined;
        console.log(`New Token: ${newToken}`);
      }
      console.log("shall pass");
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: getMessage("default.badRequest"),
        err,
      });
    }
  };
};
