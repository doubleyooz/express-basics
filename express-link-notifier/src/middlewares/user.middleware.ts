import { RequestHandler } from "express";
import { createUserSchema, findAllSchema, findByIdSchema, updateUserSchema } from "../utils/zod.util";
import { STATUS_CODE_BAD_REQUEST } from "../utils/exception.util.js";

const create: RequestHandler = async (req, res, next): Promise<any> => {
    try {
        const result = await createUserSchema.strip().safeParseAsync(req.body);

        if (!result.success) {
            return res
                .status(STATUS_CODE_BAD_REQUEST)
                .json(result.error.errors.map((e) => e.message));
        }

        req.body = result.data; // Assign validated data
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(STATUS_CODE_BAD_REQUEST)
            .json({ message: "An unexpected error occurred" });
    }
};

const findOneById: RequestHandler = async (req, res, next): Promise<any> => {
    try {
        const result = await findByIdSchema.strip().safeParseAsync(req.query);

        if (!result.success) {
            return res
                .status(STATUS_CODE_BAD_REQUEST)
                .json(result.error.errors.map((e) => e.message));
        }

        req.query = result.data; // Assign validated data
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(STATUS_CODE_BAD_REQUEST)
            .json({ message: "An unexpected error occurred" });
    }
};

const find: RequestHandler = async (req, res, next): Promise<any> => {
    try {
        const result = await findAllSchema.strip().safeParseAsync(req.query);

        if (!result.success) {
            return res
                .status(STATUS_CODE_BAD_REQUEST)
                .json(result.error.errors.map((e) => e.message));
        }

        req.query = result.data; // Assign validated data
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(STATUS_CODE_BAD_REQUEST)
            .json({ message: "An unexpected error occurred" });
    }
};

const update: RequestHandler = async (req, res, next): Promise<any> => {
    try {
        const result = await updateUserSchema.strip().safeParseAsync(req.body);

        if (!result.success) {
            return res
                .status(STATUS_CODE_BAD_REQUEST)
                .json(result.error.errors.map((e) => e.message));
        }

        req.body = result.data; // Assign validated data
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(STATUS_CODE_BAD_REQUEST)
            .json({ message: "An unexpected error occurred" });
    }
};

export default {
    create,
    findOneById,
    find,
    update,
};