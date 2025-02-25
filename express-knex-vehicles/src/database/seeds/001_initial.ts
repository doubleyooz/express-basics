import { Knex } from 'knex';
import { randomUUID } from 'node:crypto';

export async function seed(knex: Knex): Promise<void> {
    const random = (n: number) => {
        return Math.floor(Math.random() * n);
    };

    const randomIntFromInterval = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var arr = [];
    while (arr.length < 3) {
        let r = randomIntFromInterval(9999999999999999, 100000000000000000);
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    // prettier-ignore
    const vehicles = [
        { _id: randomUUID(), plaque: 'CRG-9310', renavam: 10101010101, chassis: arr[random(3)], model: 'a', brand: 'ford', year: 1980 },
        { _id: randomUUID(), plaque: 'ASD-7742', renavam: 10101010102, chassis: arr[random(3)], model: 'b', brand: 'toyota', year: 2000 },
        { _id: randomUUID(), plaque: 'DRL-3212', renavam: 10101010103, chassis: arr[random(3)], model: 'c', brand: 'suzuki', year: 2010 }
    ]

    // Deletes ALL existing entries
    await knex('vehicles').del();

    // Inserts seed entries
    await knex('vehicles').insert(vehicles);
}
