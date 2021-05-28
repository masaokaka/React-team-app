import { db } from "../firebase/index";
// サイドナビ
export const SIDENAV = "sidenav";
// ログイン/ログアウト
export const SETUSER = "setuser";
export const UNSETUSER = "unsetuser";
// 商品データ
export const ADDITEMS = "additem";
export const FETCHITEMS = "fetchitems";
//トッピングデータ
export const FETCHTOPPINGS = "fetchtoppings";
export const ADDTOPPINGS = "addtopping";
//カート
export const CREATECART = "createcart";
export const FETCHCART = "fetchcart";
export const UPDATECART = "updatecart";
export const DELETECART = "deletecart";
export const UNSETCART = "unsetcart";
export const FETCHCARTNOLOGIN = "fetchcart";

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
  type: UNSETUSER,
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
export const additem = (newitems, uid) => (dispatch) => {
  db.collection(`admin/${uid}/item`)
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

//カートの商品を取得するーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const fetchcart = (uid) => (dispatch) => {
  if (uid !== null) {
    db.collection(`users/${uid}/orders`)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          if (doc.data().status === 0) {
            dispatch({
              type: FETCHCART,
              cartInfo: doc.data(), //オブジェクト
              id: doc.id,
            });
          }
        });
      });
  } else {
    dispatch({type:FETCHCARTNOLOGIN})
  }
};

//カートに商品を追加する処理ーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const updatecart = (itemInfo, uid, cartId) => (dispatch) => {
  //ログインチェック
  if (uid) {
    db.collection(`users/${uid}/orders`)
      .doc(cartId)
      .update({
        itemInfo: itemInfo,
      })
      .then(() => {
        dispatch({
          type: UPDATECART,
          itemInfo: itemInfo,
        });
      });
  } else {
    dispatch({
      type: UPDATECART,
      itemInfo: itemInfo, //itemInfo配列を渡してやる
    });
  }
};

//カートに商品を新しく作成する処理ーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const createcart = (cartInfo, uid) => (dispatch) => {
  //ログインチェック
  if (uid) {
    db.collection(`users/${uid}/orders`)
      .add(cartInfo)
      .then((doc) => {
        dispatch({
          type: CREATECART,
          cartInfo: cartInfo, //オブジェクト
          id: doc.id,
        });
      });
  } else {
    dispatch({
      type: CREATECART,
      cartInfo: cartInfo, //オブジェクト
      id: null,
    });
  }
};

//アイテムの削除ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const deletecart = (itemInfo, uid, cartId) => (dispatch) => {
  if (uid) {
    db.collection(`users/${uid}/orders`)
      .doc(cartId)
      .update({ itemInfo: itemInfo })
      .then(() => {
        dispatch({
          type: UPDATECART,
          itemInfo: itemInfo,
        });
      });
  } else {
    dispatch({
      type: UPDATECART,
      itemInfo: itemInfo,
    });
  }
};

//カートの中身を空にする処理(ログアウト時など)ーーーーーーーーーーーーーーーーーーーーーーー
export const unsetcart = () => ({
  type: UNSETCART,
});
