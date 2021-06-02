import { FETCHORDER, UPDATEORDER,UNSETORDER } from "../actions";

const initialState = [];

export const orderinfo = (state = initialState, action) => {
  switch (action.type) {
    case FETCHORDER :
      action.orderInfo.sort((a, b) => b.orderDate - a.orderDate);
      return action.orderInfo;
    case UPDATEORDER:
      action.orderInfo.sort((a, b) => b.orderDate - a.orderDate);
      return action.orderInfo;
    case UNSETORDER:
      return action.orderInfo;
    default:
      return state;
  }
};
