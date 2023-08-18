import './Singup.css'

import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Singup({ handleSetIsAuth }) {
  const [account, setAccount] = useState(false)
  const navigate = useNavigate()
  const [singupMis, setSingupMis] = useState("")

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // const [formData, setFormData] = useState({
  //   name: name,
  //   email: email,
  //   password: password,
  //   phone: phone
  // });

  const Register = async (e) => {
    e.preventDefault();
    if (name === "" || phone == "" || email === "" || password === "" || confirmPassword === "" || confirmPassword !== password) {
      setSingupMis("Пропущено поле или введен неверный пароль. Повторите ввод.")
    } else {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("phone", phone);
  
        const response = await axios.post('http://localhost:8080/register', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        localStorage.setItem('isAuth', response.data.token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userPhone', phone);
        handleSetIsAuth(response.data.token);
        setAccount(true);
        navigate('/product-editor')
      } catch (error) {  
        console.error(error);
        setSingupMis("Пользователь с таким email уже зарегистрирован");
      }
    }
  };    

  return (
    <div className='Singup'>
      <div className='singup-block'>
        <nav className='singupTitle'>Регистрация</nav>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Имя' />
        <div className='singup-input'>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Телефон' />
          <input value={email} type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
          <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' />
          <input value={confirmPassword}  type='password' onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Повторите пароль' />
        </div>
        <nav className='mistake'>{singupMis}</nav>
        <div className='singup-bottom'>
          <div className='rules'>
            <div className='accept'>
              <input type='checkbox'/>
              <nav>Я принимаю условия</nav>
            </div>
            <nav></nav>
          </div>
          <button className='loginBtn'onClick={Register}>Зарегистрироваться</button>
        </div>
        
      </div>
    </div>
  )
}
