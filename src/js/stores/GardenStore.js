import events from "events";
import Immutable from "immutable";

import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionConstants from "../constants/ActionConstants";
import Logic from "../Logic";
import Calculator from "../Calculator";
import Random from "../Random";

const EventEmitter = events.EventEmitter;
// Name of the event that is emmited on each store change.
const CHANGE_EVENT = "change";

class GardenStore extends EventEmitter {
  constructor() {
    super();
    this.random = new Random();
    this.flowers = new Immutable.List([]);
    this.connections = new Immutable.List([]);
    this.players = new Immutable.List([]);
    this.activePlayerId = 0;
    this.isGameStarted = false;
    this.isGameOver = false;
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

  isGameStarted() {
    return this.isGameStarted;
  }

  isGameOver() {
    return this.isGameOver;
  }

  getFlowers() {
    return this.flowers;
  }

  getConnections() {
    return this.connections;
  }

  getPlayers() {
    return this.players;
  }

  getActivePlayer() {
    return this.players.get(this.activePlayerId);
  }

  getActivePlayerId() {
    return this.activePlayerId;
  }

  addFlower(flower) {
    this.flowers = this.flowers.push(Immutable.fromJS(flower));
  }

  addPlayer(player) {
    const p = {
      color: player.color,
      maxLength: player.maxLength,
      remainingLength: player.maxLength,
    };
    this.players = this.players.push(Immutable.fromJS(p));
    this.connections = this.connections.push(new Immutable.List([]));
  }

  addConnection(flowerId) {
    const takeAnalysis = Logic.canTakeFlower(this.activePlayerId, flowerId,
        this.players, this.flowers, this.connections);
    if (takeAnalysis === false) {
      return;
    }

    // Update flowers.
    const flower = this.flowers.get(flowerId);
    this.flowers = this.flowers.set(flowerId, flower.set("takenBy", this.activePlayerId));

    // Update connections.
    const playerConnections = this.connections.get(this.activePlayerId);
    const newPlayerConnections = playerConnections.push(flowerId);
    this.connections = this.connections.set(this.activePlayerId, newPlayerConnections);

    // Update player.
    let player = this.players.get(this.activePlayerId);
    const remainingLength = player.get("remainingLength") - takeAnalysis.distance;
    const newPosition = { x: this.random.double(), y: this.random.double() };
    const flowerPosition = flower.get("position").toJS();
    const positionNearFlower = Calculator.getPositionAtDistance(flowerPosition, newPosition, 0.1);
    player = player.set("remainingLength", remainingLength);
    player = player.set("position", Immutable.fromJS(positionNearFlower));
    this.players = this.players.set(this.activePlayerId, player);

    // Choose next player.
    let nextPlayerId = this.activePlayerId;
    while (!this.isGameOver) {
      nextPlayerId = (nextPlayerId + 1) % this.players.size;
      if (Logic.canPlay(nextPlayerId, this.players, this.flowers, this.connections)) {
        this.activePlayerId = nextPlayerId;
        break;
      }
      if (nextPlayerId === this.activePlayerId) {
        this.isGameOver = true;
        break;
      }
    }
  }

  setHalfConnection(playerId, position) {
    let player = this.players.get(playerId);
    const playerConnections = this.connections.get(playerId);
    if (playerConnections.size <= 0) {
      return;
    }
    const lastFlowerId = playerConnections.last();
    const lastFlower = this.flowers.get(lastFlowerId);
    const lastFlowerPosition = lastFlower.get("position").toJS();
    const remaining = player.get("remainingLength");
    const distance = Calculator.getDistanceBetweenPositions(lastFlowerPosition, position);
    let finalPosition = position;
    if (distance > remaining) {
      finalPosition = Calculator.getPositionAtDistance(lastFlowerPosition, position, remaining);
    }
    player = player.set("position", Immutable.fromJS(finalPosition));
    this.players = this.players.set(playerId, player);
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
    case ActionConstants.GARDEN_ADD_PLAYER:
      store.addPlayer(action.player);
      store.emitChange();
      break;
    case ActionConstants.GARDEN_ADD_CONNECTION:
      store.addConnection(action.flowerId);
      store.emitChange();
      break;
    case ActionConstants.GARDEN_SET_HALF_CONNECTION:
      store.setHalfConnection(action.playerId, action.position);
      store.emitChange();
      break;
    default:
      // no op
  }
});

export default store;
