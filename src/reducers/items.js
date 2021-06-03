import { UPDATEITEMS } from "../actions";

const initialState = [];

export const items = (state = initialState, action) => {
  switch (action.type) {
    case UPDATEITEMS:
      return action.itemData;
    default:
      return state;
  }
};
