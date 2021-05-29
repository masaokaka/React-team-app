import React,{ useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Order } from "../components/cart/Order.js";
import Button from "@material-ui/core/Button";
import { fetchitems, fetchtoppings, fetchcart,　deletecart,fetchcartnouser } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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
  }, [])

  useEffect(()=>{
    if (user) {
      dispatch(fetchcart(user.uid))
    } else {
      if (cartInfo !== null) {
        dispatch(fetchcartnouser(cartInfo))
      } else {
        dispatch(fetchcartnouser(null))
      }
    }
  }, [user]);

  const deleteItem = (index) => {
    if (cartInfo) {
      cartInfo.itemInfo.splice(index, 1)
      let newCartInfo = JSON.stringify(cartInfo)
      newCartInfo = JSON.parse(newCartInfo)
      if (user) {
        dispatch(deletecart(newCartInfo, user.uid));
      } else {
        dispatch(deletecart(newCartInfo, null));
      }
    }
  }
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
                              <Button variant="contained" color="secondary" onClick={() => deleteItem(index)}>
                                削除<DeleteIcon />
                              </Button>
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
          <h4>カートに商品がありません</h4>
        )
      ) : (
        <h4>カートに商品がありません</h4>
      )}
    </div>
  );
};;
