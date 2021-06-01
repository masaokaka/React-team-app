import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import { OrderInfo } from "./OrderInfo";
import { fetchitems, fetchtoppings, fetchorder } from "../../actions";

export const AdminUserEdit = () => {
  const [user, setUser] = useState();
  const [toggle, setToggle] = useState(false);
  const { userid } = useParams();
  const userInfo = useSelector((state) => state.userinfo);
  const items = useSelector((state) => state.items);
  const toppings = useSelector((state) => state.toppings);
  const orderInfo = useSelector((state) => state.orderinfo);
  const dispatch = useDispatch();

  useEffect(() => {
    let user = userInfo.filter((user) => user.userId === userid);
    setUser(user[0]);
  }, []);

  useEffect(() => {
    dispatch(fetchitems());
    dispatch(fetchtoppings());
  }, []);

  useEffect(() => {
    dispatch(fetchorder(userid));
  }, []);

  return (
    <Container align="center">
      <h2>ユーザー情報詳細：{userid}</h2>
      {user && (
        <div>
          <div>
            <strong>名前：</strong>
            {user.name}
          </div>
          <div>
            <strong>Email：</strong>
            {user.email}
          </div>
          <div>
            <strong>TEL：</strong>
            {user.tel}
          </div>
          <div>
            <strong>住所情報：</strong>
            <div>〒{user.zip}</div>
            <div>{user.address}</div>
          </div>
          <Button variant="contained" onClick={() => setToggle(!toggle)}>
            注文履歴の操作
          </Button>
          {toggle && (
            <OrderInfo
              userId={userid}
              items={items}
              toppings={toppings}
              orderInfo={orderInfo}
            />
          )}
        </div>
      )}
    </Container>
  );
};
