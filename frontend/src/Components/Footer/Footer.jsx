import React from 'react'
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import { assets } from '../Assets/assets';

export const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
        <div className="footer-content-left">
            <h2 id='ttstore'>TTSTORE</h2>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt=""/>
                <img src={assets.twitter_icon} alt=""/>
                <img src={assets.linkedin_icon} alt=""/>
                
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Chính sách bảo mật</h2>
            <ul>
                <li>Trang chủ</li>
                <li>Về chúng tôi</li>
                <li>Tiện lợi</li>
                <li>Chính sách bảo mật</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Thông tin liên hệ</h2>
            <ul>
                <li>
                    097.6543.389
                </li>
                <li>trantuyet2203@gmail.com</li>
            </ul>
        </div>
       </div>
       <hr/>
       <p className="footer-copyright">
        Copyright 2024 © TTStore.com - All Right Reserved.
       </p>
    </div>
  )
}
export default Footer
