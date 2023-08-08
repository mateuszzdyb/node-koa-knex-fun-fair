import { Knex } from 'knex';
import users from './jsons/users.json';
import project from './jsons/projects.json';

/**
 * @param {Knex} knex
 */
// disabling due to knex requirement to use export only
// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('project').del();
  await knex('deployment').del();

  // Inserts seed entries for users table
  const [createdUsers] = await knex('users').insert(users).returning('*');
  console.log('users added', createdUsers);

  // Inserts seed entries for projects table
  const [createdProjects] = await knex('project').insert(project).returning('*');

  console.log('projects added', createdProjects);
}
