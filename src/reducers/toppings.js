import { ADDTOPPINGS } from "../actions";

const initialState = [];

export const toppings = (state = initialState, action) => {
  switch (action.type) {
    case ADDTOPPINGS:
      return action.toppingData;
    default:
      return state;
  }
};
