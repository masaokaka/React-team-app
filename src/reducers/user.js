import { SETUSER,UNSETUSER } from "../actions";

const initialState = null;

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SETUSER:
      return action.user;
    case UNSETUSER:
          return null
    default:
      return state;
  }
};
