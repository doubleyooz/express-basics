import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { hashPassword } from "../utils/password.util";
import { getMessage } from "../utils/message.util";

interface UserListQuery {
  skip?: number;
}

const store = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword });
    return res.status(200).json({
      data: { email: user.email, _id: user._id },
      message: getMessage("user.valid.sign_up.success"),
    });
  } catch (err: any) {
    const errorMessage =
      err.name === "MongoServerError" && err.code === 11000
        ? "user.invalid.email.duplicate"
        : "default.badRequest";
    return res.status(400).json({ message: getMessage(errorMessage), err });
  }
};

const list = async (req: Request, res: Response) => {
  const { skip } = req.query as UserListQuery;

  try {
    const [users, count] = await Promise.all([
      User.find()
        .sort("updatedAt")
        .skip(skip || 0)
        .limit(10),
      User.countDocuments(),
    ]);

    return res.status(201).json({
      data: users,
      message: getMessage("user.list.success"),
      metadata: {
        count,
        skip,
        limit: 10,
      },
    });
  } catch (err) {
    return res.status(500).json({
      err,
      message: getMessage("default.serverError"),
      metadata: req.new_token,
    });
  }
};

const findOne = async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (user) {
      return res.status(200).json({
        data: user,
        message: getMessage("user.findOne.success"),
        metadata: req.new_token,
      });
    }
    return res.status(404).json({
      message: getMessage("user.notfound"),
      metadata: req.new_token,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: err, message: getMessage("default.serverError") });
  }
};

const remove = async (req: Request, res: Response) => {
  const { _id } = req.query;
  if (req.auth !== _id) {
    return res.status(401).json({
      message: getMessage("default.unauthorized"),
    });
  }

  try {
    const result = await User.deleteOne({ _id: _id });
    return result.deletedCount === 1
      ? res.status(200).json({
          message: getMessage("user.delete.success"),
        })
      : res.status(404).json({
          message: getMessage("user.notfound"),
          metadata: req.new_token,
        });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: getMessage("default.serverError"),
    });
  }
};

export default { store, findOne, list, remove };
