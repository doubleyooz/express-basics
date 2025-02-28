import { randomUUID } from "node:crypto";
import knex from "knex";

import { USERS, IUser, CreateUserDto } from "../models/users.model";
import { hashPassword } from "../utils/password.util";
import { getMessage } from "../utils/message.util.js";
import {
    InternalServerErrorException,
    NotFoundException,
} from "../utils/exception.util";


const selection: Partial<IUser> = {
    _id: '_id',
    email: 'email',
    name: 'name',
};

async function create(data: CreateUserDto) {
    const { email, password, name }: CreateUserDto = data;

    try {
        const newUser: IUser = {
            _id: randomUUID(),
            email,
            name,
            password: await hashPassword(password)
        };

        await knex(USERS).insert(newUser);
        return { email, name, _id: newUser._id };
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error while creating user");
    }
}

async function findById(user_id: string) {
    const user = await knex(USERS)
        .where({ _id: user_id })
        .select(selection)
        .limit(1);

    if (!user || user.length === 0) {
        throw new NotFoundException(getMessage("user.notfound"));
    }
    return user[0];
}

async function findAll(filters?: { name?: string | { $regex: string; $options: string; }; email?: string }) {
    try {
        // Start building the query
        let query = knex(USERS).select(selection);

        // Apply filters if provided
        if (filters) {
            if (filters.name) {
                query = query.where('name', 'ilike', `%${filters.name}%`);
            }
            if (filters.email) {
                query = query.where('email', 'ilike', `%${filters.email}%`);
            }
        }

        // Execute the query
        const users = await query;
        return users;
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error while fetching users");
    }
}

async function update(user_id: string, data: Partial<IUser>) {
    try {
        const updatedUser = await knex(USERS)
            .where({ _id: user_id })
            .update(data)
            .returning(Object.keys(selection));

        if (!updatedUser || updatedUser.length === 0) {
            throw new NotFoundException(getMessage("user.notfound"));
        }
        return updatedUser[0];
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error while updating user");
    }
}

async function deleteById(user_id: string) {
    try {
        const deletedUser = await knex(USERS)
            .where({ _id: user_id })
            .del()
            .returning(Object.keys(selection));

        if (!deletedUser || deletedUser.length === 0) {
            throw new NotFoundException(getMessage("user.notfound"));
        }
        return deletedUser[0];
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error while deleting user");
    }
}

export default {
    create,
    findById,
    findAll,
    update,
    deleteById,
};