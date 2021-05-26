import { combineReducers } from "redux";

//結合するファイルをインポート
import { sidenav } from './sidenav'

export default combineReducers({ sidenav }); //複数あれば,でくぎる
