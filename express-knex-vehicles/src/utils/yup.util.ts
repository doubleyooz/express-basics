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


export { name, email, _id, password }