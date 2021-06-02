import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchitems, fetchtoppings } from '../actions'
import { createcart, fetchcart, updatecart } from "../actions";
import {useHistory} from 'react-router-dom'
// import { BrowserRouter as Router} from "react-router-dom";

export const ItemInfo = () => {
  const user = useSelector((state) => state.user);
  const cartInfo = useSelector((state) => state.cartinfo); //オブジェクト
  const history = useHistory();
  useEffect(() => {
    if (user) {
      dispatch(fetchcart(user.uid));
    }
  }, [user])
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
  const [sizeValue,setSizeValue] = useState(0)
  const setSize0 = () => {
    setSizeValue(0)
  }

  const setSize1 = () => {
    setSizeValue(1)
  }
const[calcPrice,setCalcPrice] = useState(0)
  useEffect(() => {
      setCalcPrice(itemRendering.mprice)
  },[itemRendering])

  useEffect(()=>{
    if(sizeValue === 0){
      setCalcPrice(itemRendering.mprice);
    }else if (sizeValue === 1){
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
    let calculation = calcPrice * selectValue + selectValue * ((mCount * 200) + (lCount * 300)); 
    setTotalPrice(calculation)
  },[selectValue,calcPrice,calcToppingSize])

  //ランダム文字生成
  const getUniqueStr = () => {
    return (
      new Date().getTime().toString(16) +
      Math.floor(1000 * Math.random()).toString(16)
    );
  };

  //カートにアイテムを追加する処理
  const doAddCart = () => {
    //カートに送るデータの準備
    const item = {};
    item.itemId = parseInt(itemid)
    item.itemNum = parseInt(selectValue)
    item.itemSize = parseInt(sizeValue)
    item.toppings = []
    let toppingObjKeys = Object.keys(calcToppingSize)
    toppingObjKeys.forEach(key => {
              if(calcToppingSize[key] !== 0){
                  const toppingWillAdd = {}
                if(calcToppingSize[key] === 1){
                  toppings.forEach((topping) => {
                    if (topping.name === key){
                      toppingWillAdd.toppingId = topping.id
                      toppingWillAdd.toppingSize = 0
                    }
                  })
                } else if(calcToppingSize[key] === 2){
                  toppings.forEach((topping) => {
                    if (topping.name === key){
                      toppingWillAdd.toppingId = topping.id
                      toppingWillAdd.toppingSize = 1
                    }
                  })
                } 
                item.toppings.push(toppingWillAdd)
              }
    });
    item.id = getUniqueStr();
    //ログイン確認してログインしていたらuidを渡す
    let uid;
    if (user) {
      uid = user.uid;
    } else {
      uid = null;
    }
    //カートにアイテムが入っていたら中身も一緒に渡す。
    if (cartInfo) {
      cartInfo.itemInfo = [...cartInfo.itemInfo, item]
      let newCartInfo = JSON.stringify(cartInfo)
      newCartInfo = JSON.parse(newCartInfo)
      dispatch(updatecart(newCartInfo,uid));
      history.push("/cart");
      //入ってなかったら配列に格納して渡す。
    } else {
      let newCartInfo = {
        itemInfo: [item],
        status: 0, //カート(あとで定数に置き換える)
        userId: uid,
      };
      dispatch(createcart(newCartInfo, uid));
      history.push("/cart");
    }
  };

  return (
      <div>
        <div>
          <div>
            <h3>商品詳細</h3>
            <div>
              <div>
                <img src={itemRendering.img} width="300"/>
              </div>
              <div>
                <div>
                  <h4>{itemRendering.name}</h4> <br/>
                  <br/>
                  <p>{itemRendering.text}</p>
                </div>
              </div>
            </div><br/>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <label htmlFor="inputResponsibleCompany">サイズ</label>
                    </div>
                    <div className="col-sm-12">
                      <label className="radio-inline">
                        <input type="radio" name="responsibleCompany" checked={sizeValue === 0} 
                          onChange={(e) => {setSize0(e)}}/>
                        <span className="price">&nbsp;М&nbsp;</span>&nbsp;&nbsp;{itemRendering.mprice}(税抜)
                      </label>
                      <label className="radio-inline">
                        <input type="radio" name="responsibleCompany" checked={sizeValue === 1} 
                          onChange={(e) => {setSize1(e)}}/>
                        <span className="price">&nbsp;Ｌ</span>&nbsp;&nbsp;{itemRendering.lprice}(税抜)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div><br/>
            <div>
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
                                    M<input type="radio" value='1' name={toppingsRendering[index].name} 
                                        checked={calcToppingSize[toppingsRendering[index].name] === 1} onChange={(e) => {changeToppingSize(e)}}/>
                                    L<input type="radio" value='2' name={toppingsRendering[index].name} 
                                        checked={calcToppingSize[toppingsRendering[index].name] === 2} onChange={(e) => {changeToppingSize(e)}}/>
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
                      <button className="form-control btn btn-warning btn-block" onClick={() => doAddCart()}>カートに追加</button>
                  </p>
                </div>
              </div>
            </div>
	      </div>
      </div>
    </div>
  )
}
