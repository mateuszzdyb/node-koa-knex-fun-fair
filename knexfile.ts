/* eslint-disable import/first */
import { config } from 'dotenv';

config({ path: '../.env' });

import configs from './src/config';

export default configs.databaseConfig;
