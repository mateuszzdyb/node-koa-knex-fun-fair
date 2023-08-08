import knex, { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import dbConfig from '../../config/database';

export default knex<Knex.Config, unknown>({
  ...dbConfig,
  ...knexSnakeCaseMappers(),
});
