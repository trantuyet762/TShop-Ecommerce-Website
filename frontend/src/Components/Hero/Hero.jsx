import React from "react";
import "./Hero.css";
import headerImg from "../Assets/header_img.png";
const Hero = ()=>{
    return (
        <div className="hero" style={{ backgroundImage: `url(${headerImg})` }}>
            <div className="hero-contents" >
                <h2>Trải nghiệm những món ngon tại đây!!</h2>
                <p>Ưu đãi đặc biệt theo từng món ăn hãy đặt những món ngon yêu thích của bạn. </p>
                <button>Đặt ngay</button>
            </div>
            
               
        </div>
    )
}
export default Hero