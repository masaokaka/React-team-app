import { useState } from 'react';
import { auth } from '../firebase/index';

export const Login = () => {
  const [mail,setMail] = useState()
  const [pass, setPass] = useState()
  const [uid,setUid] = useState()
  const submit = () => {
    auth.createUserWithEmailAndPassword(mail, pass).then(user => {
      console.log(user)
      setUid(user.user.uid)
    })
  }
  
  return (
    <div>
      <p>{ uid }</p>
      <input type="email" onChange={(e) => setMail(e.target.value)}/>
      <input type="password" onChange={(e) => setPass(e.target.value)}/>
      <button onClick={submit}>登録</button>
    </div>
  );
};
