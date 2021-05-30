import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchtoppings, addtopping } from "../../actions";
import { ADMIN_ID } from "../../status/index";
import Input from "@material-ui/core/Input";

export const AdminToppings = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [mprice, setMprice] = useState();
  const [lprice, setLprice] = useState();
  const dispatch = useDispatch();
  const toppings = useSelector((state) => state.toppings);

  //マウント時にユーザーがアドミンではなかった場合にはアクセス拒否
  useEffect(() => {
    if (user.uid !== ADMIN_ID) {
      history.push("/");
    }
  }, []);

  const doAddTopping = () => {
    let topping = {
      id: parseInt(id),
      name: name,
      mprice: parseInt(mprice),
      lprice: parseInt(lprice),
    };
    let newtoppings = [...toppings, topping];
    dispatch(addtopping(newtoppings));
    setId("");
    setName("");
    setMprice("");
    setLprice("");
  };

  //画面マウント時に実行
  useEffect(() => {
    dispatch(fetchtoppings());
  }, []);

  return (
    <React.Fragment>
      <div>
        <h2>トッピング追加フォーム</h2>
        <div>
          ID:
          <Input type="number" onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          名前:
          <Input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          Mサイズ金額:
          <Input type="number" onChange={(e) => setMprice(e.target.value)} />
        </div>
        <div>
          Lサイズ金額:
          <Input type="number" onChange={(e) => setLprice(e.target.value)} />
        </div>
        <Button variant="contained" onClick={doAddTopping}>
          登録
        </Button>
        {toppings.length !== 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>商品名</th>
                <th>価格(M)</th>
                <th>価格(L)</th>
              </tr>
            </thead>
            <tbody>
              {toppings.map((topping, index) => (
                <tr key={index}>
                  <td>{topping.id}</td>
                  <td>{topping.name}</td>
                  <td>{topping.mprice}円</td>
                  <td>{topping.lprice}円</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>商品がありません</div>
        )}
      </div>
    </React.Fragment>
  );
};
