import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchtoppings, addtopping } from "../../actions";
import { Input, InputLabel } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@material-ui/core";

export const AdminToppings = () => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [mprice, setMprice] = useState();
  const [lprice, setLprice] = useState();
  const dispatch = useDispatch();
  const toppings = useSelector((state) => state.toppings);

  const doAddTopping = () => {
    if (id && name && mprice && lprice) {
      let topping = {
        id: parseInt(id),
        name: name,
        mprice: parseInt(mprice),
        lprice: parseInt(lprice),
      };
      let newtoppings = [...toppings, topping];
      dispatch(addtopping(newtoppings));
      setId("");
      setName("");
      setMprice("");
      setLprice("");
    } else {
      alert("全ての項目を入力してください");
    }
  };

  const clearInput = () => {
    setId("");
    setName("");
    setMprice("");
    setLprice("");
  };

  //画面マウント時に実行
  useEffect(() => {
    dispatch(fetchtoppings());
  }, []);

  return (
    <React.Fragment>
      <div>
        <Box>
          <h2>トッピング管理画面</h2>
          <div>
            <InputLabel>ID:</InputLabel>
            <Input
              type="number"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
          </div>
          <div>
            <InputLabel>名前:</InputLabel>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <InputLabel>Mサイズ金額:</InputLabel>
            <Input
              type="number"
              onChange={(e) => setMprice(e.target.value)}
              value={mprice}
            />
          </div>
          <div>
            <InputLabel>Lサイズ金額:</InputLabel>
            <Input
              type="number"
              onChange={(e) => setLprice(e.target.value)}
              value={lprice}
            />
          </div>
          <Button color="primary" variant="contained" onClick={doAddTopping}>
            登録
          </Button>
          <Button variant="contained" onClick={clearInput}>
            クリア
          </Button>
        </Box>
        {toppings.length !== 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>商品名</TableCell>
                  <TableCell>価格(M)</TableCell>
                  <TableCell>価格(L)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toppings.map((topping, index) => (
                  <TableRow key={index}>
                    <TableCell>{topping.id}</TableCell>
                    <TableCell>{topping.name}</TableCell>
                    <TableCell>{topping.mprice}円</TableCell>
                    <TableCell>{topping.lprice}円</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>商品がありません</div>
        )}
      </div>
    </React.Fragment>
  );
};
