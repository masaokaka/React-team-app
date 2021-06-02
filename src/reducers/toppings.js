import { UPDATETOPPINGS } from "../actions";

const initialState = [];

export const toppings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATETOPPINGS:
      action.toppingData.sort((a, b) => a.id - b.id);
      return action.toppingData;
    default:
      return state;
  }
};
