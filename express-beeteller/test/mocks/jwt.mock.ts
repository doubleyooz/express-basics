import jwt from "../../src/utils/jwt.util";

export const TOKEN = (_id: string) => {
  jwt.generateJwt(
    {
      _id: _id,
      tokenVersion: 0,
    },
    1
  );
};
