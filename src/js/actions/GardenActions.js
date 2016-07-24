import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionConstants from "../constants/ActionConstants";

const SpaceActions = {
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
  addConnection: (playerId, flowerId) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_ADD_CONNECTION,
      playerId,
      flowerId,
    });
  },
};

export default SpaceActions;
