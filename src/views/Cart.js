import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Order } from "../components/cart/Order";
import { SumPrice } from "../components/cart/SumPrice";
import { DeleteButton } from "../components/cart/DeleteButton";
import {
  fetchitems,
  fetchtoppings,
  fetchcart,
  fetchcartnouser,
} from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@material-ui/core";

export const Cart = () => {
  const [show, setShow] = useState(false);
  const items = useSelector((state) => state.items);
  const toppings = useSelector((state) => state.toppings);
  const cartInfo = useSelector((state) => state.cartinfo); //オブジェクト
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchitems());
    dispatch(fetchtoppings());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchcart(user.uid));
    } else {
      if (cartInfo !== null) {
        dispatch(fetchcartnouser(cartInfo));
      } else {
        dispatch(fetchcartnouser(null));
      }
    }
  }, [user]);

  return (
    <div>
      <h1>ショッピングカート</h1>
      {cartInfo !== null ? (
        cartInfo.itemInfo.length !== 0 ? (
          <React.Fragment>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">商品名</TableCell>
                    <TableCell align="center">価格(税抜)</TableCell>
                    <TableCell align="center">個数</TableCell>
                    <TableCell align="center">トッピング：価格(税抜)</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartInfo.itemInfo.map((item, index) =>
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
                                {it.mprice.toLocaleString()}円(Mサイズ)
                              </TableCell>
                            ) : (
                              <TableCell align="center">
                                {it.lprice.toLocaleString()}円(Lサイズ)
                              </TableCell>
                            )}
                            <TableCell>{item.itemNum}個</TableCell>
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
                            <DeleteButton cartInfo={cartInfo} user={user} index={ index }/>
                          </TableRow>
                        )
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container alignItems="center" justify="center" spacing={0}>
              <SumPrice cartInfo={cartInfo} toppings={toppings} items={items} user={user} setShow={setShow}/>
            </Grid>
              {show && <Order />}
          </React.Fragment>
        ) : (
          <h4>カートに商品がありません</h4>
        )
      ) : (
        <h4>カートに商品がありません</h4>
      )}
    </div>
  );
};
