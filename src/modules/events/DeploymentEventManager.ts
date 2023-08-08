import EventEmitter from 'events';

import { EventObj } from '../../types/events-types';
import DeploymentType from '../../types/deployment-types';

export default class DeploymentEventManager extends EventEmitter {
  public status: DeploymentType = DeploymentType.pending;

  send(eventObj: EventObj) {
    this.emit('send', { ...eventObj, date: Date.now() });
  }
}
