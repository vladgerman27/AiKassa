import './AddProduct.css'

import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import Dashboard from '../../Dashboard/Dashboard'

export default function AddProduct() {
  const [categories, setCategories] = useState([])

  const [name, setName] = useState('')
  const [selectCategory, setSelectCategory] = useState('')
  const [selectUnit, setSelectUnit] = useState('')
  const [cost, setCost] = useState('')
  const [count, setCount] = useState('')
  const [vendorСode, setVendorСode] = useState('')
  const [code, setCode] = useState('')
  const [brand, setBrand] = useState('')
  const [barcode, setBarcode] = useState('')
  const [describtion, setDescribtion] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.log(error));
  }, []);

  const handleSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };

  const handleSelectUnit = (event) => {
    setSelectUnit(event.target.value);
  };

  const SaveProduct = async (e)=> {
    e.preventDefault();
    try {
      const data = {
        name: name,
        category: selectCategory,
        unit: selectUnit,
        cost: cost,
        count: count,
        vendorСode: vendorСode,
        code: code,
        brand: brand,
        describtion: describtion,
        note: note
      }

      await axios.post('http://localhost:8080/products', data)
      console.log('Product added successfully')
    } catch (error) {  
      console.error(error);
    }
  }

  function RemoveProduct() {
    setName('')
    setSelectCategory('')
    setSelectUnit('')
    setCost('')
    setCount('')
    setVendorСode('')
    setCode('')
    setBrand('')
    setDescribtion('')
    setNote('')
  }

  return (
    <div className='AddProduct'>
      <Dashboard />

      <div className='AddProduct-content'>
        <header className='AddProduct-header'>
          <NavLink to='/product-editor'><nav>Товары и услуги </nav></NavLink>
          <nav> / </nav>
          <nav>Добавить товар</nav>
        </header>

          <input placeholder='Наименование' value={name} onChange={(e) => setName(e.target.value)}/>
          <select id="category" name="category" value={selectCategory} onChange={handleSelectCategory}>
            <option/>
            {categories.map(category => (
                <option key={category._id} value={category.name}>
                    {category.name}
                </option>
            ))}
        </select>
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
          <input placeholder='Цена розница' value={cost} onChange={(e) => setCost(e.target.value)}/>
          <input placeholder='Минимальное производимое количество' value={count} onChange={(e) => setCount(e.target.value)}/>
          <input placeholder='Артикул' value={vendorСode} onChange={(e) => setVendorСode(e.target.value)}/>
          <input placeholder='Код товара' value={code} onChange={(e) => setCode(e.target.value)}/>
          <input placeholder='Бренд' value={brand} onChange={(e) => setBrand(e.target.value)}/>
          <input placeholder='Штрихкоды' value={barcode} onChange={(e) => setBarcode(e.target.value)}/>
          <input placeholder='Описание товара' value={describtion} onChange={(e) => setDescribtion(e.target.value)}/>
          <input placeholder='Скрытая заметка' value={note} onChange={(e) => setNote(e.target.value)}/>

          <div>
            <button onClick={RemoveProduct}>Удалить</button>
            <div>
              <NavLink to='/product-editor'><button>Отменить</button></NavLink>
              <button onClick={SaveProduct}>Добавть</button>
            </div>
          </div>
      </div>
    </div>
  )
}
