import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Asistencias from './pages/Asistencias'
import Usuarios from './pages/Usuarios'
import Eventos from './pages/Eventos'
import Entradas from './pages/Entradas'
import Notificaciones from './pages/Notificaciones'
import './styles.css'

const Nav = () => (
  <nav className="top">
    {[
      ['Asistencias','/'],
      ['Usuarios','/usuarios'],
      ['Eventos','/eventos'],
      ['Entradas','/entradas'],
      ['Notificaciones','/notificaciones']
    ].map(([label, to]) => (
      <NavLink key={to} to={to} className={({isActive})=>`tab ${isActive?'active':''}`}>{label}</NavLink>
    ))}
  </nav>
)

export default function App(){
  return (
    <div>
      <Nav/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Asistencias/>} />
          <Route path='/usuarios' element={<Usuarios/>} />
          <Route path='/eventos' element={<Eventos/>} />
          <Route path='/entradas' element={<Entradas/>} />
          <Route path='/notificaciones' element={<Notificaciones/>} />
        </Routes>
      </div>
    </div>
  )
}
