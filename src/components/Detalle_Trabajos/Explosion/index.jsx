import { useEffect, useState } from 'react'
import { useDetalleT } from '../../../hooks/useDetalleT'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import Spinner from '../../Spinner/index'
import Alerts from '../Alerts/index'
import { url_oc } from '../../../helpers/docDetalle'

function Header () {
  return (
    <tr>
      <th>Total de Materiales</th>
      <th>Total de Mano de Obra</th>
      <th>Total de Equipo</th>
      <th>Importe Total</th>
    </tr>
  )
}

function Info ( {title, info_data} ) {
  return (
    <div className='row mt-1'>
      <div className='col fw-bold'>{title}</div>
      <div className='col'>{info_data}</div>
    </div>
  )
}

function Ocinfo ( {ocs} ) {
  return(
    <div className='overflow-auto mx-1'>

      <table className='table table-bordered text-nowrap mt-5' style={{fontSize: '0.8rem'}}>
        <thead className='table-dark text-center'>
          <tr>
            <th scope='col' >#OC</th>
            <th scope='col' >CONCEPTO</th>
            <th scope='col' >PESOS</th>
            <th scope='col' >DOLARES</th>
            <th scope='col' >F. INICIO</th>
            <th scope='col' >F. TERMINO</th>
          </tr>
        </thead>
        <tbody>
          {ocs.map(element => (
            <tr key={element.id}> 
              <td>{element.tipo}</td>
              <td>{element.objeto}</td>
              <td>{element.importe !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(element.importe) : ''}</td>
              <td>{element.importe_dolares !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(element.importe_dolares) : ''}</td>
              <td>{element.fecha_inicio !== undefined ? `${element.fecha_inicio.slice(8,10)}/${element.fecha_inicio.slice(5,7)}/${element.fecha_inicio.slice(0,4)}` : ''}</td>
              <td>{element.fecha_termino !== undefined ? `${element.fecha_termino.slice(8,10)}/${element.fecha_termino.slice(5,7)}/${element.fecha_termino.slice(0,4)}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <table className='table table-bordered text-nowrap my-5' style={{fontSize: '0.8rem'}}>
        <thead className='table-dark text-center'>
          <tr>
            <th>#OC</th>
            <th>CONCEPTO</th>
            <th>MATERIALES</th>
            <th>MONTO DE OBRA</th>
            <th>EQUIPO</th>
            <th>TOTAL</th>
          </tr>
        </thead>
      </table>

    </div>
  )
}

export default function Explosion () {
  const {data, loading} = useDetalleT()
  const [status, setStatus] = useState(0)
  const [ocs, setOcs] = useState([])

  useEffect( () => {
    if(Object.keys(data).length > 0){
      fetch(`${url_oc}q=${data.contratista_id},${data.proyecto_id},${data.especialidad}`)
        .then(res => res.json())
        .then(result => setOcs(result))
    }
  }, [data])

  const handlerClick = () => {
    const data = {
      identifier: 1,
      comentario: document.getElementById('comentario_bmt').value,
      estatus_revision: status
    }
    fetch('http://localhost:8000/api/receive-data', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => console.log(result))
    document.getElementById('comentario_bmt').value = ''
  }

  return (
    <>
      <div className='mb-2 bg-light'>{loading ? <Spinner /> : <div></div>}</div>
      <div className='card' >
        <div className='card-header' style={{fontWeight: 'bold'}} >INFORMACIÓN</div>
        <div className='card-body'>
          <table className='table'>
            <thead><Header/></thead>
            <tbody>
              <tr>
                <td>{ data.total_materiales !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(data.total_materiales) : ''}</td>
                <td>{ data.total_mano_obra !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(data.total_mano_obra) : ''}</td>
                <td>{ data.total_equipo !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(data.total_equipo) : ''}</td>
                <td>{ data.importe_total !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(data.importe_total) : ''}</td>
              </tr>  
            </tbody>
          </table>
          <p style={{fontWeight: 'bold'}}>Comentario: </p>
        </div>
      </div>

      <div className='mt-5 row'>
        <section className='col-6'>
          <div className='card'>
            <div className='card-header fw-bold'>CONTRATO</div>
            <div className='card-body py-4'>
              <Info title={'Contratista'}  info_data={data.contratista_name}/>
              <Info title={'Especialidad'} info_data={data.especialidad} />
              <Info title={'Registro Patronal'} info_data={data.registro_patronal === 'NULL' ? 'No hay Registro Patronal' : data.registro_patronal} />
              <Info title={'Objeto'} info_data={data.contratista_objeto} />
              <Info title={'Ubicacion'} info_data={data.colonia} />
              <Info title={'No. Aprox. de Trabajadores'} info_data={data.num_aprox_trabajadores} />
              <div className='row'>
                <div className='col'><Info title={'F. Inicio'} info_data={data.fecha_inicio !== undefined ? `${data.fecha_inicio.slice(8,10)}/${data.fecha_inicio.slice(5,7)}/${data.fecha_inicio.slice(0,4)}` : ''} /></div>  
                <div className='col'><Info title={'F. Termino'} info_data={data.fecha_termino !== undefined ? `${data.fecha_termino.slice(8,10)}/${data.fecha_termino.slice(5,7)}/${data.fecha_termino.slice(0,4)}` : ''} /></div>
              </div>
              <Info title={'Importe en pesos'} info_data={ data.monto_obra !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(data.monto_obra) : ''} />
              <Info title={'Importe en dolares'} info_data={ data.monto_obra_dolares !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(data.monto_obra_dolares) : ''} />

              <Ocinfo ocs={ocs} />
            </div>
          </div>
        </section>
        <section className='col-6 overflow-auto'>
          <div className='card'>
            <div className='card-header fw-bold'>DOCUMENTO</div>
            <div className='card-body'>
              <div className='my-4 mx-2 float-end'>
                <div className='btn-group' role='group'>
                  <button className='btn btn-outline-success' data-bs-toggle='collapse' href='#comentario' onClick={() => setStatus(2)}>Aceptar</button>
                  <button className='btn btn-outline-danger' data-bs-toggle='collapse' href='#comentario' onClick={() => setStatus(3)}>Rechazar</button>
                </div>
                <button className='btn btn-primary mx-2' onClick={handlerClick}>Guardar</button>
                <div className='collapse text-end' id='comentario'>
                  <textarea className='align-end d-block' id='comentario_bmt' cols='32' rows='3' placeholder='comentario'></textarea>
                  <button className='btn btn-danger mx-1' data-bs-toggle='collapse' href='#comentario'>Cerrar</button>
                </div>
              </div>
            </div>
            <Alerts estatus={data.explosion_estatus}/>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
              <Viewer fileUrl='http://localhost:3000/test.pdf' />
            </Worker>
          </div>
        </section>
      </div>
    </>
  )
}