import { combineReducers } from "redux";

//結合するファイルをインポート
import { sidenav } from "./sidenav";
import { items } from "./items";
import { toppings } from "./toppings";
import { user } from "./user";
import { cartinfo } from "./cartinfo";
import { orderinfo } from "./orderinfo";
import { userinfo } from "./userinfo";

export default combineReducers({
  sidenav,
  items,
  toppings,
  user,
  cartinfo,
  orderinfo,
  userinfo
}); //複数あれば,でくぎる
