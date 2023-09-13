import { ParameterizedContext } from 'koa';

import axios, { AxiosResponse, isAxiosError } from 'axios';
import { EventObj } from '../../types/events-types';
import PsqlStore from '../db-stores/psqlStore';

const sendUserData = async (ctx: ParameterizedContext, ev: EventObj) => {
  const values = await PsqlStore.getInstance().getProjectUrlById(ev.projectId);
  try {
    const response: AxiosResponse = await axios.post(values.toString(), JSON.stringify({ ev }));
    ctx.logger.info(`send data to analytics response - ${response.status}`);
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      // here wee could add retry with incremented timeout up to a certain number of retries
      ctx.logger.error(`send data to analytics response - ${e.message}`);
    }
  }
};

export default sendUserData;
