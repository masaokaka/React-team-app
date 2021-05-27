import { AddItemForm } from '../components/admin/AddItemForm'
import { AddToppingForm }from '../components/admin/AddToppingForm'
import React from 'react'
export const Admin = () => {
    return (
      <React.Fragment>
        <AddItemForm/>
        <AddToppingForm/>
      </React.Fragment>
    );
}