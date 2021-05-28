import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Order } from "../components/cart/Order.js";
import Button from "@material-ui/core/Button";
import { fetchitems, fetchtoppings } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import React from "react";

//仮データ
const cartItems = [
  {
    id: "2m45y56etgc45",
    itemId: 1,
    itemNum: 3,
    itemSize: 0,
    toppings: [
      { toppingId: 3, toppingSize: 1 },
      { toppingId: 6, toppingSize: 0 },
    ],
  },
  {
    id: "2m4rvw4tcgc45",
    itemId: 5,
    itemNum: 1,
    itemSize: 1,
    toppings: [
      { toppingId: 8, toppingSize: 1 },
      { toppingId: 15, toppingSize: 0 },
      { toppingId: 20, toppingSize: 0 },
    ],
  },
  {
    id: "2mergfertcgc45",
    itemId: 7,
    itemNum: 7,
    itemSize: 0,
  },
];

export const Cart = () => {
  const [show, setShow] = useState(false);
  const items = useSelector((state) => state.items);
  const toppings = useSelector((state) => state.toppings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchitems());
    dispatch(fetchtoppings());
  }, []);

  return (
    <div>
      <h1>ショッピングカート</h1>
      {cartItems.length !== 0 ? (
        <React.Fragment>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">商品名</TableCell>
                  <TableCell align="center">価格</TableCell>
                  <TableCell align="center">トッピング、価格(税抜)</TableCell>
                  <TableCell align="center">小計</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, index) =>
                  items.map(
                    (it) =>
                      it.id === item.itemId && (
                        <TableRow key={index}>
                          {/* 画像 */}
                          <TableCell align="center">
                            <img
                              src={it.img}
                              width="180"
                              height="140"
                              alt="カレー"
                            />
                          </TableCell>
                          {/* 名前 */}
                          <TableCell align="center">{it.name}</TableCell>
                          {/* 価格 */}
                          {item.itemSize === 0 ? (
                            <TableCell align="center">
                              {it.mprice}円(Mサイズ)
                            </TableCell>
                          ) : (
                            <TableCell align="center">
                              {it.lprice}円(Lサイズ)
                            </TableCell>
                          )}
                          {/* トッピング */}
                          <TableCell align="center">
                            {item.toppings ? (
                              <div>
                                {item.toppings.map((topping, index) =>
                                  toppings.map(
                                    (top) =>
                                      topping.toppingId === top.id && (
                                        <div key={index}>
                                          <span>{top.name}：</span>
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
                          {/* 削除ボタン */}
                          <TableCell>
                            <Button variant="contained">削除</Button>
                          </TableCell>
                        </TableRow>
                      )
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <h3>合計金額(税込)：</h3>
          <h3>内消費税：</h3>
          <Button variant="contained" onClick={() => setShow(true)}>
            注文に進む
          </Button>
          {show && <Order />}
        </React.Fragment>
      ) : (
        <div>カートに商品がありません</div>
      )}
    </div>
  );
};
