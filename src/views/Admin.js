import { AddItemForm } from '../components/admin/AddItemForm'
import { AddToppingForm }from '../components/admin/AddToppingForm'
import React,{useEffect} from 'react'
import { useParams,useHistory } from 'react-router-dom'
import { ADMIN_ID } from '../status/index'

export const Admin = () => {
  const history = useHistory()
  const { adminId } = useParams()
  
  //マウント時にユーザーがアドミンではなかった場合にはアクセス拒否
  useEffect(() => {
    let decoded = decodeURI(adminId)
    if (decoded !== ADMIN_ID) {
      history.push("/")
    }
  }, [])

    return (
      <React.Fragment>
        <AddItemForm/>
        <AddToppingForm/>
      </React.Fragment>
    );
}