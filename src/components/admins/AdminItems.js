import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchitems, additem, deleteitem } from "../../actions";
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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";

export const AdminItems = () => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [mprice, setMprice] = useState();
  const [lprice, setLprice] = useState();
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [counter, setCounter] = useState(0);

  const doAddItem = () => {
    if (id && name && text && mprice && lprice && img) {
      if (img.type.match("image.*")) {
        let item = {
          id: parseInt(id),
          name: name,
          text: text,
          mprice: parseInt(mprice),
          lprice: parseInt(lprice),
          img: img,
        };
        dispatch(additem(item, items));
      } else {
        alert("画像の形式が間違っています");
      }
      setId("");
      setName("");
      setText("");
      setMprice("");
      setLprice("");
      setCounter((current) => current + 1);
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
    setCounter((current) => current + 1);
  };

  const deleteItem = (index) => {
    if (window.confirm(`「${items[index].name}」を削除しますか？`)) {
      let newItems = [...items];
      newItems.splice(index, 1);
      dispatch(deleteitem(newItems));
    }
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
        <InputLabel htmlFor="icon-button-file">
          画像：
          <Input
            id="icon-button-file"
            type="file"
            key={counter}
            onChange={(e) => setImg(e.target.files[0])}
          />
        </InputLabel>
        <Box>
          <IconButton color="primary" variant="contained" onClick={doAddItem}>
            <PublishIcon />
          </IconButton>
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
                  <TableCell width={500}>テキスト</TableCell>
                  <TableCell>価格(M)</TableCell>
                  <TableCell>価格(L)</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index} colSpan={12}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <img src={item.img} alt="カレー" width="100px" />
                    </TableCell>
                    <TableCell width={500}>{item.text}</TableCell>
                    <TableCell>{item.mprice}円</TableCell>
                    <TableCell>{item.lprice}円</TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteItem(index)}>
                        <DeleteIcon></DeleteIcon>
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
