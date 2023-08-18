import './AddProduct.css'

import React from 'react'

import Dashboard from '../../Dashboard/Dashboard'

export default function AddProduct() {
  return (
    <div className='AddProduct'>
      <Dashboard />

      <div className='AddProduct-content'>
        <header className='AddProduct-header'>
          <nav>Товары и услуги </nav>
          <nav> / </nav>
          <nav>Добавить товар</nav>
        </header>

          <input placeholder='Наименование' />
          <select placeholder='Группа товаров'></select>
          <input placeholder='Наименование' />
          <input placeholder='Наименование' />
          <input placeholder='Наименование' />
          <input placeholder='Наименование' />
          <input placeholder='Наименование' />
      </div>
    </div>
  )
}
