import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { createcart, fetchcart, updatecart } from "../actions";

//ランダム文字生成
const getUniqueStr = () => {
  return (
    new Date().getTime().toString(16) +
    Math.floor(1000 * Math.random()).toString(16)
  );
};

export const ItemInfo = () => {
  const user = useSelector((state) => state.user);
  const cartInfo = useSelector((state) => state.cartinfo); //オブジェクト
  const dispatch = useDispatch();
  const history = useHistory();

  //仮データーーーーーーーーーーーーー
  //商品詳細から追加される予定の形
  const item = {
    itemId: 8,
    itemNum: 4,
    itemSize: 1,
    toppings: [
      { toppingId: 11, toppingSize: 0 },
      { toppingId: 17, toppingSize: 1 },
    ],
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchcart(user.uid));
    }
  }, [user]);

  //カートにアイテムを追加する処理
  const doAddCart = () => {
    item.id = getUniqueStr();
    //ログイン確認してログインしていたらuidを渡す
    let uid;
    if (user) {
      uid = user.uid;
    } else {
      uid = null;
    }
    //カートにアイテムが入っていたら中身も一緒に渡す。
    if (cartInfo) {
      cartInfo.itemInfo = [...cartInfo.itemInfo, item]
      let newCartInfo = JSON.stringify(cartInfo)
      newCartInfo = JSON.parse(newCartInfo)
      dispatch(updatecart(newCartInfo,uid));
      history.push("/cart");
      //入ってなかったら配列に格納して渡す。
    } else {
      let newCartInfo = {
        itemInfo: [item],
        status: 0, //カート(あとで定数に置き換える)
        userId: uid,
      };
      dispatch(createcart(newCartInfo, uid));
      history.push("/cart");
    }
  };

  return (
    <div>
      {cartInfo !== null ? (
        cartInfo.itemInfo.length !== 0 && (
          <div>
            {cartInfo.itemInfo.map((item, index) => (
              <div key={index}>
                <p>id:{item.itemId}</p>
                <p>個数：{item.itemNum}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        <div>アイテムないよ</div>
      )}
      <h4>仮で作成↓押すと定数に入ったアイテムが登録される。</h4>
      <Button onClick={doAddCart} variant="contained">
        カートに入れる
      </Button>
    </div>
  );
};
