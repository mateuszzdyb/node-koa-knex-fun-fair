import { ParameterizedContext } from 'koa';
import dataAggregation from '../data-aggregation';
import eventManager from './EventManger';
import sendUserData from '../../services/data-services/httpServices';
import { EventObj } from '../../types/events-types';

eventManager.on('send', (ctx: ParameterizedContext, ev: EventObj) => {
  dataAggregation.services.send(ev);
  sendUserData(ctx, ev);
});
