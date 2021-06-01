import { db } from "../../firebase/index";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateorder } from "../../actions";
import { timestampToDate } from "../../status/functions";
import {
  ORDER_STATUS_PAID,
  ORDER_STATUS_UNPAID,
  ORDER_STATUS_UNDELIVERIED,
  ORDER_STATUS_DELIVERIED,
  ORDER_STATUS_CANCELED,
} from "../../status/index";

export const OrderInfo = (props) => {
  const dispatch = useDispatch();
  const [orderInfo, setOrderInfo] = useState([...props.orderInfo]); //コピー作成

  const doStatusChange = (index, orderId) => {
    if (
      window.confirm(
        `ユーザー(${props.userId})のステータスを変更しますがよろしいですか？`
      )
    ) {
      let newStatus = orderInfo[index].status;
      db.collection(`users/${props.userId}/orders`)
        .doc(orderId)
        .update({ status: newStatus })
        .then(() => {
          dispatch(updateorder(orderInfo));
        });
    }
  };

  const changeStatus = (status, orderId) => {
    orderInfo.forEach((order) => {
      if (order.id === orderId) {
        order.status = status;
      }
    });
    console.log(orderInfo)
    //ディープコピーでレンダリングを発動させている
    setOrderInfo([...orderInfo]);
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
                    <Select
                      id={order.id}
                      value={order.status}
                      onChange={(e) => changeStatus(e.target.value, order.id)}
                    >
                      <MenuItem value={ORDER_STATUS_UNPAID}>未入金</MenuItem>
                      <MenuItem value={ORDER_STATUS_PAID}>入金済み</MenuItem>
                      <MenuItem value={ORDER_STATUS_UNDELIVERIED}>
                        発送前
                      </MenuItem>
                      <MenuItem value={ORDER_STATUS_DELIVERIED}>
                        発送済み
                      </MenuItem>
                      <MenuItem value={ORDER_STATUS_CANCELED}>
                        キャンセル
                      </MenuItem>
                    </Select>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => doStatusChange(index, order.id)}
                    >
                      変更
                    </Button>
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
                    props.items.map(
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
                                    props.toppings.map(
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
      {props.orderInfo.length === 0 && <h3>注文履歴がありません</h3>}
    </div>
  );
};
