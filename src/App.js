import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import AddProduct from "./pages/AddProduct";
import Cart from './pages/Cart';
import Checkout from "./pages/Checkout";
import Error from './pages/Error';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Login from './pages/Login';
import Logout from "./pages/Logout";
import Order from "./pages/Order";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import './App.css';
import { UserProvider } from "./UserContext";

function App() {

  const [user, setUser] = useState({ access: localStorage.getItem("token") });

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`http://localhost:4000/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (typeof data.user !== "undefined"){
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container fluid>     
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/products" element={<Products />}/>
            <Route path="/products/:productId" element={<ProductView />}/>
            <Route path="/addProduct" element={<AddProduct />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/order" element={<Order />}/>
            <Route path="/checkout" element={<Checkout />} /> 
            <Route path="/profile" element={<Profile />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/*" element={<Error />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;