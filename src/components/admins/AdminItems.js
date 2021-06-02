import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchitems, additem } from "../../actions";
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
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";

export const AdminItems = () => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [mprice, setMprice] = useState();
  const [lprice, setLprice] = useState();
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const doAddItem = () => {
    if (id && name && text && mprice && lprice && img) {
      let item = {
        id: parseInt(id),
        name: name,
        text: text,
        mprice: parseInt(mprice),
        lprice: parseInt(lprice),
        img: img,
      };
      dispatch(additem(item, items));
      setId("");
      setName("");
      setText("");
      setMprice("");
      setLprice("");
      setImg("");
    } else {
      alert("全ての項目を入力してください");
    }
  };

  const clearInput = () => {
    setId("");
    setName("");
    setText("");
    setMprice("");
    setLprice("");
    setImg("");
  };
  //画面マウント時に実行
  useEffect(() => {
    dispatch(fetchitems());
  }, []);

  return (
    <React.Fragment>
      <div>
        <h2>商品管理画面</h2>
        <InputLabel>ID:</InputLabel>
        <Input
          type="number"
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        <InputLabel>名前:</InputLabel>
        <Input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <InputLabel>テキスト:</InputLabel>
        <Input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <InputLabel>Mサイズ金額:</InputLabel>
        <Input
          type="number"
          onChange={(e) => setMprice(e.target.value)}
          value={mprice}
        />
        <InputLabel>Lサイズ金額:</InputLabel>
        <Input
          type="number"
          onChange={(e) => setLprice(e.target.value)}
          value={lprice}
        />
        <InputLabel htmlFor="icon-button-file">画像：
          <Input
            id="icon-button-file"
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </InputLabel>
        <Box>
          <Button color="primary" variant="contained" onClick={doAddItem}>
            登録
          </Button>
          <Button variant="contained" onClick={clearInput}>
            クリア
          </Button>
        </Box>
        {items.length !== 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>商品名</TableCell>
                  <TableCell>画像</TableCell>
                  <TableCell>テキスト</TableCell>
                  <TableCell>価格(M)</TableCell>
                  <TableCell>価格(L)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <img src={item.img} alt="カレー" width="100px" />
                    </TableCell>
                    <TableCell>{item.text}</TableCell>
                    <TableCell>{item.mprice}円</TableCell>
                    <TableCell>{item.lprice}円</TableCell>
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
