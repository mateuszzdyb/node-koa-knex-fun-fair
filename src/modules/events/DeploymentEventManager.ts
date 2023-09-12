import EventEmitter from 'events';
import { ParameterizedContext } from 'koa';

import { EventObj } from '../../types/events-types';
import DeploymentType from '../../types/deployment-types';

export default class DeploymentEventManager extends EventEmitter {
  public status: DeploymentType = DeploymentType.pending;

  send(ctx: ParameterizedContext, eventObj: EventObj) {
    this.emit('send', ctx, { ...eventObj, date: Date.now() });
  }
}
