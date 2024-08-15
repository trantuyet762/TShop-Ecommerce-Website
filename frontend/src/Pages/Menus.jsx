import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Hero from '../Components/Hero/Hero'

import './CSS/Menus.scss'
import ExploreMenu from '../Components/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import Item from '../Components/Item/Item'
import Product from './Product'
import FoodDisplay from '../Components/FoodDisplay/FoodDisplay'
const Menus = () => {
  const [category,setCategory]=useState("All")
  return (<div className='menus'>
    
    <Hero/>
   <ExploreMenu category={category} setCategory={setCategory}/>
   <FoodDisplay category={category}/>
  </div>
    
  )
}

export default Menus