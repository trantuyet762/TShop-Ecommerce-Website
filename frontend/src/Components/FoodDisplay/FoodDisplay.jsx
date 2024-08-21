import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'
import './FoodDisplay.scss'
const FoodDisplay = ({category}) => {
    const {all_product}= useContext(ShopContext)
  return (
    <div className='food-display' id='food-display'>
        <div className="food-display-list">
            {
                all_product.map((item,index)=>{
                    if(category==="All" || category===item.category){
                        return <div className='food-item'>
                            <Item key={`food-${index}`} id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image}  />
                            </div>
                    }
                   
                })
            }
        </div>
    </div>
  )
}

export default FoodDisplay