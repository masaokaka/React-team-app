import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchitems, fetchtoppings } from '../actions'
// import { BrowserRouter as Router} from "react-router-dom";

export const ItemInfo = () => {
  //ここで商品情報を読み込んでおく必要あり
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(fetchitems());
    dispatch(fetchtoppings())
  }, [])

  const {itemid} = useParams();
  const items = useSelector(state => state.items);
  const toppings = useSelector(state => state.toppings);
  const [itemRendering, setItemRendering] = useState('');
  const [toppingsRendering,setToppings] = useState([]);
  const [toppingFlag,setToppingFlag] = useState({});

  useEffect(()=>{
      items.forEach(item => {
      if(`${item.id}` === itemid){
        setItemRendering(item);
      }
    });
  },[items])

  useEffect(()=>{
    setToppings(toppings);
  },[toppings])
  
  //トッピングの数量選択欄の表示切り替え
  useEffect(() => {
    const newToppingFlag = {}
    toppingsRendering.forEach((topping) => {
      newToppingFlag[topping.name] = false;
    })
    setToppingFlag(newToppingFlag);
  },[toppingsRendering])

  const changeFlag = (e) => {
    if(toppingFlag[e.target.name] === false ){
      setToppingFlag({...toppingFlag,[e.target.name]:true})
    } else {
      //チェックボックスを閉じた時にトッピングの数は0になる
      const newToppingSize = {}
      toppingsRendering.forEach((topping) => {
      newToppingSize[topping.name] = 0;
    })
    setCalcToppingSize(newToppingSize);
      setToppingFlag({...toppingFlag,[e.target.name]:false})
    }
  }

  //トッピングのサイズを取得
  const [calcToppingSize,setCalcToppingSize] = useState({})

  useEffect (() => {
    const newToppingSize = {}
    toppingsRendering.forEach((topping) => {
      newToppingSize[topping.name] = 0;
    })
    setCalcToppingSize(newToppingSize);
  },[toppingsRendering])
//トッピングのサイズを切り替える
  const changeToppingSize = (e) =>{
    if(e.target.value === '1'){
      setCalcToppingSize((prevSize) => {
        return {...prevSize,[e.target.name]:1}
      })
    }else if(e.target.value === '2'){
      setCalcToppingSize((prevSize) => {
        return {...prevSize,[e.target.name]:2}
      })
    }
  }


  const [selectValue, setSelectValue] = useState(1)
  //セレクトボックスの値を取得
  const getSelectValue = (e) => {
    setSelectValue(e.target.value);
  }

  const [totalPrice,setTotalPrice] = useState(0)
  const [sizeValue,setSizeValue] = useState(1)
  const setSize1 = () => {
    setSizeValue(1)
  }

  const setSize2 = () => {
    setSizeValue(2)
  }
const[calcPrice,setCalcPrice] = useState(0)
  useEffect(() => {
      setCalcPrice(itemRendering.mprice)
  },[itemRendering])

  useEffect(()=>{
    if(sizeValue === 1){
      setCalcPrice(itemRendering.mprice);
    }else if (sizeValue === 2){
      setCalcPrice(itemRendering.lprice);
    }
  },[sizeValue])

  //表示合計金額の計算
  useEffect(() => { 
    let toppingObjValues = Object.values(calcToppingSize)
    let mCount = 0;
    let lCount = 0;
    toppingObjValues.forEach((value) => {
          if(value === 1){
            mCount += 1; 
          }else if (value === 2){
            lCount += 1;
          }
        })
    let calculation = calcPrice * selectValue +(mCount * 200) + (lCount * 300); 
    setTotalPrice(calculation)
  },[selectValue,calcPrice,calcToppingSize])


  return (
    <React.Fragment>
      <div className="container">
        {/* <nav class="navbar navbar-default">
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
      </nav> */}

      
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">

            <h3 className="text-center">商品詳細</h3>
            <div className="row">
              <div className="col-xs-5">
                <img src={itemRendering.img} className="img-responsive img-rounded item-img-center" />
              </div>
              
              <div className="col-xs-5">
                <div className="bs-component">
                  <h4>{itemRendering.name}</h4> <br/>
                  <br/>
                  <p>{itemRendering.text}</p>
                </div>
              </div>
            </div><br/>
            <div className="row">
              <div className="col-xs-offset-2 col-xs-8">
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-12">
                      <label htmlFor="inputResponsibleCompany">サイズ</label>
                    </div>
                    <div className="col-sm-12">
                      <label className="radio-inline">
                        <input type="radio" name="responsibleCompany" checked={sizeValue === 1} onChange={(e) => {setSize1(e)}}/>
                        <span className="price">&nbsp;М&nbsp;</span>&nbsp;&nbsp;{itemRendering.mprice}(税抜)
                      </label>
                      <label className="radio-inline">
                        <input type="radio" name="responsibleCompany" checked={sizeValue === 2} onChange={(e) => {setSize2(e)}}/>
                        <span className="price">&nbsp;Ｌ</span>&nbsp;&nbsp;{itemRendering.lprice}(税抜)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div><br/>
            <div className="row">
              <div className="col-xs-offset-2 col-xs-8">
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-12">
                      <label htmlFor="inputResponsibleCompany">
                        トッピング：&nbsp;1つにつき
                        <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;200円(税抜)
                        <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
                      </label>
                    </div>
                    <div className="col-sm-12">
                      {toppingsRendering.map((topping,index) => {
                        return (
                          <div key={index}>
                             <label className="checkbox-inline">
                                  <input name={toppingsRendering[index].name} type="checkbox"  onChange={(e) => {changeFlag(e)}}/>{topping.name}
                                  <span style={{display:toppingFlag[topping.name] ? 'block':'none'}}>
                                    M<input type="radio" value='1' name={toppingsRendering[index].name} checked={calcToppingSize[toppingsRendering[index].name] === 1} onChange={(e) => {changeToppingSize(e)}}/>
                                    L<input type="radio" value='2' name={toppingsRendering[index].name} checked={calcToppingSize[toppingsRendering[index].name] === 2} onChange={(e) => {changeToppingSize(e)}}/>
                                  </span>
                             </label>
                          </div>
                         
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-offset-2 col-xs-8">
                <div className="form-group">
                  <div className="row">
                    <div className="col-xs-5 col-sm-5">
                      <label htmlFor="">数量:</label>
                      <label className="control-label" htmlFor="inputError">数量を選択してください</label> 
                      <select className="area" className="form-control" onChange={(e)=>{ getSelectValue(e) }}>
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
            <div className="row">
              <div className="col-xs-offset-2 col-xs-10">
                <div className="form-group">
                  <span id="total-price">この商品金額：{totalPrice} 円(税抜)</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-offset-2 col-xs-3">
                <div className="form-group">
                  <p>
                    <input className="form-control btn btn-warning btn-block" type="submit" value="カートに入れる"/>
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
	    </div>
    </React.Fragment>
  );
};
