const port =4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer= require("multer");
const path= require("path");
const cors= require("cors");
const { type } = require("os");
const { error } = require("console");
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://tuyet2203:tuyet2203@cluster0.2criioi.mongodb.net/e-commerce");
//tạo api

app.get("/",(req,res)=>{
    res.send("Express app is running")
})
//lưu trữ hình ảnh
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload= multer({storage:storage})
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const Product= mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
       type: String,
       required: true
    },
    image:{
        type: String,
        required: true
     },
     category:{
        type: String,
        required: true
     },
     new_price:{
        type:Number,
        required:true
     },
     old_price:{
        type: Number,
        required: true
     },
     date:{
        type: Date,
        default: Date.now
     },
     avilable:{
        type:Boolean,
        default:true
     }
})
app.post('/addproduct',async(req,res)=>{
    let products= await Product.find({});
    let id;
        if(products.length>0){
            let last_product_array= products.slice(-1);
            let last_product= last_product_array[0];
            id= last_product.id+1;
        }
        else{
            id:1;
        }
    const product= new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name:req.body.name
    })
})

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

app.get('/allproducts',async(req,res)=>{
    let products= await Product.find({});
    console.log("All Products Fetched");
    res.send(products);

})


//

const Users= mongoose.model('Users',{
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password:{
        type: String
    },
    cartData:{
        type:Object,
    },
    date:{
        type: Date,
        default: Date.now
    }
})
//
app.post('/signup',async (req,res)=>{

    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,errors:"Email đã được đăng ký"})
    }
    let cart={};
    for(let i=0; i<300; i++){
       cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password: req.body.password,
        cartData:cart,
    })
    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const token= jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})
//
app.post('/login',async (req,res)=>{
    let user= await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data={
                user:{
                    id: user.id
                }
            }
            const token= jwt.sign(data,"secret_ecom");
            res.json({
                success:true,token
            });
        }
        else{
            res.json({success:false, errors:"Lỗi đăng nhập mật khẩu"});
        }
    }
    else{
        res.json({success:false,errors:"Email không đúng!!"})
    }
})
//

app.get('/newcollections', async(req,res)=>{
    let products= await Product.find({});
    let newcollection= products.slice(1).slice(-8);
    console.log("Newcollections Fetched");
    res.send(newcollection)
})
//
app.get('/popularinwomen', async(req, res)=>{
    let products= await Product.find({category:"women"});
    let popular_in_women= products.slice(0,4);
    console.log("Popular in women fetched ");
    res.send(popular_in_women);
})

//

const Order = mongoose.model("Order", {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["Chuẩn bị","Đang giao", "Đã giao"], 
        default: "Chuẩn bị" 
    },
    date: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    products: [{
        productId: { type: Number, required: true },
        image: {type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }]
});

//
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ errors: "Vui lòng xác thực bằng token hợp lệ" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ errors: "Vui lòng xác thực bằng token hợp lệ" });
    }
};


    //
    app.get('/order-history', fetchUser, async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.user.id }).sort({ date: -1 });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi lấy lịch sử đơn hàng.' });
        }
    });
    // lấy đơn hàng theo id
   
app.get('/order/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
    //
    
    app.post('/addtocart',fetchUser,async (req,res)=>{
        console.log("Added", req.body.itemId)
        let userData= await Users.findOne({_id:req.user.id});
        userData.cartData[req.body.itemId]+=1;
        await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
        res.send("Added")
    })
    //
    app.post('/removefromcart',fetchUser, async (req,res)=>{
        console.log("removed", req.body.itemId)
        let userData= await Users.findOne({_id:req.user.id});
        if(userData.cartData[req.body.itemId]>0)
        userData.cartData[req.body.itemId]-=1;
        await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
        res.send("Removed")
    })
//
 app.post('/getcart',fetchUser, async (req,res)=>{
    console.log("get cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
 })

 //
 app.post('/order', fetchUser, async (req, res) => {
    const { name, phoneNumber, email, address, paymentMethod } = req.body;
    const userData = await Users.findOne({ _id: req.user.id });
    
    const cartItems = userData.cartData;
    let totalAmount = 0;
    const purchasedProducts = [];

    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            let itemInfo = await Product.findOne({ id: Number(item) });
            if (itemInfo) {
                totalAmount += itemInfo.new_price * cartItems[item];
                purchasedProducts.push({
                    productId: itemInfo.id,
                    image: itemInfo.image,
                    name: itemInfo.name,
                    quantity: cartItems[item],
                    price: itemInfo.new_price
                });
            }
        }
    }
    const order = new Order({
        userId: req.user.id,
        
        name,
        phoneNumber,
        email,
        address,
        paymentMethod,
        status: "Chuẩn bị",
        totalAmount,
        products: purchasedProducts
    });

    await order.save();
    res.json({ success: true, order });
});
// lấy danh sách order
app.get('/order', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ date: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng.' });
    }
});
//
app.put('/order/:id', async (req, res) => {
    try {
        const { status } = req.body; // Trạng thái mới từ client
        if (!["Chuẩn bị","Đang giao", "Đã giao"].includes(status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
        }

        // Tìm đơn hàng theo ID
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save(); 
            res.json({ success: true, order });
        } else {
            res.status(404).json({ message: 'Đơn hàng không tìm thấy' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// xóa đơn hàng
app.delete('/order/:id',  async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
       
        await order.remove();
        res.json({ success: true, message: 'Đơn hàng đã được hủy.' });
    } catch (error) {
        res.status(500).json({ success: false, message: `Lỗi: ${error.message}` });
    }
});



//
app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port " + port)
    }
    else{
        console.log("Error : " + error)
    }

})
