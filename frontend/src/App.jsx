
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Order from './Pages/Order';
import OrderHistory from './Pages/OrderHistory';
import Menus from './Pages/Menus';
import News from './Pages/News';
import Posts from './Pages/Posts';
import Contact from './Pages/Contact';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/contact' element={<Contact/>}/>
        
        <Route path='/menus' element={<Menus/>}/>
      
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/order-history' element={<OrderHistory/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
