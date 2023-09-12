import { ParameterizedContext } from 'koa';

import axios, { AxiosResponse, isAxiosError } from 'axios';
import { EventObj } from '../../types/events-types';

const sendUserData = async (ctx: ParameterizedContext, ev: EventObj) => {
  const values = await ctx.db.getProjectUrlById(ev.projectId);
  try {
    const response: AxiosResponse = await axios.post(values.toString(), JSON.stringify({ ev }));
    console.log('response', response.status);
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      // here wee could add retry with incremented timeout up to a certain number of retries
      console.log('error', e.message);
    }
  }
};

export default sendUserData;
