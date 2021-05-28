import React, { Component, useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { OrderComp } from "../../views/OrderComp";
import { db } from "../../firebase/index";
export const Order = () => {
  //////////バリデーション
  // const [ordername, setName] = useState("");
  // const [orderemail, setEmail] = useState("");
  // const [orderzip, setZip] = useState("");
  // const [orderaddress, setAddress] = useState("");
  // const [ordertel, setTel] = useState("");
  // const [orderdate, setDate] = useState("");
  // const [ordercredit, setCredit] = useState("");
  // const [isError, setIsError] = useState(false); //falseならエラーなし、trueならエラー

  ////////////firestoreからデータ取得///
  const [userdata, setUserdata] = useState({}); //ユーザー情報をオブジェクトの形にして表示
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleLink = (path) => history.push(path);

  // const checkName = (name) => {
  //   setName(name.target.value); //入力値を取得
  //   console.log(ordername); //stateに入力値が代入された
  //   if (!ordername) {
  //     setIsError(true);
  //   } else {
  //     setIsError(false);
  //   }
  // };

  // const checkMail = (email) => {
  //   //第二引数にコールバック？？？
  //   setEmail(email.target.value);
  //   console.log(orderemail);
  //   if (!orderemail) {
  //     setIsError(true);
  //   } else {
  //     setIsError(false);
  //   }
  // };
  // const checkZip = (zip) => {
  //   setZip(zip.target.value);
  //   console.log(orderzip);
  // };
  // const checkAddress = (address) => {
  //   setAddress(address.target.value);
  //   console.log(orderaddress);
  // };
  // const checkTel = (tel) => {
  //   setTel(tel.target.value);
  //   console.log(ordertel);
  // };
  // const checkDate = (date) => {
  //   setDate(date.target.value);
  //   console.log(orderdate);
  // };
  // const checkCard = (credit) => {
  //   setCredit(credit.target.value);
  //   console.log(ordercredit);
  // };

  useEffect(() => {
    db.collection(`users/${user.uid}/userInfo`)
      .get()
      .then((res) => {
        let userobj = res.docs[0].data(); //._delegate._document.data.partialValue.mapValue.fields
        console.log(userobj); //ユーザ情報をfirebaseから取得できた
        //firebaseのユーザ情報をstateのオブジェクトに返しstateから情報を取得できた
        setUserdata(userobj);
      });
  }, []); //マウント時に表示できるようにする
  ////////入力内容の更新処理
  const newname = (e) => {
    setUserdata({ ...userdata, name: e.target.value });
    console.log(userdata.name);
  };
  const newmail = (e) => {
    setUserdata({ ...userdata, email: e.target.value });
    console.log(userdata.email);
  };
  const newzip = (e) => {
    setUserdata({ ...userdata, zip: e.target.value });
    console.log(userdata.zip);
  };
  const newtel = (e) => {
    setUserdata({ ...userdata, tel: e.target.value });
    console.log(userdata.tel);
  };
  const newaddress = (e) => {
    setUserdata({ ...userdata, address: e.target.value });
    console.log(userdata.address);
  };
  const newdate = (e) => {
    setUserdata({ ...userdata, date: e.target.value });
  };
  const setPaymentCash = (e) => {
    setUserdata({ ...userdata, payment: e.target.value });
  };
  const setPaymentCredit = (e) => {
    setUserdata({ ...userdata, payment: e.target.value });
  };

  const time10 = (e) => {
    setUserdata({ ...userdata, time: e.target.value });
  };
  const time11 = (e) => {
    setUserdata({ ...userdata, time: e.target.value });
  };
  const time12 = (e) => {
    setUserdata({ ...userdata, time: e.target.value });
  };
  const time13 = (e) => {
    setUserdata({ ...userdata, time: e.target.value });
  };
  const time14 = (e) => {
    setUserdata({ ...userdata, time: e.target.value });
  };
  const time15 = (e) => {
    setUserdata({ ...userdata, time: e.target.value });
  };
  const time16 = (e) => {
    setUserdata({ ...userdata, time: e.target.value });
  };
  const time17 = (e) => {
    setUserdata({ ...userdata, time: e.target.value });
  };
  const time18 = (e) => {
    setUserdata({ ...userdata, time: e.target.value });
  };

  const checkCard = (e) => {
    setUserdata({ ...userdata, creditcardNo: e.target.value });
  };

  console.log(userdata);

  /////注文処理
  const addOrder = () => {
    console.log("注文完了");
    //入力したお届け先情報をfirestoreのorderテーブルに追加したい
  };

  return (
    <React.Fragment>
      <Router>
        <div>
          <br />
          注文確認画面です。
          <form>
            <div>
              <h3>お届け先情報</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div>お名前</div>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="name"
                        value={userdata.name}
                        onChange={(e) => newname(e)}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>メールアドレス</div>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="mail"
                        value={userdata.email}
                        onChange={(e) => newmail(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>郵便番号</div>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={userdata.zip}
                        onChange={(e) => newzip(e)}
                      ></input>
                      &nbsp;&nbsp;
                      <button>住所検索</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>住所</div>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={userdata.address}
                        onChange={(e) => newaddress(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>電話番号</div>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={userdata.tel}
                        onChange={(e) => newtel(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>配達日時</div>
                    </td>
                    <td>
                      <input type="date" onChange={(e) => newdate(e)} />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <input
                        type="radio"
                        name="time"
                        velue="10"
                        onChange={(e) => time10(e)}
                      />
                      10時
                      <input
                        type="radio"
                        name="time"
                        velue="11"
                        onChange={(e) => time11(e)}
                      />
                      11時
                      <input
                        type="radio"
                        name="time"
                        velue="12"
                        onChange={(e) => time12(e)}
                      />
                      12時
                      <input
                        type="radio"
                        name="time"
                        velue="13"
                        onChange={(e) => time13(e)}
                      />
                      13時
                      <input
                        type="radio"
                        name="time"
                        velue="14"
                        onChange={(e) => time14(e)}
                      />
                      14時
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="time"
                        velue="15"
                        onChange={(e) => time15(e)}
                      />
                      15時
                      <input
                        type="radio"
                        name="time"
                        velue="16"
                        onChange={(e) => time16(e)}
                      />
                      16時
                      <input
                        type="radio"
                        name="time"
                        velue="17"
                        onChange={(e) => time17(e)}
                      />
                      17時
                      <input
                        type="radio"
                        name="time"
                        velue="18"
                        onChange={(e) => time18(e)}
                      />
                      18時
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>支払方法</div>
                    </td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="pay"
                          velue="1"
                          onChange={(e) => setPaymentCash(e)}
                        ></input>
                        代金引換
                        <input
                          type="radio"
                          name="pay"
                          velue="2"
                          onChange={(e) => setPaymentCredit(e)}
                        ></input>
                        クレジットカード決済
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>カード番号</div>
                    </td>
                    <td>
                      <input type="text" onChange={(e) => checkCard(e)} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link to="/ordercomp">
              <button
                type="submit"
                onClick={(addOrder, () => handleLink("../../views/OrderComp"))}
              >
                この内容で注文する
              </button>
            </Link>
          </form>
        </div>
        {/* <Switch>
        <Route path="/ordercomp" exact component={OrderComp} />
        </Switch> */}
      </Router>
    </React.Fragment>
  );
};
