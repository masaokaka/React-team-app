import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchitems } from '../actions'
import { Search } from "../components/home/Search";
import { Item } from "../components/home/Item";
import  Box  from '@material-ui/core/Box';

export const Home = () => {
  const items = useSelector(state => state.items)
  const [itemsData,setItemsData] = useState([...items])
  
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(fetchitems())
  }, [])

  useEffect(() => { 
    setItemsData([...items])
  }, [items])

  return (
    <React.Fragment>
      <Search itemsData={itemsData} setItemsData={setItemsData} />
      <Box display="flex" flexWrap="wrap">
        {itemsData.map((item,index) => (
            <Item item={item} key={index}/>
        ))}
      </Box>
    </React.Fragment>     
)
};
