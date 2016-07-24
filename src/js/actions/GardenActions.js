import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionConstants from "../constants/ActionConstants";

const SpaceActions = {
  addFlower: (flower) => {
    AppDispatcher.dispatch({
      actionType: ActionConstants.GARDEN_ADD_FLOWER,
      flower,
    });
  },
};

export default SpaceActions;
