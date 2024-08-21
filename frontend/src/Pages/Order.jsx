import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import './CSS/Order.scss';
const Order = () => {
  const formatNumber=(price)=>{
    return new Intl.NumberFormat('de-DE').format(price);
  }
    const { resetCart } = useContext(ShopContext);
    const {getTotalCartAmount}= useContext(ShopContext);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const handleOrder = () => {
      fetch('http://localhost:4000/order', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('auth-token')
          },
          body: JSON.stringify({
              name,
              phoneNumber,
              email,
              address,
              paymentMethod
          })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
            resetCart(); 
              alert('Đơn hàng của bạn đã được ghi nhận');
          } else {
              alert('Có lỗi xảy ra, vui lòng thử lại');
          }
      });
  }
  return (
    
    <form className='order'>
        <div className="order-left">
            <p className='title'>Thông tin khách hàng</p>
            <div className="multi-fields">
                <input type='text' placeholder='Họ tên' value={name} onChange={(e)=> setName(e.target.value)}/>

            </div>
            <div className="multi-fields">
                <input type='text' placeholder='Số điện thoại' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>

            </div>
            <div className="multi-fields">
            <input type='email' placeholder='Email..' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            
            <div className="multi-fields">
                <input type='text' placeholder='Địa chỉ' value={address} onChange={(e) => setAddress(e.target.value)}/>

            </div>
            <div className='multi-fields'>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="COD">COD</option>
          <option value="Chuyển khoản">Chuyển khoản</option>
        </select>
            </div>
            
            {/* <div className="multi-fields">
                <input type='text' placeholder='Mã giảm giá'/>

            </div> */}
        
        </div>
        <div className="order-right">
        <div className="cartitems-total">
          <p className='cart-title'>Giỏ hàng</p>
          <div className="cartitems-total-sub">
            <div className="cartitems-total-item">
              <p>Tổng tiền</p>
              <p>{formatNumber(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Vận chuyển</p>
              <p>Miễn phí</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Tổng</h3>
              <h3>{formatNumber(getTotalCartAmount())}</h3>
              </div>
          </div>
          <button type="button" onClick={handleOrder}>Thanh toán</button>
        </div>
        </div>
    </form>
  )
}

export default Order