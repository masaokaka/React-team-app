import Button from '@material-ui/core/Button'
import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch } from 'react-redux'
import { fetchitems, additem } from '../../actions'
import Input from '@material-ui/core/Input'

export const AddItemForm = () => {
    const [id,setId] = useState()
    const [name,setName] = useState()
    const [text,setText] = useState()
    const [mprice,setMprice] = useState()
    const [lprice,setLprice] = useState()
    const [img, setImg] = useState()
    const dispatch = useDispatch()
		const items = useSelector(state => state.items)
		const user = useSelector(state => state.user)

    const doAddItem = () => {
        let item = {
            id: parseInt(id),
            name: name,
            text: text,
            mprice: parseInt(mprice),
            lprice: parseInt(lprice),
            img: img
				}
        let newitems = [...items, item]
			dispatch(additem(newitems,user.uid))
			setId("");
      setName("");
      setText("");
      setMprice("");
      setLprice("");
      setImg("");
    }

    //画面マウント時に実行
    useEffect(() => {
			dispatch(fetchitems())
    }, [])
    
    return (
      <React.Fragment>
        <div>
          <h2>商品追加フォーム</h2>
          <div>
            ID:
            <Input
              type="number"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            名前:
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            テキスト:
            <Input
              type="text"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            Mサイズ金額:
            <Input
              type="number"
              onChange={(e) => setMprice(e.target.value)}
            />
          </div>
          <div>
            Lサイズ金額:
            <Input
              type="number"
              onChange={(e) => setLprice(e.target.value)}
            />
          </div>
          <div>
            画像パス:
            <Input
              type="text"
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={doAddItem}>
            登録
          </Button>
          {items.length !== 0 ? (
            <table border="1">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>商品名</th>
                  <th>画像</th>
                  <th>テキスト</th>
                  <th>価格(M)</th>
                  <th>価格(L)</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.img} alt="カレー" width="100px" />
                    </td>
                    <td>{item.text}</td>
                    <td>{item.mprice}円</td>
                    <td>{item.lprice}円</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>商品がありません</div>
          )}
        </div>
      </React.Fragment>
    );
}