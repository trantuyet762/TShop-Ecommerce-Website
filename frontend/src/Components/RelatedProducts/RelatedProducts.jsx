import React from 'react'
import './RelatedProducts.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Item from '../Item/Item';
const RelatedProducts = () => {
  const [relatedproduct, setRelatedProduct]= useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/relatedproduct')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data))
  },[])
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price= {item.old_price}/>
            })}
        </div>
    </div>
  )
}
export default RelatedProducts;
