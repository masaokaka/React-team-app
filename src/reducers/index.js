import { combineReducers } from "redux";

//結合するファイルをインポート
import { sidenav } from './sidenav'
import { items } from './items'
import { toppings } from './toppings'

export default combineReducers({ sidenav,items,toppings }); //複数あれば,でくぎる
