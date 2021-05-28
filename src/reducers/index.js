import { combineReducers } from "redux";

//結合するファイルをインポート
import { sidenav } from './sidenav'
import { items } from './items'
import { toppings } from './toppings'
import { user } from './user'

export default combineReducers({ sidenav,items,toppings,user }); //複数あれば,でくぎる
