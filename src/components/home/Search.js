import React, { useState, }  from "react";


export const Search = (props) => {
  
  const [keyword, setKeyword] = useState();

  return (
    <React.Fragment>
    <div class="row">
			<div class="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-12">
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="panel-title">商品を検索する</div>
					</div>
					<div class="panel-body">
						<form method="post" action="#" class="form-horizontal">
							<div class="form-group">
								<label for="code" class="control-label col-sm-2">商品名</label>
								<div class="col-sm-9">
									<input type="text" value={keyword} name="code" id="code" class="form-control input-sm"/>
								</div>
							</div>
							<div class="text-center">
								<button type="submit" value="検索" class="btn btn-primary" onClick={() => props.setItemsData(props.itemsData.name).fetch(keyword)} >検索</button>
								<button type="reset" value="クリア" class="btn btn-default" onClick={()=>setKeyword()}>クリア</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
    </React.Fragment>
  );
}