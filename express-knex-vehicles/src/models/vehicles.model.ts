export interface IVehicle {
    plaque: string;
    chassis: string;
    renavam: string;

    model: string;
    brand: string;
    year: string;
    _id?: string;
}

export type CreateVehicleDto = Omit<IVehicle, '_id'>;

export type UpdateVehicleDto = Partial<Omit<IVehicle, 'plaque' | 'chassis' | 'renavam'>>;

export type FindVehicleDto = Partial<Omit<IVehicle, '_id' | 'chassis' | 'renavam'>>;

export const VEHICLES = 'vehicles';