import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchtoppings, updatetopping } from "../../actions";
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
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";

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
      dispatch(updatetopping(newtoppings));
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

  const deleteTopping = (index) => {
    if (window.confirm(`「${toppings[index].name}」を削除しますか？`)){
      let newToppings = [...toppings];
      newToppings.splice(index,1)
      dispatch(updatetopping(newToppings))
    }
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
          <IconButton color="primary" variant="contained" onClick={doAddTopping}>
            <PublishIcon/>
          </IconButton>
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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toppings.map((topping, index) => (
                  <TableRow key={index}>
                    <TableCell>{topping.id}</TableCell>
                    <TableCell>{topping.name}</TableCell>
                    <TableCell>{topping.mprice}円</TableCell>
                    <TableCell>{topping.lprice}円</TableCell>
                    <TableCell>
                      <IconButton onClick={()=>deleteTopping(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
