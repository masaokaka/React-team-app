import React from "react";
import { db } from "../../firebase/index"

export const Items = () => {
  // const itemData = db.collection("admin/item/itemData")

  return (
    <React.Fragment>
      <div class="row">
			  <div class="table-responsive col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
				  <table class="table table-striped item-list-table">
					  <tbody>
            {/* {itemData.map((itemData,index)=>( */}
						  <tr>
                <th>
                  <a href="item_detail.html">
                    <img src="" class="img-responsive img-rounded item-img-center" width="200" height="200"/>
                  </a>
                  <br/>
                  <a href="item_detail.html"></a><br/>
                  <span class="price">&nbsp;М&nbsp;</span>&nbsp;&nbsp;1,380円(税抜)<br/>
                  <span class="price">&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円(税抜)<br/>
							  </th>
						  </tr>
					  </tbody>
				  </table>
			  </div>
		  </div>
    </React.Fragment>
  );
}