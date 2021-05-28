import { auth, db, sessionPersistance } from "../firebase/index";

export const SIDENAV = "sidenav";
export const SETUSER = "setuser";
export const UNSETUSER = "unsetuser";
export const ADDITEMS = "additem";
export const FETCHITEMS = "fetchitems";
export const FETCHTOPPINGS = "fetchtoppings";
export const ADDTOPPINGS = "addtopping";

export const sidenav = (onClose) => ({
  type: SIDENAV,
  onClose: onClose,
});

//ログイン
export const setuser = (user) => ({
  type: SETUSER,
  user: user,
});

//ログアウト
export const unsetuser = () => ({
  type: UNSETUSER
});

//管理者dbから商品情報をとってくる処理ーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const fetchitems = () => (dispatch) => {
  db.collection("admin/HdPaXiBx3VTswieJGJlFxLYOs092/item")
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        dispatch({
          type: ADDITEMS,
          itemData: doc.data().itemData, //配列
        });
      });
    });
};
///管理者dbへの商品情報追加処理
export const additem = (newitems) => (dispatch) => {
  db.collection("admin/HdPaXiBx3VTswieJGJlFxLYOs092/item")
    .doc("NZHyDjbIod0bUOEyaEW0")
    .update({ itemData: newitems })
    .then(() => {
      dispatch({
        type: ADDITEMS,
        itemData: newitems,
      });
    });
};

//管理者dbからトッピング情報をとってくる処理ーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const fetchtoppings = () => (dispatch) => {
  db.collection("admin/HdPaXiBx3VTswieJGJlFxLYOs092/topping")
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        dispatch({
          type: ADDTOPPINGS,
          toppingData: doc.data().toppingData, //配列
        });
      });
    });
};
//管理者dbへのトッピング情報追加処理
export const addtopping = (newtoppings) => (dispatch) => {
  db.collection("admin/HdPaXiBx3VTswieJGJlFxLYOs092/topping")
    .doc("Jc8Ne4Bnwxjd286jYN50")
    .update({ toppingData: newtoppings })
    .then(() => {
      dispatch({
        type: ADDTOPPINGS,
        toppingData: newtoppings,
      });
    });
};
