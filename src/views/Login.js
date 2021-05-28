import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, sessionPersistance } from "../firebase/index";
import { Link } from "react-router-dom";

export const Login = () => {
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();
  const history = useHistory()

  //要バリデーション※※※
  const doLogin = () => {
    auth.setPersistence(sessionPersistance).then(() => {
      auth.signInWithEmailAndPassword(mail, pass).then(() => {
        history.push('/')
      })
    })
  }
  return (
    <div>
      <input type="email" onChange={(e) => setMail(e.target.value)} />
      <input type="password" onChange={(e) => setPass(e.target.value)} />
      <button onClick={doLogin}>ログイン</button>
      <Link to="/register">ユーザー登録はこちら</Link>
    </div>
  );
};
