import events from "events";
import Immutable from "immutable";

import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionConstants from "../constants/ActionConstants";
import GardenConstants from "../constants/GardenConstants";

const EventEmitter = events.EventEmitter;
// Name of the event that is emmited on each store change.
const CHANGE_EVENT = "change";

class GardenStore extends EventEmitter {
  constructor() {
    super();
    this.flowers = new Immutable.List([]);
    this.connections = new Immutable.List([]);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getFlowers() {
    return this.flowers;
  }

  getConnections() {
    return this.connections;
  }

  addFlower(flower) {
    this.flowers = this.flowers.push(new Immutable.Map(flower));
  }
}

const store = new GardenStore();

// Register callback to handle all updates
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionConstants.GARDEN_ADD_FLOWER:
      store.addFlower(action.flower);
      store.emitChange();
      break;
    default:
      // no op
  }
});

export default store;
