import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, sessionPersistance } from "../firebase/index";
import { Link } from "react-router-dom";
import { fetchcart, updatecart, createcart } from "../actions";
import { db } from "../firebase/index";

export const Login = () => {
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const cartInfo = useSelector((state) => state.cartinfo);

  //要バリデーション※※※
  const doLogin = () => {
    //ローカルストレージにアイテムがあった時
    let itemInfo = JSON.parse(localStorage.getItem("itemInfo"));
    //ログイン処理
    auth.setPersistence(sessionPersistance).then(() => {
      auth.signInWithEmailAndPassword(mail, pass).then((user) => {
        //ローカルにアイテムが保存されていた場合はdbのカートへ追加もしくは新規カート作成を行う
        if (itemInfo) {
          db.collection(`users/${user.user.uid}/orders`)
            .get()
            .then((snapShot) => {
              //そもそもorderにdoc自体が存在するかどうかをチェック
              if (snapShot.empty === false) {
                snapShot.forEach((doc) => {
                  if (doc.data().status === 0) {
                    let newCartInfo = JSON.parse(JSON.stringify(doc.data()));
                    newCartInfo.id = doc.id;
                    newCartInfo.itemInfo = [
                      ...newCartInfo.itemInfo,
                      ...itemInfo,
                    ];
                    dispatch(updatecart(newCartInfo, user.user.uid));
                  }
                });
                //doc自体が存在しなかった時はdbにdocを作る。
              } else if (snapShot.empty === true) {
                let newCartInfo = {
                  itemInfo: [...itemInfo],
                  status: 0,
                  userId: user.user.uid,
                };
                dispatch(createcart(newCartInfo, user.user.uid));
              }
            });
          localStorage.removeItem("itemInfo");
        }
        history.push("/cart");
      });
    });
  };
  return (
    <div>
      <input type="email" onChange={(e) => setMail(e.target.value)} />
      <input type="password" onChange={(e) => setPass(e.target.value)} />
      <button onClick={doLogin}>ログイン</button>
      <Link to="/register">ユーザー登録はこちら</Link>
    </div>
  );
};
