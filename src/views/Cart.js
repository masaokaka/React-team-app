import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Order } from '../components/cart/Order.js'
import Button from '@material-ui/core/Button'
import {fetchitems,fetchtoppings} from '../actions'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import React from 'react'

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
    id: "2m45ytrhntrgc45",
    itemId: 16,
    itemNum: 1,
    itemSize: 0,
    toppings: [
      { toppingId: 5, toppingSize: 1 },
      { toppingId: 6, toppingSize: 0 },
      { toppingId: 10, toppingSize: 0 },
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
  const [cartArray, setCartArray] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchitems());
    dispatch(fetchtoppings());
  }, []);

//   useEffect(() => {
//     let array = []
//     if (cartItems.lengh !== 0) {
//       //cartItemの情報と一致する商品の情報を取得する
//       cartItems.forEach(cartItem => {
//         items.forEach(item => {
//           let itemData = item
//           if (cartItem.itemId === item.id) {
//             itemData.itemSize = cartItem.itemSize
//             itemData.itemNum = cartItem.itemNum
//             //cartItemにトッピングの情報が存在した場合
// //ここの処理がなんかおかしいーーーーーーーーーーーーーーーーー
//             if (cartItem.toppings) {
//               //カート内のトッピングをひとつづつ取り出して
//               cartItem.toppings.forEach(cartTopping => {
//                 //トッピングデータもひとつづつ取り出して
//                 toppings.forEach(toppingData => {
//                   //データとカート内のトッピングが同じだった時
//                   if (cartTopping.toppingId === toppingData.id) {
//                     //カート内のトッピングのサイズをコピートッピングに代入
//                     toppingData.size = cartTopping.toppingSize
//                     if (itemData.toppings) {
//                       itemData.toppings.forEach(topping => {
//                         if (topping.id !== toppingData.id) {
//                           itemData.toppings.push(toppingData)
//                         }
//                       })
//                     } else {
//                       itemData.toppings = [toppingData]
//                     }
//                   }
//                 })
//               })
//             }
//             array.push(itemData) 
//           }
//         })
//       })
//     }
//     setCartArray(array)
//   }, [toppings, items, cartItems])
//   console.log(cartArray)
//   //vrtdfvd
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
                  <TableCell align="center">トッピング</TableCell>
                  <TableCell align="center">小計</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{item.img}</TableCell>
                    <TableCell align="center">
                      {item.toppings ? (
                        <ul>
                          {item.toppings.map((topping, index) =>
                            toppings.map(
                              (top) =>
                                topping.toppingId === top.id && (
                                  <li key={index}>
                                    <div>{top.name}</div>
                                    {topping.toppingSize === 0 && (
                                      <div>{top.mprice}</div>
                                    )}
                                    {topping.toppingSize === 1 && (
                                      <div>{top.lprice}</div>
                                    )}
                                  </li>
                                )
                            )
                          )}
                        </ul>
                      ) : (
                          <div>なし</div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
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
