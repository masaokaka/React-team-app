import React, { useState, useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchitems } from "../../actions"
import  Box  from '@material-ui/core/Box';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';

export const Search = (props) => {
  
  const [keyword, setKeyword] = useState();
  const [error, setError] = useState('')
  const items = useSelector(state => state.items)
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(fetchitems())
  }, [])



  const searchKeyword  = () => {
    console.log(items)
    let array = []
    props.itemsData.forEach(item => {if(item.name.indexOf(keyword) >= 0){
      array.push(item)
      console.log(array)
    }}) 
    if(keyword === ""){
      console.log(items)
      props.setItemsData(items)
      setError()
    }else if(array.length === 0){
      setError("※該当する商品はありません")
      props.setItemsData(array)
    }else{
      console.log(items)
      props.setItemsData(array)
      setError()
    }
  }  


  return (
    <React.Fragment>
    <Box width="100%">
			<Box ml="16.66666667%" width= "66.66666667%">
				<Box border={1} borderColor="#ddd"  borderRadius={4} mb={2.5} >
					<Box bgcolor="#f5f5f5" py={1.25} px={1.875} >
						<Box fontSize={16}>商品を検索する</Box>
					</Box>
					<Box p={1.875} fontSize={14}>
							<Box>
                <Box mx="auto" width="75%" >
                  <Box for="code" class="control-label col-sm-2" >商品名</Box>
                  <TextField label="キーワードを入力" variant="outlined" py={1.25} px={1.875} fullWidth type="text" value={keyword} name="code" id="code" class="form-control input-sm" onChange={(e) => setKeyword(e.target.value)} /><br />
                </Box>
                <Box>{error && <Box  color="red">{error}</Box>}</Box>
                <Box alignItems="center" justifyContent="center"  width="100%">
                  <Button variant="contained" color="primary" value="検索" class="btn btn-primary" onClick={searchKeyword} >検索</Button>
                  <Button variant="contained" type="reset" value="クリア" class="btn btn-default" onClick={()=>setKeyword("")}>クリア</Button>
                </Box>
							</Box>
					</Box>
				</Box>
			</Box>
		</Box>
    </React.Fragment>
  );
}