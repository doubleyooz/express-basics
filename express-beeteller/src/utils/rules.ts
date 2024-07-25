import mongoose from "mongoose";
import * as yup from "yup";
import { getMessage } from "../utils/message.util";

export function isValidMongoIdRequired(value: string) {
  const isValid = mongoose.Types.ObjectId.isValid(value);
  return isValid && value === String(new mongoose.Types.ObjectId(value));
}

export const rules = {
  email: yup.string().email(),
  skip: yup.number().min(0),
  password: yup
    .string()
    .min(8, getMessage("user.invalid.password.short"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
      getMessage("user.invalid.password.weak")
    ),
  mongoId: yup
    .string()
    .test("isValidMongoId", getMessage("invalid.object.id")!, (value) =>
      isValidMongoIdRequired(value!)
    ),
  currency: yup
    .string()
    .matches(
      /^EUR-BRL$|^BTC-BRL$|^USD-BRL$|^BRL-USD$|^EUR-USD$|^BTC-EUR$|^BTC-USD$/
    ),
  days: yup
    .number()
    .moreThan(0)
    .test(
      "Valid days",
      "${path} must be divisible for 30",
      (value) => value! % 30 === 0
    ),
};
