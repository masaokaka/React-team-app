import { db, FirebaseTimestamp } from "../firebase/index";
import { ADMIN_ID, ITEMS_TABLE_ID, TOPPINGS_TABLE_ID } from "../status/index";
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
<<<<<<< HEAD
export const ADDORDER = "addorder";
=======
//カート
export const CREATECART = "createcart";
export const FETCHCART = "fetchcart";
export const UPDATECART = "updatecart";
export const DELETECART = "deletecart";
export const UNSETCART = "unsetcart";
export const FETCHCARTNOUSER = "fetchcartnouser";

//注文処理
export const ORDER = "order";
>>>>>>> develop

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
  db.collection(`admin/${ADMIN_ID}/item`)
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
  db.collection(`admin/${ADMIN_ID}/item`)
    .doc(ITEMS_TABLE_ID)
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
  db.collection(`admin/${ADMIN_ID}/topping`)
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
  db.collection(`admin/${ADMIN_ID}/topping`)
    .doc(TOPPINGS_TABLE_ID)
    .update({ toppingData: newtoppings })
    .then(() => {
      dispatch({
        type: ADDTOPPINGS,
        toppingData: newtoppings,
      });
    });
};

<<<<<<< HEAD
//order引っ張ってくる
export const fetchorder = () => (dispatch) => {
  db.collection(`users/AjVF9msWNWOoqQNumnKJrzAyWwF3/orders`)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        dispatch({
          type: ADDORDER,
          itemInfo: doc.data().itemInfo, //配列
        });
      });
=======
//カートの商品を取得するーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const fetchcart = (uid) => (dispatch) => {
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
};
export const fetchcartnouser = (cartInfo) => (dispatch) => {
  if (cartInfo !== null) {
    dispatch({
      type: FETCHCARTNOUSER,
      cartInfo: cartInfo,
    });
  } else {
    dispatch({
      type: FETCHCARTNOUSER,
      cartInfo: null,
    });
  }
};

//カートに商品を追加する処理ーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const updatecart = (cartInfo, uid) => (dispatch) => {
  //ログインチェック
  if (uid) {
    db.collection(`users/${uid}/orders`)
      .doc(cartInfo.id)
      .update({
        itemInfo: cartInfo.itemInfo,
      })
      .then(() => {
        dispatch({
          type: UPDATECART,
          cartInfo: cartInfo,
        });
      });
  } else {
    dispatch({
      type: UPDATECART,
      cartInfo: cartInfo, //itemInfo配列を渡してやる
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
        cartInfo.id = doc.id;
        dispatch({
          type: UPDATECART,
          cartInfo: cartInfo, //オブジェクト
        });
      });
  } else {
    cartInfo.id = null;
    dispatch({
      type: UPDATECART,
      cartInfo: cartInfo, //オブジェクト
    });
  }
};

//カートから商品を削除する処理ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const deletecart = (cartInfo, uid) => (dispatch) => {
  if (uid) {
    db.collection(`users/${uid}/orders`)
      .doc(cartInfo.id)
      .update({ itemInfo: cartInfo.itemInfo })
      .then(() => {
        dispatch({
          type: UPDATECART,
          cartInfo: cartInfo,
        });
      });
  } else {
    dispatch({
      type: UPDATECART,
      cartInfo: cartInfo,
    });
  }
};

//カートの中身を空にする処理(ログアウト時など)ーーーーーーーーーーーーーーーーーーーーーーー
export const unsetcart = () => ({
  type: UNSETCART,
});

//注文確定処理ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const order = (orderData, uid, cartId) => (dispatch) => {
  db.collection(`users/${uid}/orders`)
    .doc(cartId)
    .update(orderData)
    .then(() => {
      dispatch({
          type: UNSETCART,
        });
>>>>>>> develop
    });
};
