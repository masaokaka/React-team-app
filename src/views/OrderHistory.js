import { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("カツカレー", "Mサイズ/800円/1個", "オニオン/200円", "1,100円"),
  createData("チキンカレー", "Mサイズ/800円/1個", "オニオン/200円", "1,100円"),
  createData("サグカレー", "Mサイズ/800円/1個", "オニオン/200円", "1,100円"),
];

export const OrderHistory = () => {
  useEffect(() => {
    console.log("useEffect!!");
  }, []);
  const classes = useStyles();
  /*   const checkbtn = () => {
    db.collection("users")
      .get()
      .then((res) => {
        console.log(res);
      });
  }; */
  return (
    <div align="center">
      <h2>注文履歴一覧</h2>
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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" align="center">
                  <img src="/img/1.jpg" height="120" />
                  <br />
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
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
