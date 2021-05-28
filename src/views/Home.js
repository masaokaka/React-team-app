import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchitems } from '../actions'
import { Search } from "../components/home/Search";
import { Item } from "../components/home/Item";

export const Home = () => {
  const items = useSelector(state => state.items)
  const [itemsData,setItemsData] = useState(items)
  
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(fetchitems())
  }, [])

  useEffect(() => { 
    setItemsData(items)
  }, [items])

  return (
    <React.Fragment>
      <Search itemsData={itemsData} setItemsData={setItemsData} />
      {itemsData.map((item,index) => (
        <Item item={item} key={index}/>
      ))}
    </React.Fragment>     
)
};
