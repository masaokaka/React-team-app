import { useEffect } from "react";
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
import { fetchitems, fetchtoppings } from "../actions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

//仮データ
const orders = [
  {
    itemInfo: [
      {
        id: "",
        itemId: 2,
        itemNum: 3,
        itemSize: 0,
        toppings: [
          { toppingId: 3, toppingSize: 1 },
          { toppingId: 6, toppingSize: 0 },
        ],
      },
      {
        id: "",
        itemId: 6,
        itemNum: 7,
        itemSize: 0,
        toppings: [{ toppingId: 3, toppingSize: 1 }],
      },
    ],
    status: 2,
    orderDate: "2021-5-28",
  },
  {
    itemInfo: [
      {
        id: "",
        itemId: 2,
        itemNum: 3,
        itemSize: 0,
        toppings: [{ toppingId: 3, toppingSize: 1 }],
      },
    ],
    status: 3,
    orderDate: "2021-5-20",
  },
  {
    itemInfo: [
      {
        id: "",
        itemId: 3,
        itemNum: 3,
        itemSize: 0,
        toppings: [{ toppingId: 3, toppingSize: 1 }],
      },
    ],
    status: 9,
    orderDate: "2021-5-20",
  },
  {
    itemInfo: [
      {
        id: "",
        itemId: 3,
        itemNum: 3,
        itemSize: 0,
        toppings: [{ toppingId: 3, toppingSize: 1 }],
      },
      {
        id: "",
        itemId: 3,
        itemNum: 3,
        itemSize: 0,
        toppings: [{ toppingId: 3, toppingSize: 1 }],
      },
      {
        id: "",
        itemId: 3,
        itemNum: 3,
        itemSize: 0,
        toppings: [{ toppingId: 3, toppingSize: 1 }],
      },
    ],
    status: 2,
    orderDate: "2021-5-20",
  },
];

export const OrderHistory = () => {
  //@material-uiの使用
  /*   const classes = useStyles(); */
  const items = useSelector((state) => state.items);
  const toppings = useSelector((state) => state.toppings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchitems());
    dispatch(fetchtoppings());
  }, []);

  /*   firestoreのstatusを変更する処理
const statusChange=()=>
db.collection(ここにitemInfoのなかみのstatusを指定).update(
    "stataus": 9
  }
}); */

  //現在ログインしているユーザが代入される
  const user = useSelector((state) => state.user);

  return (
    <div align="center">
      <h2>注文履歴一覧</h2>

      {user !== null && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">注文日</TableCell>
                <TableCell align="center">
                  商品詳細(商品名、サイズ、個数)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    注文日：{order.orderDate}
                    <br />
                    <div>
                      {order.status === 1 ||
                        (order.status === 2 && (
                          <button onClick={() => console.log(order.itemInfo)}>
                            注文をキャンセルする
                          </button>
                        ))}
                      {order.status === 9 && <span>キャンセル済み</span>}
                      {order.status === 3 && <span>発送済み</span>}
                      <br />
                      合計金額
                    </div>
                  </TableCell>
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
                            <TableCell>小計</TableCell>
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

      {user === null && <h3>注文履歴がありません</h3>}

      <Link to="/">
        <button>トップ画面に戻る</button>
      </Link>
    </div>
  );
};
