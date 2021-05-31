import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchitems } from "../../actions";
import Box from "@material-ui/core/Box";
import { Grid, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";

export const Search = (props) => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState("");
  const [resultCount, setResultCount] = useState();
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchitems());
  }, []);

  useEffect(() => {
    setResultCount(items.length)
  },[items])

  const searchKeyword = () => {
    let array = [...items];
    const resultBox = [];
    array.forEach((item) => {
      if (item.name.indexOf(keyword) >= 0) {
        resultBox.push(item);
      }
    });
    if (resultBox.length === 0) {
      setError("※該当する商品はありません");
      // props.setItemsData(array);
    } else {
      props.setItemsData(resultBox);
      setResultCount(resultBox.length)
      setError();
    }
  };

    const clearText = ()=> {
      setKeyword("");
      props.setItemsData(items);
      setResultCount(items.length)
      setError();
    }

  return (
    <React.Fragment>
      <Box width="100%">
        <Box ml="16.66666667%" width="66.66666667%">
          <Box border={1} borderColor="#ddd" borderRadius={4} mb={2.5}>
            <Box bgcolor="#f5f5f5" py={1.25} px={1.875}>
              <Box fontSize={16}>商品を検索する</Box>
            </Box>
            <Box p={1.875} fontSize={14}>
              <Box>
                <Box mx="auto" width="75%">
                  <FormLabel htmlFor="text" className="control-label col-sm-2">
                    商品名を入力してください
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    py={1.25}
                    px={1.875}
                    fullWidth
                    type="text"
                    value={keyword}
                    id="text"
                    className="form-control input-sm"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </Box>
                <Box>{error && <Box color="red">{error}</Box>}</Box>
                <Box mx="auto" width="50%">
                  <Grid container justify="center">
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        value="検索"
                        className="btn btn-primary"
                        onClick={searchKeyword}
                      >
                        検索
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        value="クリア"
                        size="medium"
                        className="btn btn-default"
                        onClick={() => clearText()}
                      >
                        クリア
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <p>{resultCount}件の表示</p>
    </React.Fragment>
  );
};
