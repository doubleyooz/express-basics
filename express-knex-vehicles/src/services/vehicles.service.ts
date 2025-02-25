import { randomUUID } from "node:crypto";
import knex from "knex";


import { CreateVehicleDto, FindVehicleDto, IVehicle, UpdateVehicleDto, VEHICLES } from "../models/vehicles.model";
import { getMessage } from "../utils/message.util.js";
import {
    InternalServerErrorException,
    NotFoundException,
} from "../utils/exception.util";


const selection: Partial<IVehicle> = {
    _id: '_id',
    plaque: 'plaque',
    renavam: 'renavam',
    chassis: 'chassis',
    model: 'model',
    brand: 'brand',
    year: 'year',
};


async function create(data: CreateVehicleDto) {
    const { brand, chassis, model, plaque, renavam, year }: CreateVehicleDto = data;

    try {
        const newVehicle: IVehicle = {
            _id: randomUUID(),
            plaque,
            renavam,
            chassis,
            model,
            brand,
            year
        };

        await knex(VEHICLES).insert(newVehicle);
        return newVehicle;
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error while creating vehicle");
    }
}

async function findById(vehicle_id: string) {
    const vehicle = await knex(VEHICLES)
        .where({ _id: vehicle_id })
        .select(selection)
        .limit(1);

    if (!vehicle || vehicle.length === 0) {
        throw new NotFoundException(getMessage("vehicle.notfound"));
    }
    return vehicle[0];
}

async function findAll(filters?: FindVehicleDto) {
    try {
        // Start building the query
        let query = knex(VEHICLES).select(selection);

        // Apply filters if provided
        if (filters) {
            if (filters.brand) {
                query = query.where('.brand', 'ilike', `%${filters.brand}%`);
            }
            if (filters.model) {
                query = query.where('.model', 'ilike', `%${filters.model}%`);
            }
            if (filters.year) {
                query = query.where('.year', 'ilike', `%${filters.year}%`);
            }
            if (filters.plaque) {
                query = query.where('.plaque', 'ilike', `%${filters.plaque}%`);
            }

        }

        // Execute the query
        const vehicles = await query;
        return vehicles;
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error while fetching vehicles");
    }
}

async function update(vehicle_id: string, data: UpdateVehicleDto) {
    try {
        const updatedVehicle = await knex(VEHICLES)
            .where({ _id: vehicle_id })
            .update(data)
            .returning(Object.keys(selection));

        if (!updatedVehicle || updatedVehicle.length === 0) {
            throw new NotFoundException(getMessage("vehicle.notfound"));
        }
        return updatedVehicle[0];
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error while updating vehicle");
    }
}

async function deleteById(user_id: string) {
    try {
        const deletedVehicle = await knex(VEHICLES)
            .where({ _id: user_id })
            .del()
            .returning(Object.keys(selection));

        if (!deletedVehicle || deletedVehicle.length === 0) {
            throw new NotFoundException(getMessage("vehicle.notfound"));
        }
        return deletedVehicle[0];
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Error while deleting vehicle");
    }
}

export default {
    create,
    findById,
    findAll,
    update,
    deleteById,
};