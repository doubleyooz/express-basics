import yup from "yup";
import { getMessage } from "./message.util";


const name = yup
    .string()
    .min(3)
    .max(20)
    .trim()
    .matches(/^([^0-9]*)$/, "no numbers allowed");

const email = yup.string().email().trim();

const _id = yup.string().uuid().trim();

const password = yup
    .string()
    .min(8, getMessage("user.invalid.password.short"))
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
        getMessage("user.invalid.password.weak")
    )
    .required();

const plaque = yup
    .string()
    .matches(/^[A-Z]{3}-[0-9]{4}$/, getMessage("vehicle.invalid.plaque"))

const renavam = yup
    .string()
    .matches(/^[0-9]{11}$/, getMessage("vehicle.invalid.renavam"))

const chassis = yup
    .string()
    .matches(/^[A-Z]{3}-[0-9]{4}$/, getMessage("vehicle.invalid.chassis"))

const model = yup
    .string()
    .min(3)
    .max(20)
    .trim()
    .matches(/^([^0-9]*)$/, "no numbers allowed");

const brand = yup
    .string()
    .min(3)
    .max(20)
    .trim()
    .matches(/^([^0-9]*)$/, "no numbers allowed");

const year = yup
    .string()
    .min(4)
    .max(4)
    .matches(/^[0-9]{4}$/, getMessage("vehicle.invalid.year"));


export { name, email, _id, password, plaque, renavam, chassis, model, brand, year };