import { FETCHCART,FETCHCARTNOLOGIN,CREATECART,UPDATECART,UNSETCART } from "../actions";

const initialState = null;

export const cartinfo = (state = initialState, action) => {
  switch (action.type) {
    case FETCHCART:
      action.cartInfo.id = action.id
      return action.cartInfo;
    case CREATECART:
      action.cartInfo.id = action.id
      return action.cartInfo;
    case UPDATECART:
      state.itemInfo = action.itemInfo
      return state
    case UNSETCART:
      return null
    case FETCHCARTNOLOGIN:
      console.log('のろぐ')
      return state
    default:
      return state;
  }
};
