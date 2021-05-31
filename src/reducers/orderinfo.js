import { FETCHORDER, UPDATEORDER } from "../actions";

const initialState = [];

export const orderinfo = (state = initialState, action) => {
  switch (action.type) {
    case FETCHORDER:
      return action.orderInfo;
    case UPDATEORDER:
      return action.orders;
    default:
      return state;
  }
};
