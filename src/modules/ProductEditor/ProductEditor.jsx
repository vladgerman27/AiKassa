import './ProductEditor.css'

import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { NavLink  } from 'react-router-dom'
import axios from 'axios'

import Dashboard from '../Dashboard/Dashboard'

export default function ProductEditor() {
  const [modalImport, setModalImport] = useState(false);
  const [modalGroup, setModalGroup] = useState(false);
  const [modalBtn, setModalBtn] = useState(false);

  const [category, setCategory] = useState('')
  const [products, setProducts] = useState([])

  const [name, setName] = useState('')
  const [vendorСode, setVendorСode] = useState('')
  const [barcode, setBarcode] = useState('')
  const [selectUnit, setSelectUnit] = useState('')
  const [cost, setCost] = useState('')

  const [searchProduct, setSearchProduct] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  const AddCategory = async (e)=> {
    e.preventDefault();
    try {
      const data = {
        name: category
      }

      await axios.post('http://localhost:8080/categories', data)
      console.log('Category added successfully')
    } catch (error) {  
      console.error(error);
    }
  }

  const handleSelectUnit = (event) => {
    setSelectUnit(event.target.value);
  };

  const SaveProduct = async (e)=> {
    e.preventDefault();
    try {
      const data = {
        name: name,
        vendorСode: vendorСode,
        barcode: barcode,
        unit: selectUnit,
        cost: cost,
      }

      await axios.post('http://localhost:8080/products', data)
      fetch('http://localhost:8080/products')
          .then(res => res.json())
          .then(data => setProducts(data))
          .catch(error => console.log(error));
      console.log('Product added successfully')
    } catch (error) {  
      console.error(error);
    }
  }

  const DeleteProduct = async (productId) => {
    try {
      setModalBtn(false)
      await axios.delete(`http://localhost:8080/products/${productId}`);
        fetch('http://localhost:8080/products')
          .then(res => res.json())
          .then(data => setProducts(data))
          .catch(error => console.log(error));
      console.log('Product deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const SearchProductChange = (e) => {
    setSearchProduct(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.vendorСode.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.barcode.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.unit.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.cost.toLowerCase().includes(searchProduct.toLowerCase())
    )
  });

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
          <input className='search' placeholder='Поиск товара' value={searchProduct} onChange={SearchProductChange}/>
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
              {filteredProducts.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.vendorСode}</td>
                  <td>{product.barcode}</td>
                  <td>{product.unit}</td>
                  <td>{product.cost}тг</td>
                  <td>
                    <button className='editBtn' onClick={() => setModalBtn(true)}><img /></button>
                    <Modal className='ProductEditor-modal' isOpen={modalBtn} onRequestClose={() => setModalBtn(false)}>
                      <button onClick={() => DeleteProduct(product._id)}>Удалить товар</button>
                    </Modal>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          <div className='add-product'>
            <input className='th1' placeholder='Наименование'  value={name} onChange={(e) => setName(e.target.value)}/>
            <input className='th2' placeholder='Артикул'  value={vendorСode} onChange={(e) => setVendorСode(e.target.value)}/>
            <input className='th3' placeholder='Штрихкод' value={barcode} onChange={(e) => setBarcode(e.target.value)}/>
            <select value={selectUnit} onChange={handleSelectUnit}>
              <option>Единица измерения</option>
              <option value='шт'>шт</option>
              <option value='Коробка'>Коробка</option>
              <option value='уп'>уп</option>
              <option value='Комплект'>Комплект</option>
              <option value='г'>г</option>
              <option value='кг'>кг</option>
              <option value='т'>т</option>
              <option value='л'>л</option>
              <option value='мл'>мл</option>
              <option value='м2'>м2</option>
              <option value='м3'>м3</option>
              <option value='см'>см</option>
              <option value='м'>м</option>
              <option value='Лист'>Лист</option>
            </select>
            <input className='th5' placeholder='Розничная' type='number'  value={cost} onChange={(e) => setCost(e.target.value)}/>
            <button onClick={SaveProduct}>Добавить товар</button>
          </div>
        </div>
      </div>
    </div>
  )
}
