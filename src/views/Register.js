import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase/index";
import axios from "axios";
import { useState } from "react";
import firebase from "firebase";
import { ADMIN_ID, USERS_TABLE_ID } from "../status/index";

import {
  TextField,
  Button,
  Container,
  makeStyles,
  Grid,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 400,
    },
  },
  paper: {
    textAlign: "center",
  },
}));

export const Register = () => {
  const classes = useStyles();
  const [name, setName] = useState([]);
  const [nameError, setNameError] = useState("");
  const [nameFlag, setNameFlag] = useState(true);
  const [email, setEmail] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(true);
  const [zip, setZip] = useState([]);
  const [zipError, setZipError] = useState("");
  const [zipFlag, setZipFlag] = useState(true);
  const [address, setAddress] = useState([]);
  const [addressError, setAddressError] = useState("");
  const [addressFlag, setAddressFlag] = useState(true);
  const [tell, setTell] = useState([]);
  const [tellError, setTellError] = useState("");
  const [tellFlag, setTellFlag] = useState(true);
  const [password, setPassword] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(true);
  const [confirm, setConfirm] = useState([]);
  const [confirmError, setConfirmError] = useState("");
  const [confirmFlag, setConfirmFlag] = useState(true);
  const history = useHistory();
  const handleLink = (path) => history.push(path);

  //クリアボタン処理
  const clearText = () => {
    setName("");
    setEmail("");
    setZip("");
    setAddress("");
    setTell("");
    setPassword("");
    setConfirm("");
    setNameError("");
    setEmailError("");
    setZipError("");
    setAddressError("");
    setTellError("");
    setPasswordError("");
    setConfirmError("");
  };

  const ClearName = (e) => {
    const Check = e.target.value;
    setName(e.target.value);
    if (Check === "") {
      setNameError("名前を入力して下さい");
      setNameFlag(false);
    } else {
      setNameError("");
      setNameFlag(true);
    }
  };

  const ClearEmail = (e) => {
    const Check = e.target.value;
    const Validate = /.+@.+/;
    setEmail(e.target.value);
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

  const ClearZip = (e) => {
    const Check = e.target.value;
    const Validate = /^\d{3}[-]\d{4}$/;
    setZip(e.target.value);
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

  const ClearAddress = (e) => {
    const Check = e.target.value;
    setAddress(e.target.value);
    if (Check === "") {
      setAddressError("住所を入力して下さい");
      setAddressFlag(false);
    } else {
      setAddressError("");
      setAddressFlag(true);
    }
  };

  const ClearTell = (e) => {
    const Check = e.target.value;
    const Validate = /\d{2,5}[-(]\d{1,4}[-)]\d{4}$/;
    setTell(e.target.value);
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

  const ClearPassword = (e) => {
    const Check = e.target.value;
    const Validate = /^[a-zA-Z0-9!#$%&()*+,.:;=?@[\]^_{}-]+$/;
    setPassword(e.target.value);
    if (Check === "") {
      setPasswordError("パスワードを入力して下さい");
      setPasswordFlag(false);
    } else if (!Check.match(Validate)) {
      setPasswordError(
        "パスワードは半角英数字と記号「!@#$%^&*()_+-=[]{};:?,.」のみです"
      );
      setPasswordFlag(false);
    } else {
      setPasswordError("");
      setPasswordFlag(true);
    }
  };

  const ClearConfirm = (e) => {
    setConfirm(e.target.value);
    const Check = e.target.value;
    const passwordValue = document.getElementById("password").value;
    const Validate = /^[a-zA-Z0-9!#$%&()*+,.:;=?@[\]^_{}-]+$/;

    if (Check === "") {
      setConfirmError("確認用パスワードを入力して下さい");
      setConfirmFlag(false);
    } else if (!Check.match(Validate)) {
      setConfirmError(
        "確認用パスワードは半角英数字と記号「!@#$%^&*()_+-=[]{};:?,.」のみです"
      );
      setConfirmFlag(false);
    } else if (Check !== passwordValue) {
      setConfirmError("パスワードが一致しません");
      setConfirmFlag(false);
    } else {
      setConfirmError("");
      setConfirmFlag(true);
    }
  };

  //ユーザー登録処理（エラー文の実装の余地あり）
  const handleRegist = () => {
    let listElements = Array.from(document.getElementsByTagName("input"));
    const valueList = {};
    listElements.forEach((item) => {
      if (item.name) {
        valueList[item.name] = item.value;
      }
    });
    if (
      nameFlag &&
      emailFlag &&
      zipFlag &&
      addressFlag &&
      tellFlag &&
      passwordFlag &&
      confirmFlag
    ) {
      const email = valueList.email;
      const password = valueList.password;
      let uid = "";
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          let user = auth.currentUser;
          if (user != null) {
            uid = user.uid;
            valueList.userId = user.uid;
          }
        })
        .then(
          () => {
            db.collection(`users/${uid}/userInfo`).add(valueList);
            //新しく追加しました（管理者テーブルへの情報追加
            db.collection(`admin/${ADMIN_ID}/user`)
              .doc(USERS_TABLE_ID)
              .update({
                users: firebase.firestore.FieldValue.arrayUnion(valueList),
              });
            handleLink("/");
          },
          (error) => {
            if (
              error.message ===
              "The email address is already in use by another account."
            ) {
              console.log(error.message);
              setEmailError("※このメールアドレスはすでに使われています");
            }
          }
        );
    }
  };

  const searchAddress = () => {
    const zipValue = document.getElementById("zip").value;
    //不正な値の場合処理をはじく
    axios
      .get(`https://api.zipaddress.net/?zipcode=${zipValue}`)
      .then((res) => {
        setAddress(res.data.data.fullAddress);
        setAddressError("");
      })
      .catch(() => setAddress("取得に失敗しました"));
  };

  return (
    <form className={classes.root} autoComplete="off">
      <Grid container spacing={1} justify="center">
        <Grid item xs sx={{ mx: "auto" }}>
          <div>
            <TextField
              label="名前"
              name="name"
              value={name}
              onChange={(e) => ClearName(e)}
              helperText={nameError}
            />
          </div>
        </Grid>

        <Grid item xs>
          <div>
            <TextField
              label="メールアドレス"
              name="email"
              value={email}
              onChange={(e) => ClearEmail(e)}
              helperText={emailError}
            />
          </div>
        </Grid>

        <Grid item xs>
          <div>
            <TextField
              label="郵便番号"
              id="zip"
              name="zip"
              value={zip}
              onChange={(e) => ClearZip(e)}
              helperText={zipError}
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => searchAddress()}
          >
            住所検索
          </Button>
        </Grid>

        <Grid item xs>
          <div>
            <TextField
              label="住所"
              name="address"
              value={address}
              onChange={(e) => ClearAddress(e)}
              helperText={addressError}
            />
          </div>
        </Grid>

        <Grid item xs>
          <div>
            <TextField
              label="電話番号"
              name="tel"
              value={tell}
              onChange={(e) => ClearTell(e)}
              helperText={tellError}
            />
          </div>
        </Grid>

        <Grid item xs>
          <div>
            <TextField
              label="パスワード"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => ClearPassword(e)}
              helperText={passwordError}
            />
          </div>
        </Grid>

        <Grid item xs>
          <div>
            <TextField
              label="確認用パスワード"
              type="password"
              value={confirm}
              onChange={(e) => ClearConfirm(e)}
              helperText={confirmError}
            />
          </div>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => handleRegist()}
      >
        登録
      </Button>
      <Button variant="contained" color="secondary" onClick={() => clearText()}>
        クリア
      </Button>
    </form>
  );
};
