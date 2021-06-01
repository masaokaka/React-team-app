import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Button,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { db } from "../../firebase/index";
import { order } from "../../actions";
import { ORDER_STATUS_PAID, ORDER_STATUS_UNPAID } from "../../status/index";

export const Order = (props) => {
  //バリデージョン
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
  const [creditcardflag, setCreditcardflag] = useState(false);
  const [timeError, setTimeError] = useState("");
  const [timeFlag, setTimeFlag] = useState(false);
  const [cardSelectError, setcardSelectError] = useState("");
  const [cardSelectFlag, setcardSelectFlag] = useState(false);
  const [creditShowFlag, setcreditShowFlag] = useState(false);

  //firestoreからデータ取得
  const [userdata, setUserdata] = useState({
    name: "",
    address: "",
    email: "",
    card: "",
    date: "",
    payment: "",
    status: "",
    tel: "",
    zip: "",
  }); //ユーザー情報をオブジェクトの形にして表示
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLink = (path) => history.push(path);

  useEffect(() => {
    db.collection(`users/${props.user.uid}/userInfo`)
      .get()
      .then((res) => {
        let userobj = res.docs[0].data(); //帰ってきたresのオブジェクトの中から登録情報を抽出
        setUserdata(userobj);
      });
  }, []); //ユーザ情報をマウント時に表示

  //入力内容の更新処理
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

  const checkaddress = (address) => {
    setUserdata({ ...userdata, address: address });
    if (address === "") {
      setAddressError("住所を入力して下さい");
      setAddressFlag(false);
    } else if (address === "取得に失敗しました") {
      setAddressError("正しい住所を入力して下さい");
      setAddressFlag(false);
    } else {
      setAddressError("");
      setAddressFlag(true);
    }
  };

  //【住所検索処理】(エラー文の実装の余地あり)
  const searchAddress = () => {
    axios
      .get(`https://api.zipaddress.net/?zipcode=${userdata.zip}`)
      .then((res) => {
        setUserdata({ ...userdata, address: res.data.data.fullAddress });
        checkaddress(res.data.data.fullAddress);
      })
      .catch(() => setUserdata({ ...userdata, address: "取得に失敗しました" }));
  };

  let today = new Date(); //日付選択で今日より前の日付を選べないようにする
  let thisYear = today.getFullYear();
  let thisMonth = ("00" + (today.getMonth() + 1)).slice(-2);
  let thisDate = ("00" + today.getDate()).slice(-2);
  today = `${thisYear}-${thisMonth}-${thisDate}T00:00`;

  const checkdate = (e) => {
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
  };
  const setPaymentCash = (e) => {
    setUserdata({
      ...userdata,
      payment: e.target.value,
      status: ORDER_STATUS_UNPAID,
    });
    setcardSelectError("");
    setcardSelectFlag(false);
    setcreditShowFlag(false);
  };
  const setPaymentCredit = (e) => {
    setUserdata({
      ...userdata,
      payment: e.target.value,
      status: ORDER_STATUS_PAID,
    });
    setcardSelectError("");
    setcardSelectFlag(true);
    setcreditShowFlag(true);
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

  const checkInput = () => {
    if (cardSelectFlag) {
      if (
        nameFlag &&
        emailFlag &&
        zipFlag &&
        addressFlag &&
        tellFlag &&
        timeFlag &&
        creditcardflag
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        nameFlag &&
        emailFlag &&
        zipFlag &&
        addressFlag &&
        tellFlag &&
        timeFlag
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  //checkCardで取得したinputのvalueがcash(代引き)ならstatus=1,credit(クレカ)ならstatus=2
  const confirmOrder = () => {
    let check = checkInput();
    if (check) {
      if (window.confirm("注文してもよろしいですか？")) {
        userdata.orderDate = parseInt(new Date() / 1000);
        userdata.totalPrice = props.totalPrice;
        dispatch(order(userdata, props.user.uid, props.cartInfo.id));
        handleLink("/ordercomp");
      }
    } else {
      alert("入力内容にエラーがあります");
    }
  };

  return (
    <React.Fragment>
      <Grid container alignItems="center" justify="center" spacing={0}>
        <br />
        <div>
          <Box fontSize="h4.fontSize" textAlign="center">
            お届け先情報
          </Box>
          <div>
            <label>お名前</label>
          </div>
          <TextField
            type="text"
            id="name"
            variant="outlined"
            value={userdata.name}
            onChange={(e) => checkname(e)}
            helperText={nameError}
          />
          <div>メールアドレス</div>
          <TextField
            type="text"
            id="mail"
            variant="outlined"
            value={userdata.email}
            onChange={(e) => checkmail(e)}
            helperText={emailError}
          />
          <div>郵便番号</div>
          <TextField
            type="text"
            variant="outlined"
            value={userdata.zip}
            onChange={(e) => checkzip(e)}
            helperText={zipError}
          />
          <Button
            variant="contained"
            type="button"
            onClick={() => searchAddress()}
          >
            住所検索
          </Button>
          <div>住所</div>
          <TextField
            type="text"
            value={userdata.address}
            onChange={(e) => checkaddress(e.target.value)}
            helperText={addressError}
            variant="outlined"
          />
          <div>電話番号</div>
          <TextField
            type="text"
            variant="outlined"
            value={userdata.tel}
            onChange={(e) => checktel(e)}
            helperText={tellError}
          />
          <div>配達日時</div>
          <TextField
            type="datetime-local"
            variant="outlined"
            onChange={(e) => checkdate(e)}
            helperText={timeError}
          />
          <div>支払方法</div>
          <FormControl>
            <RadioGroup>
              <FormControlLabel
                control={<Radio />}
                name="pay"
                value="cash"
                label="代金引換"
                labelPlacement="end"
                onChange={(e) => setPaymentCash(e)}
              />
              <FormControlLabel
                control={<Radio />}
                name="pay"
                value="credit"
                label="クレジットカード決済"
                labelPlacement="end"
                onChange={(e) => setPaymentCredit(e)}
              />
            </RadioGroup>
          </FormControl>
          <FormHelperText>{cardSelectError}</FormHelperText>
          {creditShowFlag && (
            <div>
              <div>カード番号</div>
              <TextField
                type="text"
                variant="outlined"
                onChange={(e) => checkCard(e)}
                helperText={creditcardError}
                inputProps={{
                  maxLength: 16,
                }}
              />
            </div>
          )}
          <Button variant="contained" type="button" onClick={confirmOrder}>
            この内容で注文する
          </Button>
        </div>
      </Grid>
    </React.Fragment>
  );
};
