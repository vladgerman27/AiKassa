import './AddProduct.css'

import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'

import Dashboard from '../../Dashboard/Dashboard'

export default function AddProduct() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/catrgories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='AddProduct'>
      <Dashboard />

      <div className='AddProduct-content'>
        <header className='AddProduct-header'>
          <NavLink to='/product-editor'><nav>Товары и услуги </nav></NavLink>
          <nav> / </nav>
          <nav>Добавить товар</nav>
        </header>

          <input placeholder='Наименование' />
          <select id="category" name="category">
            {categories.map(category => (
                <option key={category._id} value={category._id}>
                    {category.categoryName}
                </option>
            ))}
        </select>
          <select>
              <option>шт</option>
              <option>Коробка</option>
              <option>уп</option>
              <option>Комплект</option>
              <option>г</option>
              <option>кг</option>
              <option>т</option>
              <option>л</option>
              <option>мл</option>
              <option>м2</option>
              <option>м3</option>
              <option>см</option>
              <option>м</option>
              <option>Лист</option>
            </select>
          <input placeholder='Цена розница' />
          <input placeholder='Артикул' />
          <input placeholder='Код товара' />
          <input placeholder='Бренд' />
          <input placeholder='Штрихкоды' />
          <input placeholder='Описание товара' />
          <input placeholder='Скрытая заметка' />
      </div>
    </div>
  )
}
