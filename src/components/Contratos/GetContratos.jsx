import React from 'react'
import { useGlobal } from '../../hooks/useGlobal'
import { Link } from 'wouter'

function GetContratos ( {contratos} ) {
  const {setIdentifier, setDocumento} = useGlobal()

  return(
    <>
      {contratos.map(contrato => (
        <Link key={Math.random() * (1000 - 1) + 1} onClick={() => {
          setIdentifier(contrato.contratos_id)
          setDocumento(contrato.document)
          // console.log(contrato.document)
        }} to='/documentacion-tecnica/detalle'>
          <tr>
            <td className='text-nowrap p-3'>{contrato.recibido !== 'loading...' ? `${contrato.recibido.slice(8,10)}/${contrato.recibido.slice(5,7)}/${contrato.recibido.slice(0,4)}` : 'loading...'}</td>
            <td className='text-nowrap p-3'>{contrato.proyecto}</td>
            <td className='text-nowrap p-3'>{contrato.contratista === 'NUll' ? contrato.contratista_name : contrato.contratista}</td>
            <td className='text-nowrap p-3'>{contrato.especialidad}</td>
            <td className='text-nowrap p-3'>{contrato.contratista_objeto}</td>
            <td className='text-nowrap p-3'>{contrato.registro_patronal === 'NULL' ? 'No hay Registro Patronal' : contrato.registro_patronal}</td>
            <td className='text-nowrap p-3'>{contrato.num_aprox_trabajadores}</td>
            <td className='text-nowrap p-3'>{contrato.monto_obra !== 'loading...' ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(contrato.monto_obra) : 'loading...'}</td>
            <td className='text-nowrap p-3'>{contrato.fecha_inicio !== 'loading...' ? `${contrato.fecha_inicio.slice(8,10)}/${contrato.fecha_inicio.slice(5,7)}/${contrato.fecha_inicio.slice(0,4)}` : 'loading...'}</td>
            <td className='text-nowrap p-3'>{contrato.fecha_termino !== 'loading...' ? `${contrato.fecha_termino.slice(8,10)}/${contrato.fecha_termino.slice(5,7)}/${contrato.fecha_termino.slice(0,4)}` : 'loading...'}</td>
            <td className='text-nowrap p-3'>{contrato.subcontrata === 0 ? 'NO' : 'SI' }</td>
            <td className='text-nowrap p-3'>{contrato.comentarios}</td>
            <td className='text-nowrap p-3'>{contrato.estatus <= 1 ? 'PENDIENTE' : contrato.estatus === '2' ? 'ACEPTADO' : 'RECHAZADO'}</td>
            <td className='text-nowrap p-3'>{contrato.document}</td>
          </tr>
        </Link>
       ))}
    </>
  )
}

export default React.memo(GetContratos)