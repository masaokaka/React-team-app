import { FETCHCART, FETCHCARTNOUSER, UPDATECART, UNSETCART } from "../actions";

const initialState = null;

export const cartinfo = (state = initialState, action) => {
  switch (action.type) {
    case FETCHCART:
      action.cartInfo.id = action.id;
      return action.cartInfo;
    case FETCHCARTNOUSER:
      let newState = JSON.parse(JSON.stringify(action.cartInfo));
      return newState;
    case UPDATECART:
      return action.cartInfo;
    case UNSETCART:
      return null;
    default:
      return state;
  }
};
