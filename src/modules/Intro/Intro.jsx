import './Intro.css'

import React, { useRef } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  NavLink,
  BrowserRouter,
  useNavigate
} from "react-router-dom"

export default function Intro() {
    const main = useRef(null)
    const funcs =  useRef(null)
    const tarif =  useRef(null)
    const support =  useRef(null)
    const partners =  useRef(null)
    const contacts =  useRef(null)
  
    const scrollToSection = (ref) => {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div className='intro'>
        <header className='main-header'>
        <a onClick={() => scrollToSection(main)}>Главная</a>
        <a onClick={() => scrollToSection(funcs)}>Функции</a>
        <a onClick={() => scrollToSection(partners)}>Партнёрство</a>
        <a onClick={() => scrollToSection(support)}>Поддержка</a>
        <a onClick={() => scrollToSection(tarif)}>Тарифы</a>
        <a onClick={() => scrollToSection(contacts)}>Контакты</a>
        <NavLink to='/login'><button>Войти</button></NavLink>
        <NavLink to='/singup'><button>Зарегистрироваться</button></NavLink>
      </header>
      
      <div ref={main} className='main'>
        <nav className='main-title'>Простая программа для торговли Управляй бизнесом легко</nav>
        <span>Понятный учет товаров, денег, закупок, продаж, склада, клиентов и  доставок</span>
        <img className='main-img' /> 
        <nav className='main-nav'>В программе есть всё необходимое для эффективного управления торговлей, в простой и понятной форме. Раскрывайте потенциал вашего бизнеса с нами!</nav>
        <div className='cards'>
          <div className='card'>
            <img />
            <nav>Удобная</nav>
            <span>Программа ADiSHOP простая, удобная в ежедневной работе и понятная для всех - от новичков до экспертов</span>
          </div>
          <div className='card'>
            <img />
            <nav>Эффективная</nav>
            <span>Программа ADiSHOP избавляет от хаоса в товароучете и финансах. Поднимает лояльность клиентов и прибыльность бизнеса</span>
          </div>
          <div className='card'>
            <img />
            <nav>Масштабируемая</nav>
            <span>ADiSHOP подходит для легкой и бесшовной автоматизации сети филиалов в едином облачном пространстве</span>
          </div>
        </div>
      </div>

      <div ref={funcs}>

      </div>

      <div ref={tarif}>

      </div>

      <div ref={support}>

      </div>

      <div ref={partners}>
        
      </div>

      <div ref={contacts}>

      </div>
    </div>
  )
}
