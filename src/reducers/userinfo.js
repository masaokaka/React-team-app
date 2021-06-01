import { FETCHUSERINFO } from "../actions";

const initialState = [];

export const userinfo = (state = initialState, action) => {
  switch (action.type) {
    case FETCHUSERINFO:
      return action.userInfo;
    default:
      return state;
  }
};
