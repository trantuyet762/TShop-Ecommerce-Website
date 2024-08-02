import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import './CSS/Order.scss';
const Order = () => {
    const {getTotalCartAmount}= useContext(ShopContext);
  return (
    
    <form className='order'>
        <div className="order-left">
            <p className='title'>Thông tin khách hàng</p>
            <div className="multi-fields">
                <input type='text' placeholder='Họ tên'/>

            </div>
            <div className="multi-fields">
                <input type='text' placeholder='Số điện thoại'/>

            </div>
            <input type='email' placeholder='Email..'/>
            <div className="multi-fields">
                <input type='text' placeholder='Địa chỉ'/>

            </div>
            <div className="multi-fields">
                <input type='text' placeholder='Phương thức thanh toán'/>

            </div>
            <div className="multi-fields">
                <input type='text' placeholder='Mã giảm giá'/>

            </div>
        
        </div>
        <div className="order-right">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div className="cartitems-total-sub">
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
              </div>
          </div>
          <button >Thanh toán</button>
        </div>
        </div>
    </form>
  )
}

export default Order