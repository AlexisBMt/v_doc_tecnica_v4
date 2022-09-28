import { useDetalle } from "../../../hooks/useDetalle"

export default function Contrato ( {documento} ) {
  const {data} = useDetalle()

  return(
    <>
      <ul className='nav nav-tabs mt-5'>
        <li className="nav-item">
          <button className='btn' style={{backgroundColor: '#F94704', color: 'white'}} disabled>Contrato</button>
        </li>
      </ul>
      <div className='border-secondary pt-3 row'>
        <p style={{fontWeight: 'bold'}}  className='col' >Contratista</p>
        <p className='col'>{data ? data.contratista : ''}</p>
      </div>
      <div className='row'>
        <p style={{fontWeight: 'bold'}}  className='col'>Especialidad</p>
        <p className='col'>{data ? data.especialidad : ''}</p>
      </div>
      <div className='row'>
        <p style={{fontWeight: 'bold'}}  className='col'>Proyecto</p>
        <p className='col'>{data ? data.proyecto : ''}</p>
      </div>
      <div className='row'>
        <p style={{fontWeight: 'bold'}}  className='col'>Estatus</p>
        {data ? <p className='col'>{ documento === 'explosion' ? (data.explosion_estatus <= 1 ? 'Pendiente' : data.explosion_estatus === 2 ? 'Aceptado' :  data.explosion_estatus === 3 ? 'Rechazado' : '') : documento === 'tabulador' ? (data.tabulador_estatus <= 1 ? 'Pendiente' : data.tabulador_estatus === 2 ? 'Aceptado' : 'Rechazado') : (data.fasar_estatus <= 1 ? 'Pendiente' : data.fasar_estatus === 2 ? 'Aceptado' : 'Rechazado') }</p> : <p></p>}
      </div>
      <div className='row'>
        <p style={{fontWeight: 'bold'}}  className='col'>Zona</p>
        <p className='col'>{data ? data.zona : ''}</p>
      </div>
    </>
  )
}