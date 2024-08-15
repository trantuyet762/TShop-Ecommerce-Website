import React from 'react'
import "./Sidebar.scss"
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from "../../assets/Product_list_icon.svg"
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                
                <p>Thêm sản phẩm</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                
                <p>Quản lý sản phẩm</p>
            </div>
          
        </Link>
        <Link to={'/orders'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                
                <p>Quản lý đơn hàng</p>
            </div>
          
        </Link>
        <Link to={'/users'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                
                <p>Quản lý tài khoản</p>
            </div>
          
        </Link>
        <Link to={'/posts'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                
                <p>Quản lý bài viết</p>
            </div>
          
        </Link>
        <Link to={'/news'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                
                <p>Quản lý tin tức</p>
            </div>
          
        </Link>
        <Link to={'/thongke'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                
                <p>Thống kê</p>
            </div>
          
        </Link>
    </div>
  )
}

export default Sidebar