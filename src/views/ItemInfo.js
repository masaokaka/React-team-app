import React from "react";
// import { BrowserRouter as Router} from "react-router-dom";

export const ItemInfo = () => {
  return (
    <React.Fragment>
      <div class="container">
        <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="item_list_pizza.html">
              <img alt="main log" src="../static/img_pizza/header_logo.png" height="35" />
            </a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <p class="navbar-text navbar-right">
              <a href="cart_list.html" class="navbar-link">ショッピングカート</a>&nbsp;&nbsp;
              <a href="order_history.html" class="navbar-link">注文履歴</a>&nbsp;&nbsp;
              <a href="login.html" class="navbar-link">ログイン</a>&nbsp;&nbsp;
              <a href="item_list_pizza.html" class="navbar-link">ログアウト</a>
            </p>
          </div>
        </div>
      </nav>

      <form action="cart_list.html">
        <div class="row">
          <div class="col-xs-offset-2 col-xs-8">

            <h3 class="text-center">商品詳細</h3>
            <div class="row">
              <div class="col-xs-5">
                <img src="" class="img-responsive img-rounded item-img-center" />
              </div>

              <div class="col-xs-5">
                <div class="bs-component">
                  <h4>じゃがバターベーコン</h4> <br/>
                  <br/>
                  <p>マイルドな味付けのカレーに大きくカットしたポテトをのせた、バターとチーズの風味が食欲をそそるお子様でも楽しめる商品です。</p>
                </div>
              </div>
            </div><br/>
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <div class="form-group">
                  <div class="row">
                    <div class="col-sm-12">
                      <label for="inputResponsibleCompany">サイズ</label>
                    </div>
                    <div class="col-sm-12">
                      <label class="radio-inline">
                        <input type="radio" name="responsibleCompany" checked="checked"/>
                        <span class="price">&nbsp;М&nbsp;</span>&nbsp;&nbsp;1,380円(税抜)
                      </label>
                      <label class="radio-inline">
                        <input type="radio" name="responsibleCompany"/>
                        <span class="price">&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円(税抜)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div><br/>
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <div class="form-group">
                  <div class="row">
                    <div class="col-sm-12">
                      <label for="inputResponsibleCompany">
                        トッピング：&nbsp;1つにつき
                        <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;200円(税抜)
                        <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
                      </label>
                    </div>
                    <div class="col-sm-12">
                      <label class="checkbox-inline">
                        <input type="checkbox" value=""/>オニオン
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value=""/>チーズ
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value=""/>ピーマン
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value=""/>ロースハム
                      </label><br/>
                      <label class="checkbox-inline">
                        <input type="checkbox" value=""/>ほうれん草
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value=""/>ぺパロに
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value=""/>グリルナス
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox" value=""/>あらびきソーセージ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <div class="form-group">
                  <div class="row">
                    <div class="col-xs-5 col-sm-5">
                      <label for="">数量:</label>
                      <label class="control-label" for="inputError">数量を選択してください</label> <select name="area" class="form-control">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col-xs-offset-2 col-xs-10">
                <div class="form-group">
                  <span id="total-price">この商品金額：38,000 円(税抜)</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-offset-2 col-xs-3">
                <div class="form-group">
                  <p>
                    <input class="form-control btn btn-warning btn-block" type="submit" value="カートに入れる"/>
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
		    </form>
	    </div>
    </React.Fragment>
  );
};
