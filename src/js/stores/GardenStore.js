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
    this._random = new Random();
    this._flowers = new Immutable.List([]);
    this._connections = new Immutable.List([]);
    this._players = new Immutable.List([]);
    this._activePlayerId = 0;
    this._isGameStarted = false;
    this._isGameOver = false;
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
    return this._isGameStarted;
  }

  isGameOver() {
    return this._isGameOver;
  }

  getFlowers() {
    return this._flowers;
  }

  getConnections() {
    return this._connections;
  }

  getPlayers() {
    return this._players;
  }

  getActivePlayer() {
    return this._players.get(this._activePlayerId);
  }

  getActivePlayerId() {
    return this._activePlayerId;
  }

  addFlower(flower) {
    this._flowers = this._flowers.push(Immutable.fromJS(flower));
  }

  startGame() {
    const numPlayers = this._players.size;
    let maxLength = 0;
    switch (numPlayers) {
      case 1:
        maxLength = 3.0;
        break;
      case 2:
        maxLength = 2.5;
        break;
      case 3:
        maxLength = 2.0;
        break;
      default:
        throw new Error(`Game of ${numPlayers} is not supported.`);
    }
    this._isGameStarted = true;
    this._isGameOver = false;
    this._activePlayerId = 0;
    this._players = this._players.withMutations((players) => {
      players.forEach((player, playerId) => {
        players.set(playerId, player.withMutations((p) => {
          p.set("score", 0);
          p.set("maxLength", maxLength);
          p.set("remainingLength", maxLength);
        }));
      });
    });
    this._clearConnections();
  }

  newGame() {
    this._isGameStarted = false;
    this._isGameOver = false;
    this._activePlayerId = 0;
    this._clearConnections();
  }

  addPlayer(color) {
    const maxLength = 0.5;
    const p = {
      color,
      maxLength,
      remainingLength: maxLength,
      score: 0,
    };
    this._players = this._players.push(Immutable.fromJS(p));
    this._connections = this._connections.push(new Immutable.List([]));
  }

  removePlayer(playerId) {
    this._players = this._players.remove(playerId);
    this._connections = this._connections.remove(playerId);
  }

  addConnection(flowerId) {
    if (this._isGameOver || !this._isGameStarted) {
      return;
    }
    const takeAnalysis = Logic.canTakeFlower(this._activePlayerId, flowerId,
        this._players, this._flowers, this._connections);
    if (takeAnalysis === false) {
      return;
    }

    // Update connections.
    const playerConnections = this._connections.get(this._activePlayerId);
    const newPlayerConnections = playerConnections.push(flowerId);
    this._connections = this._connections.set(this._activePlayerId, newPlayerConnections);

    // Update player.
    let player = this._players.get(this._activePlayerId);
    const remainingLength = player.get("remainingLength") - takeAnalysis.distance;
    const randomPosition = { x: this._random.double(), y: this._random.double() };
    const flower = this._flowers.get(flowerId);
    const flowerPosition = flower.get("position").toJS();
    const distanceFromFlower = Math.min(0.1, remainingLength + 0.01);
    const positionNearFlower = Calculator.getPositionAtDistance(flowerPosition, randomPosition,
      distanceFromFlower);
    player = player.set("remainingLength", remainingLength);
    player = player.set("position", Immutable.fromJS(positionNearFlower));
    this._players = this._players.set(this._activePlayerId, player);

    // Update score.
    this._updateScore();

    // Choose next player.
    let nextPlayerId = this._activePlayerId;
    while (!this._isGameOver) {
      nextPlayerId = (nextPlayerId + 1) % this._players.size;
      if (Logic.canPlay(nextPlayerId, this._players, this._flowers, this._connections)) {
        this._activePlayerId = nextPlayerId;
        break;
      }
      if (nextPlayerId === this._activePlayerId) {
        this._isGameOver = true;
        break;
      }
    }
  }

  setHalfConnection(playerId, position) {
    if (this._isGameOver || !this._isGameStarted) {
      return;
    }
    let player = this._players.get(playerId);
    const playerConnections = this._connections.get(playerId);
    if (playerConnections.size <= 0) {
      return;
    }
    const lastFlowerId = playerConnections.last();
    const lastFlower = this._flowers.get(lastFlowerId);
    const lastFlowerPosition = lastFlower.get("position").toJS();
    const remaining = player.get("remainingLength");
    const distance = Calculator.getDistanceBetweenPositions(lastFlowerPosition, position);
    let finalPosition = position;
    if (distance > remaining) {
      finalPosition = Calculator.getPositionAtDistance(lastFlowerPosition, position, remaining);
    }
    player = player.set("position", Immutable.fromJS(finalPosition));
    this._players = this._players.set(playerId, player);
  }

  _updateScore() {
    this._players.forEach((player, playerId) => {
      const score = Logic.countScore(playerId, this._players, this._flowers, this._connections);
      this._players = this._players.set(playerId, player.set("score", score));
    });
  }

  _clearConnections() {
    this._connections = this._connections.withMutations((connections) => {
      connections.forEach((c, playerId) => {
        connections.set(playerId, new Immutable.List([]));
      });
    });
  }
}

const store = new GardenStore();

// Register callback to handle all updates
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionConstants.GARDEN_START_GAME:
      store.startGame();
      store.emitChange();
      break;
    case ActionConstants.GARDEN_NEW_GAME:
      store.newGame();
      store.emitChange();
      break;
    case ActionConstants.GARDEN_ADD_FLOWER:
      store.addFlower(action.flower);
      store.emitChange();
      break;
    case ActionConstants.GARDEN_ADD_PLAYER:
      store.addPlayer(action.color);
      store.emitChange();
      break;
    case ActionConstants.GARDEN_REMOVE_PLAYER:
      store.removePlayer(action.playerId);
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
