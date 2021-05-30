import React, { useState, useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchitems } from "../../actions"


export const Search = (props) => {
  
  const [keyword, setKeyword] = useState();
  const items = useSelector(state => state.items)
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(fetchitems())
  }, [])


  const searchKeyword  = (word) => {
    console.log(items)
    let array = []
    props.itemsData.forEach(item => {if(item.name.indexOf(word) >= 0){
      array.push(item)
    }}) 
    if(word === ""){
      console.log(items)
      props.setItemsData(items)
    }else{
      console.log(items)
      props.setItemsData(array)
    }
  }  


  return (
    <React.Fragment>
    <div>
			<div>
				<div>
					<div>
						<div>商品を検索する</div>
					</div>
					<div>
							<div>
								<label htmlFor="code">商品名</label>
								<input type="text"  name="code" id="code"/>
                  <button value="検索" onClick={(e) => searchKeyword(e.target.previousElementSibling.value)} >検索</button>
								  <button type="reset" value="クリア" onClick={()=>setKeyword("")}>クリア</button>
							</div>
					</div>
				</div>
			</div>
		</div>
    </React.Fragment>
  );
}