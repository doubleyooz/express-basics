import { Request, Response, NextFunction } from "express";
import yup from "yup";

import { _id, brand, chassis, model, plaque, renavam, year } from "../utils/yup.util";
import { STATUS_CODE_BAD_REQUEST } from "../utils/exception.util";
import { getMessage } from "../utils/message.util";

async function create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const result = await yup
            .object({
                brand: brand.required(),
                chassis: chassis.required(),
                model: model.required(),
                plaque: plaque.required(),
                renavam: renavam.required(),
                year: year.required(),
            })
            .validate(req.body, { abortEarly: false, stripUnknown: true });

        req.body = result;
        next();
    } catch (err: unknown) {
        if (err instanceof yup.ValidationError) {
            console.log(err);
            return res
                .status(STATUS_CODE_BAD_REQUEST)
                .json(err.inner.map((e) => e.message));
        } else {
            console.error("Unexpected error:", err);
            return res.status(500).json({ message: getMessage('default.unexpected') });
        }
    }
}

async function findOneById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const result = await yup
            .object({
                _id: _id.required(),
            })
            .validate(req.query, { stripUnknown: true });

        req.query = result;
        next();
    } catch (err: unknown) {
        if (err instanceof yup.ValidationError) {
            console.log(err);
            return res
                .status(STATUS_CODE_BAD_REQUEST)
                .json(err.inner.map((e) => e.message));
        } else {
            console.error("Unexpected error:", err);
            return res.status(500).json({ message: getMessage('default.unexpected') });
        }
    }
}

async function find(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const result = await yup
            .object({
                model,
                plaque,
                brand,
                year,
            })
            .validate(req.query, { abortEarly: true, stripUnknown: true });

        req.query = result;
        next();
    } catch (err: unknown) {
        if (err instanceof yup.ValidationError) {
            console.log(err);
            return res
                .status(STATUS_CODE_BAD_REQUEST)
                .json(err.inner.map((e) => e.message));
        } else {
            console.error("Unexpected error:", err);
            return res.status(500).json({ message: getMessage('default.unexpected') });
        }
    }
}

async function update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const result = await yup
            .object({
                model,
                plaque,
                brand,
                year,
                chassis,
                renavam,

            })
            .validate(req.body, { abortEarly: false, stripUnknown: true });

        req.body = result;

        const result2 = await yup
            .object({
                _id: _id.required(),
            })
            .validate(req.query, { stripUnknown: true });

        req.query = result;
        next();
    } catch (err: unknown) {
        if (err instanceof yup.ValidationError) {
            console.log(err);
            return res
                .status(STATUS_CODE_BAD_REQUEST)
                .json(err.inner.map((e) => e.message));
        } else {
            console.error("Unexpected error:", err);
            return res.status(500).json({ message: getMessage('default.unexpected') });
        }
    }
}

export default {
    create,
    findOneById,
    find,
    update,
};