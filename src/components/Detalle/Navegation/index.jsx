import { useState } from 'react'

export default function Navegation ( {documento, updateDoc} ) {
  const [stylesBtn] = useState([ 'btn me-1 navbtnAct', 'btn me-1 navbtn'])

  return(
    <>
     <ul className='nav nav-tabs mt-5'>
        <li className="nav-item">  
         <button className={documento === 'Explosión de Insumos' || documento === 'explosion' ? stylesBtn[0] :  stylesBtn[1] } onClick={() => {
           updateDoc('explosion')
          //  setStylesBtn([ 'btn me-1 navbtnAct', 'btn me-1 navbtn', 'btn me-1 navbtn'])
         }}>Explosion de Insumos</button>
        </li>
        <li className="ms-1 nav-item">
          <button className={documento === 'Tabulador de Mano de Obra' || documento === 'tabulador' ? stylesBtn[0] :  stylesBtn[1]} onClick={() => {
            updateDoc('tabulador')
            // setStylesBtn(['btn me-1 navbtn', 'btn me-1 navbtnAct', 'btn me-1 navbtn'])
          }}>Tabulador de Mano de Obra</button>
        </li>
        <li className="ms-1 nav-item">
          <button className={documento === 'fasar' || documento === 'Factor de Salario Real' ? stylesBtn[0] :  stylesBtn[1]} onClick={() => {
            updateDoc('fasar')
            // setStylesBtn(['btn me-1 navbtn', 'btn me-1 navbtn', 'btn me-1 navbtnAct'])
          }}>Factor de Salario Real</button>
        </li>
      </ul>
    </>
  )
}