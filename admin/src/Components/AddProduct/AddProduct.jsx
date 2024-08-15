import React, { useState } from 'react'
import './AddProduct.scss'
import upload_area from '../../assets/upload_area.svg'
const AddProduct = () => {
    const [image,setImage] =useState(false);
    const [productDetails,setProductDetails]= useState({
        
        name:"",
        image:"",
        category:"",
        new_price:"",
        old_price:""
    }
    )
    const imageHandler=(e)=>{
        setImage(e.target.files[0]);
    }
    const changeHandler=(e)=>{
        setProductDetails({
            ...productDetails,[e.target.name]:e.target.value
        })
    }
    const Add_Product= async()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;
    
        let formData= new FormData();
        formData.append('product',image);
    
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            header:{
                Accept: 'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data});
        if(responseData.success){
            product.image= responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Thêm món thành công!"):alert("Thêm món thất bại!!!")
            })
        }
    }
   
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Tên món</p>
            <input type='text' value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here'/>
        </div>
        <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Giá</p>
                    <input type='text' value={productDetails.old_price} onChange={changeHandler}  name='old_price' placeholder='Type here'/>
                </div>
                <div className="addproduct-itemfield">
                    <p>Giá khuyến mãi</p>
                    <input type='text' value={productDetails.new_price} onChange={changeHandler}  name='new_price' placeholder='Type here'/>
                </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Danh mục</p>
            <select value={productDetails.category} onChange={changeHandler}  name="category" className='add-product-selector'>
                <option value="salad">Salad</option>
                <option value="sandwich">Sandwich</option>
                <option value="cake">Cake</option>
                <option value="noodles">Noodles</option>
                <option value="pasta">Pasta</option>

            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt=''/>
            </label>
            <input onChange={imageHandler} type='file' name="image" id="file-input" hidden/>
        </div>
        <button onClick={()=>{Add_Product()}} className="addproduct-btn">
           Thêm mới
        </button>
    </div>
  )
}

export default AddProduct