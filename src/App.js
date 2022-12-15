
import './App.css';
import {Routes,Route, Navigate} from "react-router-dom"
import SignUp from './components/Signup/SignUp';
import Login from './components/Login/Login';
import { useUserContext } from './Hooks/useUserContext';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const context = useUserContext()
  const {user} = context
  const user1 = JSON.parse(localStorage.getItem('user'))
  // console.log(user)
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={user?<Home />:<Login />} />
        <Route path="/signup" element={user?<Navigate to="/" />:<SignUp />} />
        <Route path="/products" element={user1?<Products />:<Navigate to="/" /> } /> 
        <Route path="/products/:productId" element={user1?<ProductDetails />:<Navigate to="/" />} />
        <Route path="/cart" element={user1?<Cart />:<Navigate to="/"/>} />
      </Routes>
      <ToastContainer autoClose={2000} style={{"paddingTop":"40px"}}/>
      
    </div>
  );
}

export default App;
