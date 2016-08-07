import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionConstants from "../constants/ActionConstants";

const SpaceActions = {
  startGame: (playerColors) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_START_GAME,
      playerColors,
    });
  },
  addFlower: (flower) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_ADD_FLOWER,
      flower,
    });
  },
  addPlayer: (player) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_ADD_PLAYER,
      player,
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
