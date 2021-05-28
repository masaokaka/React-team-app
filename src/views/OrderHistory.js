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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

/* const rows = [
  createData("カツカレー", "Mサイズ/800円/1個", "オニオン/200円", "1,100円"),
  createData("チキンカレー", "Mサイズ/800円/1個", "オニオン/200円", "1,100円"),
  createData("サグカレー", "Mサイズ/800円/1個", "オニオン/200円", "1,100円"),
]; */

export const OrderHistory = () => {
  const classes = useStyles();
  const items = useSelector((state) => state.items);
  const toppings = useSelector((state) => state.toppings);
  const dispatch = useDispatch();
  useEffect(() => {
    db.collection("admin/HdPaXiBx3VTswieJGJlFxLYOs092/item")
      .where("id", "==", "1")
      .then((res) => {
        console.log(res);
      });
    dispatch(fetchitems());
    dispatch(fetchtoppings());
  }, []);

  return (
    <div align="center">
      <h2>注文履歴一覧</h2>
      <button onClick={() => console.log(items)}>アイテム取得確認</button>
      <button onClick={() => console.log(toppings)}>アイテム取得確認</button>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">商品名</TableCell>
              <TableCell align="center">サイズ・価格・個数</TableCell>
              <TableCell align="center">トッピング名・価格</TableCell>
              <TableCell align="center">合計</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan="5" align="center">
                2021年5月27日(木)
              </TableCell>
            </TableRow>
            {items.map((items) => (
              <TableRow key={items.id}>
                <TableCell component="th" scope="items" align="center">
                  <img src={items.img} height="120" />
                  <br />
                  {items.name}
                </TableCell>
                <TableCell align="center">{items.lprice}</TableCell>
                <TableCell align="center">{items.mprice}</TableCell>
                <TableCell align="center">{items.lprice}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan="5" align="center">
                <button>注文をキャンセルする</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <table border="1">
        <thead>
          <tr>
            <th>商品名</th>
            <th>サイズ・価格・個数</th>
            <th>トッピング名・価格</th>
            <th>合計</th>
            <th>-</th>
          </tr>
          <tr>
            <th colSpan="5">2021年5月16日(月)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="/img/1.jpg" height="120" />
              <p>なんとかカレー</p>
            </td>
            <td>M・800円・１個</td>
            <td>オニオン・200円</td>
            <td>1,000円</td>
            <td rowSpan="2">
              <button>キャンセル</button>
            </td>
          </tr>
          <tr>
            <td>
              <img src="/img/1.jpg" height="120" />
              <p>なんとかカレー</p>
            </td>
            <td>M・800円・１個</td>
            <td>オニオン・200円</td>
            <td>1,000円</td>
          </tr>
        </tbody>
      </table> */}
      <Link to="/">
        <button>トップ画面に戻る</button>
      </Link>
    </div>
  );
};
