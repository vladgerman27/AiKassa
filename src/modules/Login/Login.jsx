import './Login.css'

import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login({ handleSetIsAuth }) {
    const [account, setAccount] = useState(false)

    const [loginMis, setLoginMis] = useState("")

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const Login = async (e) => {
      e.preventDefault();
      if (email === "" || password === "") {
        setLoginMis("Пропущено поле для заполнения.")
      } else {
        try {
          const response = await axios.post("http://localhost:8080/login", { email, password });
          const { token, name, phone } = response.data;
          
          localStorage.setItem("isAuth", token);
          localStorage.setItem('userName', name);
          localStorage.setItem('userPhone', phone);

          handleSetIsAuth(token);
          setName(name);
          setPhone(phone)
          setAccount(true);
          navigate('/product-editor')
        } catch (error) {
          console.error(error);
          setLoginMis("Неверный логин или пароль");
        }
      }
    }

    function toSingup() {
      navigate('/singup')
    }

  return (
    <div className='Login'>
      <div className='login-block'>
        <nav className='titleProfile'>Вход</nav>
        <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder='Пароль' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <nav>{loginMis}</nav>
        <div className='loginBtns'>
          <button className="singupBtn" onClick={toSingup}>Зарегистрироваться</button>
          <button className='loginBtn' onClick={Login}>Войти</button>
        </div>
        
      </div>
    </div>
  )
} 
