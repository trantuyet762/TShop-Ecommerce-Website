import React from 'react'
import './ExploreMenu.scss'
import {menu_list} from '../Assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id="explore-menu">
    
    <p className='explore-menu-text'>Khám phá món ăn cùng TT để trải nghiệm những bữa ăn tuyệt vời!!</p>
    <div className='explore-menu-list'>
      {menu_list.map((item, index)=>{
        return (
          <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
            <img className={category===item.menu_name ? "active":""} src={item.menu_image} alt=""/>
            <p>{item.menu_name}</p>
            </div>

        )
})}
    </div>
    <hr/>
  </div>
  )
}

export default ExploreMenu