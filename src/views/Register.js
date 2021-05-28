import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase/index";
import axios from "axios";
import { useState } from "react";

export const Register = () => {
  const [address, setAddress] = useState("");
  const history = useHistory();
  const handleLink = (path) => history.push(path);
  //ユーザー登録処理（エラー文の実装の余地あり）
  const handleRegist = (e) => {
    console.log(e.target.previousElementSibling.getElementsByTagName("input"));
    let listElements = Array.from(
      e.target.previousElementSibling.getElementsByTagName("input")
    );
    const valueList = {};
    listElements.forEach((item) => {
      if (item.name) {
        valueList[item.name] = item.value;
      }
    });
    const email = valueList.email;
    const password = valueList.password;
    let uid = "";
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = auth.currentUser;
        if (user != null) {
          uid = user.uid;
        }
      })
      .then(() => {
        db.collection(`users/w8fONIsHuYYfiFxMo7Q4OgrB2Ql1/userInfo`).add(
          valueList
        );
      });
    handleLink("/");
  };

  //住所検索処理(エラー文の実装の余地あり)
  const searchAddress = () => {
    const zipValue = document.getElementById("zip").value;
    let addressValue = document.getElementById("address").value;
    //不正な値の場合処理をはじく
    axios
      .get(`https://api.zipaddress.net/?zipcode=${zipValue}`)
      .then((res) => {
        setAddress(res.data.data.fullAddress);
        addressValue = address;
      })
      .catch(() => setAddress("取得に失敗しました"));
  };

  return (
    <div>
      <div>
        <label>名前</label>
        <input name="name" type="text" />

        <label>メールアドレス</label>
        <input name="email" type="text" />

        <button type="button" onClick={() => searchAddress()}>
          住所検索
        </button>
        <label>郵便番号</label>
        <input id="zip" name="zip" type="text" />

        <label>住所</label>
        <input id="address" name="address" type="text" defaultValue={address} />

        <label>電話番号</label>
        <input name="tel" type="text" />

        <label>パスワード</label>
        <input name="password" type="text" />

        <label>確認用パスワード</label>
        <input type="text" />
      </div>

      <button type="button" onClick={(e) => handleRegist(e)}>
        登録
      </button>
      <button type="button">クリア</button>
    </div>
  );
};
