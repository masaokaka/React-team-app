import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import React from "react";
import { timestampToDate } from "../status/functions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchitems, fetchtoppings, fetchorder, updateorder } from "../actions";
import {
  ORDER_STATUS_PAID,
  ORDER_STATUS_UNPAID,
  ORDER_STATUS_UNDELIVERIED,
  ORDER_STATUS_DELIVERIED,
  ORDER_STATUS_CANCELED,
} from "../status/index";

export const OrderHistory = () => {
  const user = useSelector((state) => state.user);
  const items = useSelector((state) => state.items);
  const toppings = useSelector((state) => state.toppings);
  const orderInfo = useSelector((state) => state.orderinfo);
  const dispatch = useDispatch();
  const history = useHistory();

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
      orders[index].status = ORDER_STATUS_CANCELED;
      db.collection(`users/${user.uid}/orders`)
        .doc(orderId)
        .update({ status: ORDER_STATUS_CANCELED })
        .then(() => {
          dispatch(updateorder(orders));
        });
    }
  };
  return (
    <div align="center">
      <h2>注文履歴一覧</h2>
      {orderInfo.length !== 0 && (
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  注文日時
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  合計金額(税抜)
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  ステータス
                </TableCell>
                <TableCell align="center" colSpan={6}>
                  商品情報
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderInfo.map((order, index) => (
                <TableRow key={index}>
                  <TableCell align="center" colSpan={2}>
                    {timestampToDate(order.orderDate)}
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    <h3>{order.totalPrice.toLocaleString()}円</h3>
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    {order.status === ORDER_STATUS_UNPAID && (
                      <div>
                        <h3 style={{ color: "red" }}>未入金</h3>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => statechange(index, order.id)}
                        >
                          注文キャンセル
                        </Button>
                      </div>
                    )}
                    {order.status === ORDER_STATUS_PAID && (
                      <div>
                        <h3 style={{ color: "orange" }}>入金済み</h3>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => statechange(index, order.id)}
                        >
                          注文キャンセル
                        </Button>
                      </div>
                    )}
                    {order.status === ORDER_STATUS_UNDELIVERIED && (
                      <div>
                        <h3 style={{ color: "orange" }}>発送前</h3>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => statechange(index, order.id)}
                        >
                          注文キャンセル
                        </Button>
                      </div>
                    )}
                    {order.status === ORDER_STATUS_DELIVERIED && (
                      <h3 style={{ color: "gray" }}>発送済み</h3>
                    )}
                    {order.status === ORDER_STATUS_CANCELED && (
                      <h3 style={{ color: "gray" }}>キャンセル済み</h3>
                    )}
                  </TableCell>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      商品名
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      価格(税抜)/個数
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      トッピング
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  {order.itemInfo.map((item, index) =>
                    items.map(
                      (it) =>
                        it.id === item.itemId && (
                          <TableRow key={index} colSpan={6}>
                            <TableCell
                              component="th"
                              scope="items"
                              align="center"
                              colSpan={2}
                            >
                              <div>
                                <img src={it.img} height="120" alt="カレー" />
                              </div>
                              <div>{it.name}</div>
                            </TableCell>
                            {item.itemSize == 0 ? (
                              <TableCell align="center" colSpan={2}>
                                <h4>
                                  {it.mprice.toLocaleString()}円(Mサイズ) /
                                  {item.itemNum}個
                                </h4>
                              </TableCell>
                            ) : (
                              <TableCell align="center" colSpan={2}>
                                {it.lprice.toLocaleString()}円(Lサイズ) /
                                {item.itemNum}個
                              </TableCell>
                            )}
                            <TableCell align="center" colSpan={2}>
                              {item.toppings.length !== 0 ? (
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
      <Button variant="contained" onClick={() => history.push("/")}>
        トップ画面に戻る
      </Button>
    </div>
  );
};
