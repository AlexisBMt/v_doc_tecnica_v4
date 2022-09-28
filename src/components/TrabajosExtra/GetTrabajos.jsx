import React from 'react'
import { useGlobal } from '../../hooks/useGlobal'
import { Link } from 'wouter'

function GetTrabajos({ trabajos }) {
  const {setIdentifier, setDocumento} = useGlobal()
  
  return (
    <>
      {trabajos.map(trab => (
        <Link key={Math.random() * (1000 - 1) + 1} onClick={() => {
            setIdentifier(trab.contratos_id)
            setDocumento(trab.document)
          }} to='/documentacion-tecnica/detalle-trabajos-extra'> 
          <tr>
            <td className='text-nowrap p-3'>{trab.recibido !== 'loading...' ? `${trab.recibido.slice(8,10)}/${trab.recibido.slice(5,7)}/${trab.recibido.slice(0,4)}` : 'loading...'}</td>
            <td className='text-nowrap p-3'>{trab.zona}</td>
            <td className='text-nowrap p-3'>{trab.proyecto}</td>
            <td className='text-nowrap p-3'>{trab.contratista === 'NULL' ? trab.contratista_name : trab.contratista}</td>
            <td className='text-nowrap p-3'>{trab.especialidad}</td>
            <td className='text-nowrap p-3'>{trab.contratista_objeto}</td>
            <td className='text-nowrap p-3'>{trab.estatus <= 1 ? 'PENDIENTE' : trab.estatus === '2' ? 'ACEPTADO' : 'RECHAZADO'}</td>
            <td className='text-nowrap p-3'>{trab.document}</td>
          </tr>
        </Link>  
      ))}
    </>
  )
}

export default React.memo(GetTrabajos)