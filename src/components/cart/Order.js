import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { OrderComp } from "../../views/OrderComp";
import { db } from "../../firebase/index";

export const Order = () => {
  const [ordername, setName] = useState("");
  const [orderemail, setEmail] = useState("");
  const [orderzip, setZip] = useState("");
  const [orderaddress, setAddress] = useState("");
  const [ordertel, setTel] = useState("");
  const [orderdate, setDate] = useState("");
  const [ordercredit, setCredit] = useState("");
  const [isError, setIsError] = useState(false); //falseならエラーなし、trueならエラー

  const checkName = (name) => {
    setName(name.target.value); //入力値を取得
    console.log(ordername); //stateに入力値が代入された
    if (!ordername) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const checkMail = (email) => {
    //第二引数にコールバック？？？
    setEmail(email.target.value);
    console.log(orderemail);
    if (!orderemail) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };
  const checkZip = (zip) => {
    setZip(zip.target.value);
    console.log(orderzip);
  };
  const checkAddress = (address) => {
    setAddress(address.target.value);
    console.log(orderaddress);
  };
  const checkTel = (tel) => {
    setTel(tel.target.value);
    console.log(ordertel);
  };
  const checkDate = (date) => {
    setDate(date.target.value);
    console.log(orderdate);
  };
  const checkCard = (credit) => {
    setCredit(credit.target.value);
    console.log(ordercredit);
  };

  const getUserInfo = () => {
    console.log("getUserInfo呼び出し");
    let userdata = {};
    db.collection(`users/Qk4xMuaeBuMccnx1gEb7fx207ah2/userInfo`)
      .get()
      .then((res) => {
        userdata = res;
        console.log(userdata);
        // snapShot.forEach((doc)=>{
        //   userdata.push(
        //     doc.data());
        // });
        // console.log(userdata)
      });
  };

  return (
    <React.Fragment>
      <Router>
        <div>
          <button onClick={getUserInfo}>consoleで確認</button>
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
                      <input type="text" id="name" onChange={checkName} />
                      {isError && <p> 名前を入力してください</p>}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>メールアドレス</div>
                    </td>
                    <td>
                      <input type="text" id="mail" onChange={checkMail} />
                      {isError && <p> メールアドレスを入力してください</p>}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>郵便番号</div>
                    </td>
                    <td>
                      <input type="text" onChange={checkZip}></input>
                      &nbsp;&nbsp;
                      <button>住所検索</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>住所</div>
                    </td>
                    <td>
                      <input type="text" onChange={checkAddress} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>電話番号</div>
                    </td>
                    <td>
                      <input type="text" onChange={checkTel} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>配達日時</div>
                    </td>
                    <td>
                      <input type="date" onChange={checkDate} />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <input type="radio" name="time" velue="10" />
                      10時
                      <input type="radio" name="time" velue="11" />
                      11時
                      <input type="radio" name="time" velue="12" />
                      12時
                      <input type="radio" name="time" velue="13" />
                      13時
                      <input type="radio" name="time" velue="14" />
                      14時
                    </td>
                    <td>
                      <input type="radio" name="time" velue="15" />
                      15時
                      <input type="radio" name="time" velue="16" />
                      16時
                      <input type="radio" name="time" velue="17" />
                      17時
                      <input type="radio" name="time" velue="18" />
                      18時
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>支払方法</div>
                    </td>
                    <td>
                      <label>
                        <input type="radio" name="pay" velue="cash"></input>
                        代金引換
                        <input
                          type="radio"
                          name="pay"
                          velue="creditcard"
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
                      <input type="text" onChange={checkCard} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link to="/ordercomp">
              <input type="submit" value="この内容で注文する" />
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
