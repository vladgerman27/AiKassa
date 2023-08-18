import './Dashboard.css'

import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    NavLink,
    BrowserRouter,
    useNavigate
  } from "react-router-dom"
  
export default function Home() {
  return (
    <div className='Home'>
      <div className='dashboard'>
        <div className='category'>
          <nav className='category-title'>-ТОВАРЫ</nav>
          <div className='blocks'>
            <NavLink className='block-link' to='/product-editor'>
              <div className='block'>
                <img/>
                <nav className='block-title'>Редактор товаров</nav>
              </div>
            </NavLink>
            <NavLink className='block-link' to='/product-editor'>
              <div className='block'>
                <img/>
                <nav className='block-title'>Редактор цен</nav>
              </div>
            </NavLink>
            <NavLink className='block-link' to='/product-editor'>
              <div className='block'>
                <img/>
                <nav className='block-title'>Скачать прайслист</nav>
              </div>
            </NavLink>
            <NavLink className='block-link' to='/product-editor'>
              <div className='block'>
                <img/>
                <nav className='block-title'>Редактор штрихкодов</nav>
              </div>
            </NavLink>
            <NavLink className='block-link' to='/product-editor'>
              <div className='block'>
                <img/>
                <nav className='block-title'>Печать этикеток</nav>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
