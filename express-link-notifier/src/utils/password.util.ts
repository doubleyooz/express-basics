import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string, salt?: number) => {
    return await bcrypt.hash(
        password,
        salt ? salt : Number(process.env.HASH_SALT)
    );
};

export const matchPassword = async (
    password: string,
    supposedPassword: string
) => {
    return await bcrypt.compare(supposedPassword, password);
};
