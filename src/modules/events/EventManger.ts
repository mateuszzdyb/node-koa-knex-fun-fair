import DeploymentEventManager from './DeploymentEventManager';
// Here we can add more event managers and export them bundled under a single name.
// in a bigger app we could consider adding it to context, so it woul be easily accessible anywhere.
// but for our case, this way of managing event swhould sufficeF
const EventManager = new DeploymentEventManager();

export default EventManager;
