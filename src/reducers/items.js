import { ADDITEMS } from "../actions";

const initialState = [];

export const items = (state = initialState, action) => {
  switch (action.type) {
    case ADDITEMS:
      return action.itemData;
    default:
      return state;
  }
};
