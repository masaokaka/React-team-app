
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase/index'



export const Register = () => {

  const history = useHistory();
  const handleLink = path => history.push(path)

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

    console.log(valueList)
    auth.createUserWithEmailAndPassword(email, password)
    
    // handleLink('/')
  }
  
  return (
    

    <div>
        <div>
        <label>名前</label>
          <input name='name' type="text" />

          <label>メールアドレス</label>
          <input name="email" type="text" />

          <label>郵便番号</label>
          <input name="zip" type="text" />

          <label >住所</label>
          <input name="address" type="text" />

          <label >電話番号</label>
          <input name="tel" type="text" />

          <label>パスワード</label>
          <input name="password" type="text" />

          <label>確認用パスワード</label>
          <input type="text" />
        </div>

          <button type="button" onClick={(e) => handleRegist(e)}>登録</button>
          <button type="button">クリア</button>
    </div>
  )
};
