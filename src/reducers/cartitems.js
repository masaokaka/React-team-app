import { ADDCARTITEMS } from "../actions";

const initialState = [];

export const cartitems = (state = initialState, action) => {
  switch (action.type) {
    case ADDCARTITEMS:
      return action.itemData;
    default:
      return state;
  }
};
