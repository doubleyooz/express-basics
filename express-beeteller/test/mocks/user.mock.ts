import { randomUUID } from "crypto";

export const USER = {
  email: "valid@email.com",
  password: `asd232S@#1`,
  _id: randomUUID(),
  token: "",
};

export const USER_2 = {
  email: `test@gmail.com`,
  password: `aDs@!#!@#dasd1`,
  _id: randomUUID(),
  token: "",
};

export const FAKE_USER = {
  email: `2.com5@d`,
  password: `asdasd`,
  _id: randomUUID(),
  token: "",
};
