export interface IUser {
    _id: string;
    email: string;
    name: string;
    password: string;
}

export type CreateUserDto = Omit<IUser, '_id'>;

export type UpdateUserDto = Partial<Omit<IUser, '_id' | 'email'>>;

export const USERS = 'users'


