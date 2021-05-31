import { db } from "../../firebase/index";
import React from "react";
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
import { useDispatch } from "react-redux";
import {
  updateorder,
} from "../../actions";

export const OrderInfo = (props) => {
  const dispatch = useDispatch();
  const statechange = (index, orderId) => {
    if (window.confirm("キャンセルしてもよろしいですか？")) {
      let orders = [...props.orderInfo];
      orders[index].status = 9;
      db.collection(`users/${props.userId}/orders`)
        .doc(orderId)
        .update({ status: 9 })
        .then(() => {
          dispatch(updateorder(orders));
        });
    }
  };
  console.log(props.orderInfo)
  return (
    <div align="center">
      <h2>注文履歴一覧</h2>
      {props.orderInfo.length !== 0 && (
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
              {props.orderInfo.map((order, index) => (
                <TableRow key={index}>
                  <TableCell align="center" colSpan={2}>
                    {order.orderDate}
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    <h3>{order.totalPrice.toLocaleString()}円</h3>
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    {order.status === 1 && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => statechange(index, order.id)}
                      >
                        注文キャンセル
                      </Button>
                    )}
                    {order.status === 2 && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => statechange(index, order.id)}
                      >
                        注文キャンセル
                      </Button>
                    )}
                    {order.status === 9 && (
                      <h3 style={{ color: "red" }}>キャンセル済み</h3>
                    )}
                    {order.status === 3 && (
                      <h3 style={{ color: "blue" }}>発送済み</h3>
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
