import './App.css'

import React, { useRef, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  NavLink,
  BrowserRouter,
  useNavigate
} from "react-router-dom"

import Intro from './modules/Intro/Intro'
import Login from './modules/Login/Login'
import Singup from './modules/Singup/Singup'
import ProductEditor from './modules/ProductEditor/ProductEditor'
import AddProduct from './modules/ProductEditor/AddProduct/AddProduct'

function App() {
  const token = localStorage.getItem('isAuth');
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const handleSetIsAuth = (token) => {
    setIsAuth(token);
  };

  return (
    <Router>
      <Routes className='App'>
        <Route path='/' element={<Intro/>} />
        <Route path="/login"  element={<Login element={isAuth} handleSetIsAuth={handleSetIsAuth}/>}/>
        <Route path='/singup' element={<Singup element={isAuth} handleSetIsAuth={handleSetIsAuth}/>}/>
        <Route path='/product-editor' element={<ProductEditor/>}/>
        <Route path='/product-editor/add-product' element={<AddProduct/>}/>
      </Routes>
    </Router>
  )
}

export default App;
