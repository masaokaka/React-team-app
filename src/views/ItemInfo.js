import Button from '@material-ui/core/Button'
import {useSelector,useDispatch} from 'react-redux'
import {updatecart,createcart} from '../actions'
export const ItemInfo = () => {
  const user = useSelector(state => state.user);
  const cartItems = useSelector(state=>state.cartitems)//配列
  const dispatch = useDispatch()
  //仮データーーーーーーーーーーーーー
  //商品詳細から追加される予定の形
  const item = {
    // id: "2m45y56etgc45",
    itemId: 1,
    itemNum: 3,
    itemSize: 0,
    toppings: [
      { toppingId: 3, toppingSize: 1 },
      { toppingId: 6, toppingSize: 0 },
    ]
  },
  //----------------------------
  const doAddCart = () => {
    //ログイン確認してログインしていたらuidを渡す
    let uid;
    if (user) {
      uid = user.uid
    } else {
      uid = null
    }
    //カートにアイテムが入っていたら中身も一緒に渡す。
    if (cartItems) {
      dispatch(updatecart([...cartItems,item],uid))
    //入ってなかったら配列に格納して渡す。
    } else {
      let order = {
        itemInfo: [item],
        status: 0, //カート(あとで定数に置き換える)
        user
      }
      dispatch(createcart(order,uid))
    }
  }

  return (
    <Button onClick={doAddCart}>カートに入れる</Button>
  );
};
