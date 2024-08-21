import React, { useContext} from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';
 const CartItems = () => {
  const formatPrice =(price)=>{
    return new Intl.NumberFormat('de-DE').format(price);
  }
    const {getTotalCartAmount, all_product,cartItems,removeFromCart}= useContext(ShopContext);
    const navigate = useNavigate();
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Ảnh</p>
            <p>Tên món</p>
            <p>Giá</p>
            <p>Số lượng</p>
            <p>Tổng</p>
            <p>Xóa</p>
        </div>
        <hr/>
      {all_product.map((e,index)=>{
        if(cartItems[e.id]>0){
            return   <div>
            <div key={index} className="cartitems-format cartitems-format-main">
                <div><img src={e.image} alt="" className="carticon-product-icon" /></div>
                <p>{e.name}</p>
                <p>{formatPrice(e.new_price)}</p>
                <div><button className="cartitems-quantity">{cartItems[e.id]}</button></div>
                <p>{formatPrice(e.new_price*cartItems[e.id])}</p>
                <img src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" className='cartitems-remove-icon' />
            </div>
            <hr/>
        </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Giỏ hàng</h1>
          <div className="cartitems-total-sub">
            <div className="cartitems-total-item">
              <p>Tổng tền</p>
              <p>{formatPrice(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Vận chuyển</p>
              <p>Miễn phí</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Tổng</h3>
              <h3>{formatPrice(getTotalCartAmount())}</h3>
              </div>
          </div>
          <button onClick={()=>navigate('/order')}>Đặt hàng</button>
        </div>
        <div className="cartitems-promocode">
          <p>Nếu bạn có mã giảm giá, hãy nhập vào đây</p>
          <div className="cartitems-promobox">
          <input type="text" placeholder='Nhập mã..' />
          <button>Nhập</button>
        </div>
        </div>
      </div>
    </div>
  )
}
export default CartItems
