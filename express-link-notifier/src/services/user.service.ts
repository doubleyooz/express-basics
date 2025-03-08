import User, { CreateUserDto, FindAllUsersDto, UpdateUserDto } from "../models/user.model";
import { hashPassword } from "../utils/password.util";
import { getMessage } from "../utils/message.util";
import { InternalServerErrorException, NotFoundException } from "../utils/exception.util";


const store = async (data: CreateUserDto) => {
    const { email, name, password } = data;

    try {
        const user = await User.create({
            email,
            name,
            password: await hashPassword(password),
        } as CreateUserDto);

        return {
            email: user.email, name: user.name, _id: user._id, tokenVersion: user.tokenVersion
        }
    } catch (err: any) {
        console.log(err)
        throw new InternalServerErrorException("Error while creating user");
    }
}

const findAll = async (filters: FindAllUsersDto) => {
    const { email, name } = filters;
    const query: { name?: { $regex: string; $options: string; }, email?: { $regex: string; $options: string; } } = {}
    try {

        if (filters) {
            if (filters.name) {
                query.name = { $regex: "^" + name, $options: "i" }

            }
            if (filters.email)
                query.email = { $regex: "^" + email, $options: "i" }
        }
        const users = await
            User.find()
                .where(query)
                .sort("updatedAt");

        return users;


    } catch (err) {
        console.log(err);
        throw new InternalServerErrorException("Error while fetching users");

    }
};

async function findById(_id: string) {
    const user = await User.findById(_id);

    if (!user) {
        throw new NotFoundException(getMessage("user.notfound"));
    }
    return user;
}



async function update(_id: string, data: UpdateUserDto) {
    try {
        const document = await User.findOneAndUpdate({ _id }, data);
        if (!document) {
            throw new NotFoundException(getMessage("user.notfound"));
        }
        return document
    } catch (error) {
        console.log(error);
        if (error instanceof NotFoundException) {
            throw error; // re-throw the NotFoundException
        }
        throw new InternalServerErrorException("Error while updating user");
    }
}


async function deleteById(_id: string) {
    const document = await User.deleteOne({ _id }).exec();
    if (!document) {
        throw new NotFoundException(getMessage("user.notfound"));
    }
    return document;
}


export default { store, findById, findAll, update, deleteById };
