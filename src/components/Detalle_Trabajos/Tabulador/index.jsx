import { useState } from 'react'
import { useDetalleT } from '../../../hooks/useDetalleT'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import Spinner from '../../Spinner/index'
import Alerts from '../Alerts/index'


function Header () {
  return (
    <tr>
      <th>Categoria</th>
      <th>Unidad</th>
      <th>F. Inicio</th>
      <th>F. Termino</th>
      <th>Cantidad</th>
      <th>Precio</th>
      <th>Importe</th>
    </tr>
  )
}

export default function Tabulador () {
  const {data, loading} = useDetalleT()
  const [status, setStatus] = useState(0)

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
                <td>{ data ? data.tabulador_categoria : ''}</td>
                <td>{ data ? data.tabulador_unidad : ''}</td>
                <td>{ data.tabulador_finicio !== undefined ? `${data.tabulador_finicio.slice(8,10)}/${data.tabulador_finicio.slice(5,7)}/${data.tabulador_finicio.slice(0,4)}` : ''}</td>
                <td>{ data.tabulador_ftermino !== undefined ? `${data.tabulador_ftermino.slice(8,10)}/${data.tabulador_ftermino.slice(5,7)}/${data.tabulador_ftermino.slice(0,4)}` : ''}</td>
                <td>{ data ? data.tabulador_cantidad : '' }</td>
                <td>{data.tabulador_precio !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(data.tabulador_precio) : ''}</td>
                <td>{data.tabulador_importe !== undefined ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(data.tabulador_importe) : ''}</td> 
              </tr>  
            </tbody>
          </table>
          <p style={{fontWeight: 'bold'}}>Comentario: </p>
        </div>
      </div>

      <div className='card mt-4'>
        <div className='card-header fw-bold'>Documento</div>
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
    </>
  )
}