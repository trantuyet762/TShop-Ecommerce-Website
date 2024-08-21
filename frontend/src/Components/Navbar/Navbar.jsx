import React, { useContext, useRef, useState } from "react" ;
import './Navbar.css';
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import cart_icon from '../Assets/cart_icon.png';
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { IoIosArrowDropdown } from "react-icons/io";
const Navbar =()=>{
    const [menu,setMenu]= useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef= useRef();
    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
    return(
        
        <div className="navbar">
            <div className="nav-logo">
                
                <p>TTSTORE</p>
            </div>
            
            <ul ref={menuRef} className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link to='/'>Trang chủ</Link>{menu==="shop" ? <hr/>:<></>} </li>
                <li onClick={()=>{setMenu("menus")}}><Link to='/menus'>Menu</Link>{menu==="menus" ? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu("posts")}}><Link to='/posts'>Bài viết</Link>{menu==="posts" ? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu("news")}}><Link to='/news'>Tin tức</Link>{menu==="news" ? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu("contact")}}><Link to='/contact'>Liên hệ</Link>{menu==="contact" ? <hr/>:<></>}</li>


            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')?
                <button onClick={()=>{localStorage.removeItem('auth-token');
                window.location.replace('/')}}>Đăng xuất</button>
                :<Link to={'/login'}><button>Đăng nhập</button></Link>}
            
                
                <Link to='/cart'><img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                <div className="nav-order">
                <Link to={'/order-history'}><FaUser/></Link>
                    
            </div>
            </div>
            <div>
            <IoMenu className="nav-dropdown" onClick={dropdown_toggle} />
            </div>
        </div>
    )
}
export default Navbar