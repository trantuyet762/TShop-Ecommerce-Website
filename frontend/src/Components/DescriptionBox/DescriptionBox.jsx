import React from 'react'
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="description-navigator">
        <div className="descriptionbox-nav-box">
           Chi tiết sản phẩm
        </div>
        <div className="descriptionbox-nav-box fade">
            Đánh giá (122)
        </div>
        </div>
        <div className="descriptionbox-description">
             <p>Tất cả các món ăn của cửa hàng đều được chuẩn bị một cách tỉ mỉ nhất từ khâu chọn nguyên liệu luôn được đảm bảo, nguồn gốc rõ ràng và có giấy chứng nhận an toàn thực phẩm</p> 
              
             <p>Nếu có bất kỳ lỗi nào xin bạn hãy liên hệ qua số điện thoại 097.6543.389 để được hỗ trợ nhanh nhất</p>
            
        </div>
    </div>
  )
}
export default DescriptionBox;
