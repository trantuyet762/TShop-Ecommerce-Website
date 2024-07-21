import React from "react";
import "./CSS/LoginSignUp.css"
import { useState } from "react";
const LoginSignup=()=>{
   const [state,setState]= useState("Login");
   const [formData,setFormData]=useState({
      username:"",
      password:"",
      email:""
   });
   const changeHandle=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
   }
   const login= async()=>{
      console.log("Login success ",formData);
      let responseData;
      await fetch('http://localhost:4000/login',{
         method:'POST',
         headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',
         },
         body:JSON.stringify(formData),
      }).then((response)=>response.json()).then((data)=>responseData=data)
      if(responseData.success){
         localStorage.setItem('auto-token',responseData.token);
         window.location.replace("/");
      }
      else{
         alert(responseData.errors)
      }
   }
   const signup= async()=>{
      console.log("Signup success ",formData);
      let responseData;
      await fetch('http://localhost:4000/signup',{
         method:'POST',
         headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',
         },
         body:JSON.stringify(formData),
      }).then((response)=>response.json()).then((data)=>responseData=data)
      if(responseData.success){
         localStorage.setItem('auto-token',responseData.token);
         window.location.replace("/");
      }
      else{
         alert(responseData.errors)
      }
   }
   return (
    <div className="loginsignup">
      <div className="loginsignup-container">
         <h1>{state}</h1>
         <div className="loginsignup-fields">
            {state==="Login"?<></>:<input type="text" placeholder="Your name.." name="username" value={formData.username} onChange={changeHandle} />}
            <input name="email" value={formData.email} onChange={changeHandle} type="email" placeholder="Email Address.."/>
            <input name="password" value={formData.password} onChange={changeHandle} type="password" placeholder="Password"/>

         </div>
         <button onClick={()=>{state==="Sign Up"?signup():login()}}>Continue</button>
         {state==="Sign Up"?<p className="loginsignup-login">
            Already have an account?
            <span onClick={()=>{setState("Login")}}> Login here</span>
         </p>:
         <p className="loginsignup-login">Create an account?
         <span onClick={()=>{setState("Sign Up")}}> Click here</span></p>}
         
         <div className="loginsignup-agree">
            <input type="checkbox" name="" id=""/>
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
         </div>
      </div>

    </div>
   ) 
}
export default LoginSignup