import { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {TOKEN_CHECK} from "../status/index"

export const OrderComp = () => {
  const { token } = useParams()
  const history = useHistory()
  useEffect(() => {
    if (token!==TOKEN_CHECK) {
      history.push("/")
    }
  })
  return (
    <div align="center">
      <h2>注文ありがとうございます！</h2>
      <h4>この度はご注文ありがとうございます。</h4>
      <h4>ご注文内容は、「注文履歴」からご確認ください。</h4>
      <Link to="/">
        <button>トップ画面に戻る</button>
      </Link>
    </div>
  );
};
