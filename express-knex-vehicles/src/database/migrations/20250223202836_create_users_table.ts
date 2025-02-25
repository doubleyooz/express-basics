import { Knex } from 'knex';

const USERS = 'users';

//prettier-ignore
export async function up(knex: Knex): Promise<void> {
    await knex.raw(`DROP TABLE IF EXISTS "${USERS}" CASCADE`);
    return knex.schema.createTable(USERS, (table: Knex.TableBuilder) => {
        table.uuid('_id').primary().notNullable().unique();
        table.string('email').notNullable().unique();


        table.string('password').notNullable().checkRegex('^\s*[0-9]{8}\s*$');
        table.string('name').notNullable();
        table.string('tokenVersion').notNullable().defaultTo(0);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(USERS);
}
