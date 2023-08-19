import './ProductEditor.css'

import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { NavLink  } from 'react-router-dom'
import axios from 'axios'

import Dashboard from '../Dashboard/Dashboard'

export default function ProductEditor() {
  const [modalImport, setModalImport] = useState(false);
  const [modalGroup, setModalGroup] = useState(false);

  const [category, setCategory] = useState('')

  const AddCategory = async (e)=> {
    e.preventDefault();
    try {
      const data = {
        category: category
      }

      await axios.post('http://localhost:8080/categories', data)
      console.log('Category added successfully')
    } catch (error) {  
      console.error(error);
    }
  }

  return (
    <div className='ProductEditor'>
      <Dashboard/>

      <Modal className='ProductEditor-modal' isOpen={modalImport} onRequestClose={() => setModalImport(false)}>
        <div className='modal-header'>
          <nav>Импорт товаров</nav>
          <button onClick={() => setModalImport(false)}>x</button>
        </div>
        <nav>Шаг 1 из 2. Загрузите файл с товарами</nav>
        <label><input type='file'/></label>
        <nav>Подерживаются форматы Microsoft Excel (.xlsx или .csv)</nav>
        <a>Скачать образец файла</a>
      </Modal>

      <Modal className='ProductEditor-modal-group' isOpen={modalGroup} onRequestClose={() => setModalGroup(false)}>
        <div className='modal-header'>
          <nav>Добавить группу товаров</nav>
          <button onClick={() => setModalGroup(false)}>x</button>
        </div>
        <input className='add-group' placeholder='Наименование группы товаров' value={category} onChange={(e) => setCategory(e.target.value)}/>
        <label><input type='checkbox' /><span>Скрыть от продаж</span></label>
        <nav>Подходит для товаров, не продаваемых отдельно. Например, составные продукты, используемые в блюдах</nav>
        <nav>Показывать эту группу товаров в филиалах</nav>
        <label><input type='checkbox' /><span>Отметить все филиалы</span></label>
        <label><input type='checkbox' /><span>Головной офис</span></label>
        <div className='modal-bottom'>
          <button onClick={AddCategory}>Сохранить</button>
        </div>
      </Modal>

      <div className='ProductEditor-content'>
        <header className='ProductEditor-header'>
          <div className='ProductEditor-header-left'>
            <nav>Товары и услуги</nav>
            <select>
              <option>Все филиалы</option>
              <option>Головной офис</option>
            </select>
            <select>
              <option>Все группы товаров</option>
              <option>Товары без группы</option>
            </select>
          </div>
          <div className='ProductEditor-header-right'>
            <button onClick={() => setModalImport(true)}><img />Импорт</button>
            <button onClick={() => setModalGroup(true)}><img />Группа товаров</button>
            <NavLink to='/product-editor/add-product'><button><img />Товар</button></NavLink>
            <button><img />Комплект</button>
          </div>
        </header>

        <div className='ProductEditor-main-content'>
          <input className='search' placeholder='Поиск товара' />
          <table className='products-table'>
            <tbody>
              <tr className='table-head'>
                <th className='th1'>ТОВАР</th>
                <th className='th2'>АРИТИКУЛ/КОД</th>
                <th className='th3'>ШТРИХКОД</th>
                <th className='th4'>ЕД. ИЗМ.</th>
                <th className='th5'>ЦЕНА РОЗНИЦА</th>
                <th className='th6'></th>
              </tr>
            </tbody>
          </table>

          <div className='add-product'>
            <input className='th1' placeholder='Наименование'/>
            <input className='th2' placeholder='Артикул'/>
            <input className='th3' placeholder='Штрихкод'/>
            <select className='th4'>
              <option>шт</option>
              <option>кор</option>
              <option>уп</option>
              <option>К-т</option>
              <option>г</option>
              <option>кг</option>
              <option>т</option>
              <option>л</option>
              <option>мл</option>
              <option>м2</option>
              <option>м3</option>
              <option>см</option>
              <option>м</option>
            </select>
            <input className='th5' placeholder='Розничная'/>
            <button>Добавить товар</button>
          </div>
        </div>
      </div>
    </div>
  )
}
