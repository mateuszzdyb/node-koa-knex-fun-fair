import dataAggregation from '../data-aggregation';
import eventManager from './EventManger';
import sendUserData from '../../services/data-services/httpServices';
import { EventObj } from '../../types/events-types';

eventManager.on('send', (ev: EventObj) => {
  dataAggregation.services.send(ev);
  sendUserData(ev);
});
