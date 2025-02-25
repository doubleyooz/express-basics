import * as bcrypt from "bcryptjs";


export const hashPassword = async (password: string, salt?: number) => {
  return await bcrypt.hash(
    password,
    salt ? salt : bcrypt.genSaltSync(parseInt(`${process.env.BCRYPT_SALT}`))
  );
};

export const matchPassword = async (password: string, supposedPassword: string) => {
  return await bcrypt.compare(supposedPassword, password);
};