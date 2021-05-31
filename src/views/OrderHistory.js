import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchitems, fetchtoppings, fetchorder, updateorder } from "../actions";

const useStyles = makeStyles({
  table: {
    width: 1000,
  },
});

export const OrderHistory = () => {
  const user = useSelector((state) => state.user);
  const items = useSelector((state) => state.items);
  const toppings = useSelector((state) => state.toppings);
  const orderInfo = useSelector((state) => state.orderinfo);
  const dispatch = useDispatch();
  const classes = useStyles();

  /* const [orders, setOrders] = useState([...orderInfo]); */

  useEffect(() => {
    dispatch(fetchitems());
    dispatch(fetchtoppings());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchorder(user.uid));
    }
  }, [user]);

  const statechange = (index, orderId) => {
    if (window.confirm("キャンセルしてもよろしいですか？")) {
      let orders = [...orderInfo];
      orders[index].status = 9;
      db.collection(`users/${user.uid}/orders`)
        .doc(orderId)
        .update({ status: 9 })
        .then(() => {
          console.log(orders[index]);
          dispatch(updateorder(orders));
          console.log("動いた");
        });
    }
  };

  return (
    <div align="center">
      <h2>注文履歴一覧</h2>
      {orderInfo.length !== 0 && (
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">注文日</TableCell>
                <TableCell align="center">商品詳細</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orderInfo.map((order, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    注文日：{order.date}
                    <br />
                    小計：
                    <br />
                    <div>
                      {order.status === 1 && (
                        <button onClick={() => statechange(index, order.id)}>
                          注文をキャンセルする
                        </button>
                      )}
                      {order.status === 2 && (
                        <button onClick={() => statechange(index, order.id)}>
                          注文をキャンセルする
                        </button>
                      )}
                      {order.status === 9 && (
                        <span style={{ color: "red" }}>キャンセル済み</span>
                      )}
                      {order.status === 3 && (
                        <span style={{ color: "blue" }}>発送済み</span>
                      )}
                    </div>
                  </TableCell>
                  <TableRow>
                    <TableCell align="center">商品名</TableCell>
                    <TableCell align="center">サイズ</TableCell>
                    <TableCell align="center">トッピング</TableCell>
                  </TableRow>
                  {order.itemInfo.map((item, index) =>
                    items.map(
                      (it) =>
                        it.id === item.itemId && (
                          <TableRow key={index}>
                            <TableCell
                              component="th"
                              scope="items"
                              align="center"
                            >
                              <img src={it.img} height="120" alt="カレー" />
                              <br />
                              {it.name}
                            </TableCell>
                            {item.itemSize == 0 ? (
                              <TableCell align="center">
                                {it.mprice}円(Mサイズ)/{item.itemNum}個
                              </TableCell>
                            ) : (
                              <TableCell align="center">
                                {items.lprice}円(Lサイズ)/{item.itemNum}個
                              </TableCell>
                            )}
                            <TableCell align="center">
                              {item.toppings ? (
                                <div>
                                  {item.toppings.map((topping, index) =>
                                    toppings.map(
                                      (top) =>
                                        topping.toppingId === top.id && (
                                          <div key={index}>
                                            <span>{top.name}:</span>
                                            {topping.toppingSize === 0 ? (
                                              <span>{top.mprice}円</span>
                                            ) : (
                                              <span>{top.lprice}円</span>
                                            )}
                                          </div>
                                        )
                                    )
                                  )}
                                </div>
                              ) : (
                                <div>なし</div>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {orderInfo.length === 0 && <h3>注文履歴がありません</h3>}
      <Link to="/">
        <button>トップ画面に戻る</button>
      </Link>
    </div>
  );
};
