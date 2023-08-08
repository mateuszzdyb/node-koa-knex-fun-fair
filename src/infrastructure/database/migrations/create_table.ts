import { Knex } from 'knex';

async function createUsers(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email', 255).notNullable();
    table.string('username', 255).notNullable();
    table.dateTime('created_at').notNullable();
  });
}

async function createProject(knex: Knex) {
  return knex.schema.createTable('project', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('url', 255);
    table.integer('user_id').notNullable();
    table.string('app_secret', 255).notNullable();
    table.dateTime('created_at').notNullable();
  });
}

async function createDeployment(knex: Knex) {
  return knex.schema.createTable('deployment', (table) => {
    table.enum('status', ['pending', 'building', 'deploying', 'failed', 'cancelled', 'done']);
    table.increments('id');
    table.integer('project_id');
    table.integer('deployed_in', 255).notNullable();
    table.dateTime('created_at').notNullable();
  });
}

export async function up(knex: Knex) {
  await createUsers(knex);
  await createProject(knex);
  await createDeployment(knex);
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('project');
  await knex.schema.dropTable('deployment');
}
