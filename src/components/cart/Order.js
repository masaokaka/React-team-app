import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { db } from "../../firebase/index";
import { order } from "../../actions";

export const Order = (props) => {
  //【バリデージョン】
  const [nameError, setNameError] = useState("");
  const [nameFlag, setNameFlag] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(true);
  const [zipError, setZipError] = useState("");
  const [zipFlag, setZipFlag] = useState(true);
  const [addressError, setAddressError] = useState("");
  const [addressFlag, setAddressFlag] = useState(true);
  const [tellError, setTellError] = useState("");
  const [tellFlag, setTellFlag] = useState(true);
  const [creditcardError, setCreditcardError] = useState("");
  const [creditcardflag, setCreditcardflag] = useState(true);
  const [timeError, setTimeError] = useState("");
  const [timeFlag, setTimeFlag] = useState(true);
  const [cardSelectError, setcardSelectError] = useState("");
  const [cardSelectFlag, setcrdSelectFlag] = useState(true);

  ////////////firestoreからデータ取得///
  const [userdata, setUserdata] = useState({}); //ユーザー情報をオブジェクトの形にして表示
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLink = (path) => history.push(path);

  useEffect(() => {
    db.collection(`users/${props.user.uid}/userInfo`)
      .get()
      .then((res) => {
        let userobj = res.docs[0].data(); //帰ってきたresのオブジェクトの中から登録情報を抽出
        setUserdata(userobj);
        setcardSelectError("支払方法を選択して下さい");
        setCreditcardflag(false);
        //setTimeSelectError("配達時間を選択して下さい");
        //settimeSelectFlag(false);
        setCreditcardError("クレジットカード番号を入力して下さい");
        setCreditcardflag(false);
        setTimeError("配達日時を入力して下さい");
        setTimeFlag(false);
      });
  }, []); //ユーザ情報をマウント時に表示できるように、第二引数に[]を指定

  //【入力内容の更新処理】
  const checkname = (e) => {
    const Check = e.target.value;
    setUserdata({ ...userdata, name: e.target.value });
    if (Check === "") {
      setNameError("名前を入力して下さい");
      setNameFlag(false);
    } else {
      setNameError("");
      setNameFlag(true);
    }
  };
  const checkmail = (e) => {
    const Check = e.target.value;
    const Validate = /.+@.+/;
    setUserdata({ ...userdata, email: e.target.value });
    if (Check === "") {
      setEmailError("メールアドレスを入力して下さい");
      setEmailFlag(false);
    } else if (!Check.match(Validate)) {
      setEmailError("メールアドレスの形式が不正です");
      setEmailFlag(false);
    } else {
      setEmailError("");
      setEmailFlag(true);
    }
  };
  const checkzip = (e) => {
    const Check = e.target.value;
    const Validate = /^\d{3}[-]\d{4}$/;
    setUserdata({ ...userdata, zip: e.target.value });
    if (Check === "") {
      setZipError("郵便番号を入力して下さい");
      setZipFlag(false);
    } else if (!Check.match(Validate)) {
      setZipError("郵便番号はXXX-XXXXの形式で入力して下さい");
      setZipFlag(false);
    } else {
      setZipError("");
      setZipFlag(true);
    }
  };
  const checktel = (e) => {
    const Check = e.target.value;
    const Validate = /\d{2,5}[-(]\d{1,4}[-)]\d{4}$/;
    setUserdata({ ...userdata, tel: e.target.value });
    if (Check === "") {
      setTellError("電話番号を入力して下さい");
      setTellFlag(false);
    } else if (!Check.match(Validate)) {
      setTellError("電話番号はXXX-XXXX-XXXXの形式で入力して下さい");
      setTellFlag(false);
    } else {
      setTellError("");
      setTellFlag(true);
    }
  };
  const checkaddress = (e) => {
    const Check = e.target.value;
    setUserdata({ ...userdata, address: e.target.value });
    if (Check === "") {
      setAddressError("住所を入力して下さい");
      setAddressFlag(false);
    } else if (Check === "取得に失敗しました") {
      setAddressError("正しい住所を入力して下さい");
      setAddressFlag(false);
    } else {
      setAddressError("");
      setAddressFlag(true);
    }
  };

  let today = new Date(); //カレンダーで今日より前の日付を選べないようにする
  let thisYear = today.getFullYear();
  let thisMonth = ("00" + (today.getMonth() + 1)).slice(-2);
  let thisDate = ("00" + today.getDate()).slice(-2);
  today = `${thisYear}-${thisMonth}-${thisDate}T00:00`;

  const checkdate = (e) => {
    //////////////////////////////////////////
    const Check = e.target.value;
    setUserdata({ ...userdata, date: e.target.value });
    if (Check === "") {
      setTimeError("配達日時を入力して下さい");
      setTimeFlag(false);
    } else {
      setTimeError("");
      setTimeFlag(true);
    }

    //今から3時間以内が選択されたらエラーメッセージ

    let clickday = new Date();
    let nowTimestamp = clickday.getTime();
    nowTimestamp = Math.floor(nowTimestamp / 1000);

    let thisHour = clickday.getHours();
    let thisMinutes = clickday.getMinutes();

    const checkyear = Check.slice(0, 4); //選択時間hourを取得
    const numCheckyear = Number(checkyear); //文字列を数字にする

    const checkmonth = Check.slice(5, 7); //選択時間hourを取得
    const numCheckmonth = Number(checkmonth); //文字列を数字にする

    const checkday = Check.slice(8, 10); //選択時間hourを取得
    const numCheckday = Number(checkday); //文字列を数字にする

    const checkhour = Check.slice(11, 13); //選択時間hourを取得
    const numCheckhour = Number(checkhour); //文字列を数字にする

    const checkMinutes = Check.slice(14, 16); //選択分minutesを取得
    const numCheckminutes = Number(checkMinutes); //文字列を数字にする

    const selectedDay = new Date(
      numCheckyear,
      numCheckmonth - 1,
      numCheckday,
      numCheckhour - 3, //後々の条件式のために3時間分減らしている
      numCheckminutes
    );

    const selectedTimestamp = Math.floor(selectedDay / 1000);
    if (nowTimestamp > selectedTimestamp) {
      setTimeError("今から3時間後の日時をご入力ください");
      setTimeFlag(false);
    } else {
      setTimeError("");
      setTimeFlag(true);
    }
  }; //////////////////////////////////////////////////////////////////////
  const setPaymentCash = (e) => {
    setUserdata({ ...userdata, payment: e.target.value, status: 1 });
    setcardSelectError("");
    setcrdSelectFlag(true);
  };
  const setPaymentCredit = (e) => {
    setUserdata({ ...userdata, payment: e.target.value, status: 2 });
    setcardSelectError("");
    setcrdSelectFlag(true);
  };

  const checkCard = (e) => {
    const Check = e.target.value;
    const Validate = /\d[0-9]{13}/g;
    setUserdata({ ...userdata, creditcardNo: e.target.value });
    setUserdata({ ...userdata, card: e.target.value });
    if (Check === "") {
      setCreditcardError("クレジットカード番号を入力して下さい");
      setCreditcardflag(false);
    } else if (!Check.match(Validate)) {
      setCreditcardError(
        "クレジットカード番号は14〜16桁の半角数字で入力してください"
      );
      setCreditcardflag(false);
    } else {
      setCreditcardError("");
      setCreditcardflag(true);
    }
  };

  //【住所検索処理】(エラー文の実装の余地あり)
  const searchAddress = () => {
    const zipValue = userdata.zip;
    let addressValue = userdata.address;
    //不正な値の場合処理をはじく
    axios
      .get(`https://api.zipaddress.net/?zipcode=${zipValue}`)
      .then((res) => {
        setUserdata({ ...userdata, address: res.data.data.fullAddress });
        addressValue = userdata.address;
      })
      .catch(() => setUserdata({ ...userdata, address: "取得に失敗しました" }));
  };

  //【注文情報追加】注文情報をfirebaseに追加（add()）し、statusを１または２に更新（update()）する処理
  //checkCardで取得したinputのvalueがcash（代引き）ならstatus=1,credit（クレカ）ならstatus=2
  const confirmOrder = () => {
    if (
      nameFlag &&
      emailFlag &&
      zipFlag &&
      addressFlag &&
      tellFlag &&
      timeFlag &&
      creditcardflag &&
      cardSelectFlag
    ) {
      if (window.confirm("注文してもよろしいですか？")) {
        userdata.orderDate = new Date()
        userdata.totalPrice = props.totalPrice
        dispatch(order(userdata, props.user.uid, props.cartInfo.id));
        handleLink("/ordercomp");
      }
    } else {
      alert("入力内容にエラーがあります");
    }
  };
  return (
    <React.Fragment>
      <div>
        <br />
        注文確認画面です。
        <form>
          <div>
            <h3>お届け先情報</h3>
            <div>
              <label>お名前</label>
            </div>
            <input
              type="text"
              id="name"
              value={userdata.name}
              onChange={(e) => checkname(e)}
            ></input>
            <p>{nameError}</p>
            <div>メールアドレス</div>
            <input
              type="text"
              id="mail"
              value={userdata.email}
              onChange={(e) => checkmail(e)}
            />
            <p>{emailError}</p>
            <div>郵便番号</div>
            <input
              type="text"
              value={userdata.zip}
              onChange={(e) => checkzip(e)}
            ></input>
            <Button
              variant="contained"
              type="button"
              onClick={() => searchAddress()}
            >
              住所検索
            </Button>
            <p>{zipError}</p>
            <div>住所</div>
            <input
              type="text"
              value={userdata.address}
              onChange={(e) => checkaddress(e)}
            />
            <p>{addressError}</p>
            <div>電話番号</div>
            <input
              type="text"
              value={userdata.tel}
              onChange={(e) => checktel(e)}
            />
            <p>{tellError}</p>
            <div>配達日時</div>
            <input
              type="datetime-local"
              min={today}
              onChange={(e) => checkdate(e)}
            />
            <p>{timeError}</p>
            <div>支払方法</div>
            <label>
              <input
                type="radio"
                name="pay"
                value="cash"
                onChange={(e) => setPaymentCash(e)}
              ></input>
              代金引換
              <input
                type="radio"
                name="pay"
                value="credit"
                onChange={(e) => setPaymentCredit(e)}
              ></input>
              クレジットカード決済
            </label>
            <p>{cardSelectError}</p>
            <div>カード番号</div>
            <input type="text" maxlength="16" onChange={(e) => checkCard(e)} />
          </div>
          <p>{creditcardError}</p>
          <Button variant="contained" type="button" onClick={confirmOrder}>
            この内容で注文する
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};
