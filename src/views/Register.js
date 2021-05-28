
import { useHistory } from 'react-router-dom';
import { auth , db } from '../firebase/index';
import axios from 'axios';
import { useState } from 'react';



export const Register = () => {
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
  const handleLink = path => history.push(path)

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
          setEmailFlag(false)
        }else { 
          setZipError('')
          setEmailFlag(true)
        }
        
      }

      const ClearAddress = (e) => {
        const Check = e.target.value
        setAddress(e.target.value)
          if(Check === ''){
            setAddressError('住所を入力して下さい');
            setEmailFlag(false)
          }else {
            setAddressError('');
            setEmailFlag(true)
          }
      }

      const ClearTell = (e) => {
        const Check = e.target.value
        const Validate = /\d{2,5}[-(]\d{1,4}[-)]\d{4}$/
        setTell(e.target.value)
        if(Check === ''){
           setTellError('電話番号を入力して下さい')
           setEmailFlag(false)
        }else if(!Check.match(Validate)){
          setTellError('電話番号はXXX-XXXX-XXXXの形式で入力して下さい')
          setEmailFlag(false)
        }else { 
          setTellError('')
          setEmailFlag(true)
        }
      }

      const ClearPassword = (e) => {
        const Check = e.target.value
        const Validate = /^[a-zA-Z0-9!#$%&()*+,.:;=?@\[\]^_{}-]+$/
        setPassword(e.target.value)
        if(Check === ''){
           setPasswordError('パスワードを入力して下さい')
           setEmailFlag(false)
        }else if(!Check.match(Validate)){
          setPasswordError('パスワードは半角英数字と記号「!@#$%^&*()_+-=[]{};:?,.」のみです')
          setEmailFlag(false)
        }else { 
          setPasswordError('')
          setEmailFlag(true)
        }
      }

      const ClearConfirm = (e) => {
        setConfirm(e.target.value)
        const Check = e.target.value
        const passwordValue = document.getElementById('password').value
        const Validate = /^[a-zA-Z0-9!#$%&()*+,.:;=?@\[\]^_{}-]+$/


        if(Check === ''){
           setConfirmError('確認用パスワードを入力して下さい')
           setEmailFlag(false)
        }else if(!Check.match(Validate)){
          setConfirmError('確認用パスワードは半角英数字と記号「!@#$%^&*()_+-=[]{};:?,.」のみです')
          setEmailFlag(false)
        }else if(Check !== passwordValue) {
            setConfirmError('パスワードが一致しません')
            setEmailFlag(false)
        }else { 
          setConfirmError('')
          setEmailFlag(true)
        }
      }

      //ユーザー登録処理（エラー文の実装の余地あり）
      const handleRegist = (e) =>{
        console.log(2)
        if(nameFlag && emailFlag){
          console.log(3)
          let listElements = Array.from(e.target.previousElementSibling.getElementsByTagName('input'));
          console.log(listElements)
        const valueList = {};
        listElements.forEach((item) => {
          if(item.name){
          valueList[item.name] = item.value;
          }
        })
        const email = valueList.email
        const password = valueList.password
        let uid = '';
        auth.createUserWithEmailAndPassword(email, password)
        .then(() =>{
          let user = auth.currentUser;
          if (user != null){
            uid = user.uid
          }
        }).then(() => {
          db.collection(`users/${uid}/userInfo`)
          .add(valueList)
        })
        handleLink('/')
        }
        
  }
  
  //住所検索処理(エラー文の実装の余地あり)
  const searchAddress = () => {
    const zipValue = document.getElementById('zip').value
    let addressValue = document.getElementById('address').value
    //不正な値の場合処理をはじく
    axios.get(`https://api.zipaddress.net/?zipcode=${zipValue}`)
    .then(res => {
      setAddress(res.data.data.fullAddress)
      addressValue = address
      setAddressError('')
    }).catch(()=> setAddress('取得に失敗しました'))
  }


  return (
    

    <div>
        <div>
          <div style={{marginBottom: '1.5em'}}>
              <label>名前</label><p>{nameError}</p>
              <input name='name' type="text" value={name} onChange={(e) => ClearName(e)}/>
          </div>

          <div style={{marginBottom: '1.5em'}}>
              <label>メールアドレス</label><p>{emailError}</p>
              <input name="email" type="text" value={email} onChange={(e) => ClearEmail(e)}/>
          </div>
          

          <div style={{marginBottom: '1.5em'}}>
              <button type="button" onClick={() => searchAddress()}>住所検索</button>
              <label>郵便番号</label><p>{zipError}</p>
              <input id='zip' name="zip" type="text" value={zip} onChange={(e) => ClearZip(e)}/>
          </div>

          <div style={{marginBottom: '1.5em'}}>
              <label >住所</label><p>{addressError}</p>
              <input id="address" name="address" type="text"  value={address} onChange={(e) => ClearAddress(e)}/>
          </div>

          <div style={{marginBottom: '1.5em'}}>
              <label >電話番号</label><p>{tellError}</p>
              <input name="tel" type="text" maxLength='13' value={tell} onChange={(e) => ClearTell(e)}/>
          </div>

          <div style={{marginBottom: '1.5em'}}>
              <label>パスワード</label><p>{passwordError}</p>
              <input id="password" name="password" type="text" value={password} onChange={(e) => ClearPassword(e)}/>
          </div>

          <div style={{marginBottom: '1.5em'}}>
              <label>確認用パスワード</label><p>{confirmError}</p>
              <input type="text" value={confirm} onChange={(e) => ClearConfirm(e)}/>
          </div>
        </div>

          <button type="button" onClick={(e) => handleRegist(e)}>登録</button>
          <button type="button" onClick={()=>clearText()}>クリア</button>
    </div>
  )
};
