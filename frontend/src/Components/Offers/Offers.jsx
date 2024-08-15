import React from 'react'
import './Offers.css';
import slider from '../Assets/slider.png';
export const Offers = () => {
  return (
    <div className='offers'>
            <div class="offers-img">
                    <img src={slider} alt=""/>
                
            </div>
            <div class="offers-content">
                <h2>
                 Deal hời Giá tốt
                </h2>
                <p>Giảm 20% mọi đơn hàng</p>
                <p>Ưu đãi với số lượng có hạn!!</p>
                <button>Đặt ngay</button>
            </div>
       
            
    </div>
  )
}
export default Offers