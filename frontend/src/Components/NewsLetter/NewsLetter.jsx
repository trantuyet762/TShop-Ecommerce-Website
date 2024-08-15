import React from 'react';
import "./NewsLetter.css"
export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Đăng ký email để nhận ưu đãi</h1>
        <p>Theo dõi và cập nhật những ưu đãi lớn từ cửa hàng</p>
        <div>
            <input type='email' placeholder='Nhập Email..'/>
            <button>Đăng ký</button>
        </div>
    </div>
  )
}
export default NewsLetter
