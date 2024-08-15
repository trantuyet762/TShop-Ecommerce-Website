import React from 'react'
import "./Admin.scss"
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route,Routes } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
// import Order from '../../Components/Orders/Order'
// import OrderDetail from '../../Components/OrderDetail/OrderDetail'
const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
            {/* <Route path='/orders' element={<Order/>}/>
            <Route path='/orderdetail/:orderId' element={<OrderDetail/>}/>
             */}
        </Routes>
    </div>
  )
}

export default Admin