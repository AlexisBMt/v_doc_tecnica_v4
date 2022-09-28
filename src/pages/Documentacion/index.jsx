import React, { useState } from 'react'
import { Link } from 'wouter'
import Contratos from '../../components/Contratos/index'
import TrabajosExtra from '../../components/TrabajosExtra/index'
import { ContratosContextProvider } from '../../context/ContratosContext'
import { DocumentacionContextProvider } from '../../context/DocumentacionContext'
import { TrabajosContextProvider } from '../../context/TrabajosContext'
import './styles.css'

export default function Documentacion () {
  const [status, setStatus] = useState(true)
  const [btnStatus, setBtnStatus] = useState([1, 0])
  const stylesBtn = ['btn mx-1 navbtn', 'btn mx-1 navbtnAct']

  const handlerClickContratos = () => {
    setStatus(true)
    setBtnStatus([1, 0])
  }

  const handlerClickTrabajos = () => {
    setStatus(false)
    setBtnStatus([0, 1])
  }

  return(
    <>
      <h1 className='paginas-titulo'>Documentacion Tecnica</h1>
      <nav aria-label='breadcrumb' style={{backgroundColor: '#e2e3e5'}}>
        <ol className='breadcrumb px-5 py-3'>
          <li className='breadcrumb-item'><Link className='text-decoration-none' to='/'>Home</Link></li>
          <li className='breadcrumb-item' aria-current='page'>Documentacion Tecnica</li>
        </ol>
      </nav>

      <ul className='nav nav-tabs mt-5'>
        <li className="nav-item">  
          <button className={stylesBtn[btnStatus[0]]} onClick={handlerClickContratos}>Contratos</button>
        </li>
        <li className="nav-item">
          <button className={stylesBtn[btnStatus[1]]} onClick={handlerClickTrabajos}>Trabajos Extra</button>
        </li>
      </ul>

      <DocumentacionContextProvider>
        <div className='bg-light py-5'>
          { status ? (
            <ContratosContextProvider>
              <Contratos /> 
            </ContratosContextProvider>
          ) : (
            <TrabajosContextProvider>
              <TrabajosExtra />
            </TrabajosContextProvider>
          ) }
        </div> 
      </DocumentacionContextProvider>
    </>
  )
}