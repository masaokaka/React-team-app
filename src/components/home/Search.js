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
    <div class="row">
			<div class="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-12">
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="panel-title">商品を検索する</div>
					</div>
					<div class="panel-body">
							<div class="form-group">
								<label for="code" class="control-label col-sm-2">商品名</label>
								<div class="col-sm-9">
									<input type="text"  name="code" id="code" class="form-control input-sm"/>
                  <button value="検索" class="btn btn-primary" onClick={(e) => searchKeyword(e.target.previousElementSibling.value)} >検索</button>
								  <button type="reset" value="クリア" class="btn btn-default" onClick={()=>setKeyword("")}>クリア</button>
								</div>
							</div>
					</div>
				</div>
			</div>
		</div>
    </React.Fragment>
  );
}