import { Request, Response } from "express";
import vehicleService from "../services/vehicles.service";


import { getMessage } from "../utils/message.util";
import {
    BadRequestException,
    CustomException,
    STATUS_CODE_OK,
    STATUS_CODE_SERVER_ERROR,
    STATUS_CODE_UNPROCESSABLE_ENTITY,
    UnprocessableEntityException,
} from "../utils/exception.util";
import { CreateVehicleDto, FindByIdVehicleDto, FindVehicleDto } from "../models/vehicles.model";

const create = async (req: Request, res: Response): Promise<any> => {
    const { brand, chassis, model, plaque, renavam, year }: CreateVehicleDto = req.body;

    try {
        const vehicle = await vehicleService.create({ brand, chassis, model, plaque, renavam, year });
        return res.status(STATUS_CODE_OK).json({
            message: getMessage("vehicle.create.success"),
            data: vehicle,
        });
    } catch (err) {

        if (err instanceof CustomException)
            return res.status(err.status).json(err.message);

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};
const findOne = async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.query as FindByIdVehicleDto;

    try {
        const vehicle = await vehicleService.findById(_id);

        return res.json({
            message: getMessage("vehicle.findone.success"),
            data: vehicle,
        });
    } catch (err) {
        if (err instanceof CustomException)
            return res.status(err.status).json(err.message);

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};

const find = async (req: Request, res: Response): Promise<any> => {
    const { brand, model, plaque, year } = req.query as FindVehicleDto;


    let search: FindVehicleDto = {}

    if (brand)
        search.brand = brand;

    if (model)
        search.model = model;

    if (plaque)
        search.plaque = plaque;

    if (year)
        search.year = year;

    try {
        const result = await vehicleService.findAll(search);
        return res.json({
            message: getMessage("vehicle.list.success"),
            data: result,
        });
    } catch (err) {
        if (err instanceof CustomException)
            return res.status(err.status).json({ message: err.message, data: [] });

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};

const update = async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.query as FindByIdVehicleDto;

    try {
        const result = await vehicleService.update(
            _id,
            req.body
        );
        return res.json({
            message: getMessage("vehicle.update.success"),
            data: result,
        });
    } catch (err) {
        if (err instanceof CustomException)
            return res.status(err.status).json({ message: err.message, data: [] });

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};

const remove = async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.query as FindByIdVehicleDto;

    try {
        const result = await vehicleService.deleteById(_id);
        return res.json({
            message: getMessage("vehicle.delete.success"),
            data: result,
        });
    } catch (err) {
        if (err instanceof CustomException)
            return res.status(err.status).json({ message: err.message, data: [] });

        return res.status(STATUS_CODE_SERVER_ERROR).json(err);
    }
};

export default { create, findOne, find, update, remove };