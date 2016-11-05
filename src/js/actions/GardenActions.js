import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionConstants from "../constants/ActionConstants";

const SpaceActions = {
  startGame: () => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_START_GAME,
    });
  },
  addFlower: (flower) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_ADD_FLOWER,
      flower,
    });
  },
  addPlayer: (color) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_ADD_PLAYER,
      color,
    });
  },
  removePlayer: (playerId) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_REMOVE_PLAYER,
      playerId,
    });
  },
  addConnection: (flowerId) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_ADD_CONNECTION,
      flowerId,
    });
  },
  setHalfConnection: (playerId, position) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_SET_HALF_CONNECTION,
      playerId,
      position,
    });
  },
};

export default SpaceActions;
