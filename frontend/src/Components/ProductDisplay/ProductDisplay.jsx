import React, { useContext } from 'react'
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
const ProductDisplay = (props) => {
    const formatPrice=(price)=>{
        return new Intl.NumberFormat('de-DE').format(price);
    };
    const {product}= props;
    const {addToCart}= useContext(ShopContext)
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />

            </div>
            <div className="productdisplay-main-img">
                <img src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">
                    {formatPrice(product.old_price)}
                </div>
                <div className="productdisplay-right-price-new">
                    {formatPrice(product.new_price)}
                </div>
            </div>
            <div className="productdisplay-right-description">
               Món ăn được chế biến từ các nguyên liệu riêng tạo ra hương vị đặc biệt cho từng món
               </div>
           
            <button onClick={()=>{addToCart(product.id)}}>Thêm vào giỏ hàng</button>
            <p className='productdisplay-right-category'>
                <span>Danh mục món: </span>
                {product.category}
            </p>
            
        </div>

    </div>
  )
}
export default ProductDisplay;
