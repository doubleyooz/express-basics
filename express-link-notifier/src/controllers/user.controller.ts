import { Request, Response } from "express";
import usersService from "../services/user.service";


import { getMessage } from "../utils/message.util";
import {
    BadRequestException,
    CustomException,
    STATUS_CODE_OK,
    STATUS_CODE_SERVER_ERROR,
    STATUS_CODE_UNPROCESSABLE_ENTITY,
    UnprocessableEntityException,
} from "../utils/exception.util";
import { CreateUserDto, FindAllUsersDto, FindByIdUserDto } from "../models/user.model";

const create = async (req: Request, res: Response): Promise<any> => {
    const { email, password, name }: CreateUserDto = req.body;

    try {
        const user = await usersService.create({ email, password, name });
        return res.status(STATUS_CODE_OK).json({
            message: getMessage("user.create.success"),
            data: user,
        });
    } catch (err) {

        if (err instanceof CustomException)
            return res.status(err.status).json(err.message);

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};
const findOne = async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.query as FindByIdUserDto;

    try {
        const user = await usersService.findById(_id);

        return res.json({
            message: getMessage("user.findone.success"),
            data: user,
        });
    } catch (err) {
        if (err instanceof CustomException)
            return res.status(err.status).json(err.message);

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};

const find = async (req: Request, res: Response): Promise<any> => {


    try {
        const result = await usersService.findAll(req.query);
        return res.json({
            message: getMessage("user.list.success"),
            data: result,
        });
    } catch (err) {
        if (err instanceof CustomException)
            return res.status(err.status).json({ message: err.message, data: [] });

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};

const update = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await usersService.update(
            req.auth,
            req.body
        );
        return res.json({
            message: getMessage("user.update.success"),
            data: result,
        });
    } catch (err) {
        if (err instanceof CustomException)
            return res.status(err.status).json({ message: err.message, data: [] });

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};

const remove = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await usersService.deleteById(req.auth);
        return res.json({
            message: getMessage("user.delete.success"),
            data: result,
        });
    } catch (err) {
        if (err instanceof CustomException)
            return res.status(err.status).json({ message: err.message, data: [] });

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};

export default { create, findOne, find, update, remove };