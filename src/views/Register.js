import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase/index";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adduserinfo } from "../actions";
import {TextField,
        Button, 
        Container,
        makeStyles,
        Grid
        } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width:400, 
    },
  },
})) 

export const Register = () => {
  const classes = useStyles()
  const [name,setName]= useState([])
  const [nameError,setNameError]= useState('')
  const [nameFlag,setNameFlag] = useState(true)
  const [email,setEmail]= useState([])
  const [emailError,setEmailError]= useState('')
  const [emailFlag,setEmailFlag] = useState(true)
  const [zip,setZip]= useState([])
  const [zipError,setZipError]= useState('')
  const [zipFlag,setZipFlag] = useState(true)
  const [address,setAddress] = useState([])
  const [addressError,setAddressError]= useState('')
  const [addressFlag,setAddressFlag] = useState(true)
  const [tell,setTell]= useState([])
  const [tellError,setTellError]= useState('')
  const [tellFlag,setTellFlag] = useState(true)
  const [password,setPassword]= useState([])
  const [passwordError,setPasswordError]= useState('')
  const [passwordFlag,setPasswordFlag] = useState(true)
  const [confirm,setConfirm]= useState([])
  const [confirmError,setConfirmError]= useState('')
  const [confirmFlag,setConfirmFlag] = useState(true)
  const history = useHistory();
  const handleLink = (path) => history.push(path);
  const dispatch = useDispatch();

    //クリアボタン処理
      const clearText = () => {
        setName('');
        setEmail('');
        setZip('');
        setAddress('');
        setTell('');
        setPassword('');
        setConfirm('');
        setNameError('')
        setEmailError('')
        setZipError('')
        setAddressError('')
        setTellError('')
        setPasswordError('')
        setConfirmError('')
      }
      
      const ClearName = (e) => {
        const Check = e.target.value
        setName(e.target.value)
          if(Check === ''){
            setNameError('名前を入力して下さい');
            setNameFlag(false)
          }else{
            setNameError('');
            setNameFlag(true);
          }
      }

      const ClearEmail = (e) => {
        const Check = e.target.value
        const Validate = /.+@.+/
        setEmail(e.target.value)
        if(Check === ''){
          setEmailError('メールアドレスを入力して下さい')
          setEmailFlag(false)
        }else if(!Check.match(Validate)){
          setEmailError('メールアドレスの形式が不正です')
          setEmailFlag(false)
        }else { 
          setEmailError('')
          setEmailFlag(true)
        }
      }

      const ClearZip = (e) => {
        const Check = e.target.value
        const Validate = /^\d{3}[-]\d{4}$/
        setZip(e.target.value)
        if(Check === ''){
           setZipError('郵便番号を入力して下さい')
           setEmailFlag(false)
        }else if(!Check.match(Validate)){
          setZipError('郵便番号はXXX-XXXXの形式で入力して下さい')
          setZipFlag(false)
        }else { 
          setZipError('')
          setZipFlag(true)
        }
        
      }

      const ClearAddress = (e) => {
        const Check = e.target.value
        setAddress(e.target.value)
          if(Check === ''){
            setAddressError('住所を入力して下さい');
            setAddressFlag(false)
          }else {
            setAddressError('');
            setAddressFlag(true)
          }
      }

      const ClearTell = (e) => {
        const Check = e.target.value
        const Validate = /\d{2,5}[-(]\d{1,4}[-)]\d{4}$/
        setTell(e.target.value)
        if(Check === ''){
           setTellError('電話番号を入力して下さい')
           setTellFlag(false)
        }else if(!Check.match(Validate)){
          setTellError('電話番号はXXX-XXXX-XXXXの形式で入力して下さい')
          setTellFlag(false)
        }else { 
          setTellError('')
          setTellFlag(true)
        }
      }

       const ClearPassword = (e) => {
        const Check = e.target.value
        const Validate = /^[a-zA-Z0-9!#$%&()*+,.:;=?@[\]^_{}-]+$/
        setPassword(e.target.value)
        if(Check === ''){
           setPasswordError('パスワードを入力して下さい')
           setPasswordFlag(false)
        }else if(!Check.match(Validate)){
          setPasswordError('パスワードは半角英数字と記号「!@#$%^&*()_+-=[]{};:?,.」のみです')
          setEmailFlag(false)
        }else { 
          setPasswordError('')
          setPasswordFlag(true)
        }
      }

      const ClearConfirm = (e) => {
        setConfirm(e.target.value)
        const Check = e.target.value
        const passwordValue = document.getElementById('password').value
        const Validate = /^[a-zA-Z0-9!#$%&()*+,.:;=?@[\]^_{}-]+$/


        if(Check === ''){
           setConfirmError('確認用パスワードを入力して下さい')
           setConfirmFlag(false)
        }else if(!Check.match(Validate)){
          setConfirmError('確認用パスワードは半角英数字と記号「!@#$%^&*()_+-=[]{};:?,.」のみです')
          setConfirmFlag(false)
        }else if(Check !== passwordValue) {
            setConfirmError('パスワードが一致しません')
            setConfirmFlag(false)
        }else { 
          setConfirmError('')
          setConfirmFlag(true)
        }
      }

      //ユーザー登録処理（エラー文の実装の余地あり）
      const handleRegist = (e) =>{
        console.log(2)
        if(nameFlag && emailFlag && zipFlag && addressFlag &&tellFlag && passwordFlag && confirmFlag){
          console.log(3)
          let listElements = Array.from(e.target.previousElementSibling.getElementsByTagName('input'));
          console.log(listElements)
        const valueList = {};
        listElements.forEach((item) => {
          if(item.name){
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
            uid = user.uid
            valueList.userId = user.uid;
          }
        })
        .then(() => {
          db.collection(`users/${uid}/userInfo`).add(valueList);
          //管理者DBに登録情報を保存する処理
          console.log(valueList)
          // dispatch(adduserinfo(valueList));
        });
      handleLink("/");
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
    <Container maxWidth="sm">
          <form  className={classes.root} autoComplete='off'>
          
          <div>
            <div>
              <div style={{marginBottom: '1.5em'}}>
                  <TextField label='名前' name='name' value={name} onChange={(e) => ClearName(e)} helperText={nameError}/>
              </div>

              <div style={{marginBottom: '1.5em'}}>
                  <TextField label='メールアドレス' name="email" value={email} onChange={(e) => ClearEmail(e)} helperText={emailError}/>
              </div>
              
              
              <div style={{marginBottom: '1.5em'}}>
                  <TextField label='郵便番号' id='zip' name="zip" value={zip} onChange={(e) => ClearZip(e)} helperText={zipError}/>
              </div>
              <Button variant='contained' color='secondary' onClick={() => searchAddress()}>住所検索</Button>

              <div style={{marginBottom: '1.5em'}}>
                  <TextField label='住所' name="address" value={address} onChange={(e) => ClearAddress(e)} helperText={addressError}/>
              </div>

              <div style={{marginBottom: '1.5em'}}>
                  <TextField label='電話番号' name="tel" value={tell} onChange={(e) => ClearTell(e)} helperText={tellError}/>
              </div>

              <div style={{marginBottom: '1.5em'}}>
                  <TextField label='パスワード' id="password" type='password' name="password" value={password} onChange={(e) => ClearPassword(e)} helperText={passwordError}/>
              </div>

              <div style={{marginBottom: '1.5em'}}>
                  <TextField label='確認用パスワード' type='password' value={confirm} onChange={(e) => ClearConfirm(e)} helperText={confirmError}/>
              </div>
            </div>
              <Button variant='contained' color='secondary' onClick={(e) => handleRegist(e)}>登録</Button>
              <Button variant='contained' color='secondary' onClick={()=>clearText()}>クリア</Button>
        </div>
      </form>
    </Container>    
  )
};
