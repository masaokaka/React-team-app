
import { useHistory } from 'react-router-dom';
import { auth , db } from '../firebase/index';
import axios from 'axios';
import { useState } from 'react';



export const Register = () => {
  const [name,setName]= useState([])
  const [email,setEmail]= useState([])
  const [zip,setZip]= useState([])
  const [address,setAddress] = useState([])
  const [tell,setTell]= useState([])
  const [password,setPassword]= useState([])
  const [confirm,setConfirm]= useState([])
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
      }
      
      const ClearName = (e) => {
        const nameChecked = e.target.value
          setName(e.target.value)
        
      }

      const ClearEmail = (e) => {
        setEmail(e.target.value)
      }

      const ClearZip = (e) => {
        setZip(e.target.value)
      }

      const ClearAddress = (e) => {
        setAddress(e.target.value)
      }

      const ClearTell = (e) => {
        setTell(e.target.value)
      }

      const ClearPassword = (e) => {
        setPassword(e.target.value)
      }

      const ClearConfirm = (e) => {
        setConfirm(e.target.value)
      }

      //ユーザー登録処理（エラー文の実装の余地あり）
      const handleRegist = (e) =>{
        console.log(e.target.previousElementSibling.getElementsByTagName('input'))
        let listElements = Array.from(e.target.previousElementSibling.getElementsByTagName('input'));
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
  
  //住所検索処理(エラー文の実装の余地あり)
  const searchAddress = () => {
    const zipValue = document.getElementById('zip').value
    let addressValue = document.getElementById('address').value
    //不正な値の場合処理をはじく
    axios.get(`https://api.zipaddress.net/?zipcode=${zipValue}`)
    .then(res => {
      setAddress(res.data.data.fullAddress)
      addressValue = address
    }).catch(()=> setAddress('取得に失敗しました'))
  }

  



  

  return (
    

    <div>
        <div>
        <label>名前</label>
          <input name='name' type="text" value={name} onChange={(e) => ClearName(e)}/>

          <label>メールアドレス</label>
          <input name="email" type="text" value={email} onChange={(e) => ClearEmail(e)}/>

          <button type="button" onClick={() => searchAddress()}>住所検索</button>
          <label>郵便番号</label>
          <input id='zip' name="zip" type="text" value={zip} onChange={(e) => ClearZip(e)}/>

          <label >住所</label>
          <input id="address" name="address" type="text"  value={address} onChange={(e) => ClearAddress(e)}/>

          <label >電話番号</label>
          <input name="tel" type="text" value={tell} onChange={(e) => ClearTell(e)}/>

          <label>パスワード</label>
          <input name="password" type="text" value={password} onChange={(e) => ClearPassword(e)}/>

          <label>確認用パスワード</label>
          <input type="text" value={confirm} onChange={(e) => ClearConfirm(e)}/>
        </div>

          <button type="button" onClick={(e) => handleRegist(e)}>登録</button>
          <button type="button" onClick={()=>clearText()}>クリア</button>
    </div>
  )
};
