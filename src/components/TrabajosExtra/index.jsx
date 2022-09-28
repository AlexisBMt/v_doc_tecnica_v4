import React, { useState } from 'react'
import { api_global } from '../../helpers/data'
// import { useDocumentacion } from '../../hooks/useDocumentacion'
import { useTrabajos } from '../../hooks/useTrabajos'
import Spinner from '../Spinner/index'
import Pagination from '../Paginate/index'
import Header from './Header'
import GetTrabajos from './GetTrabajos'
import Filter from '../Filter/index'

function TrabajosExtra () {
  const { data, consulta, setConsulta, page, setPage, setUrl, loading } = useTrabajos()
  const [datosPerPage, setDatosPerPage] = useState(10)

  //Get Current Contrato Page
  const indexOfLastContrato = page * datosPerPage
  const indexOfFirstContrato = indexOfLastContrato - datosPerPage
  const currentTrabajos = data.slice(indexOfFirstContrato, indexOfLastContrato)

  //Filter Data
  // const filterQuery = (dataQuery) => setTrabajos(dataQuery) //
  const consultaQuery = (consultaq) => setConsulta(consultaq) //
  const updateUrl = (api_url) => setUrl(api_url)

  //change page
  const max = Math.ceil( data.length / datosPerPage )
  const paginate = (pageNumber) => setPage( pageNumber < 1 ? 1 : pageNumber > max ? max : pageNumber )

  const optionHandler = (event) => {
    parseInt(event.target.value) === 0 ? setDatosPerPage(data.length) : setDatosPerPage(parseInt(event.target.value))
  }

  return(
    <>
      <div className='mx-4'>
        {loading ? <Spinner/> : <div> </div>}
        <table className='table table-striped table-bordered text-secondary mt-3 table-hover text-center' style={{fontSize: '0.875rem', lineHeight: '1.25rem'}}>
          <thead> 
            <Header/> 
            <tr className='bg-blue-table'>
              <th>{loading ? null : <Filter query='recibido' datos={ data } consultaQuery={consultaQuery} updateUrl={updateUrl} url={api_global} consulta={consulta}/> }</th>
              <th>{loading ? null : <Filter query='zona' datos={ data } consultaQuery={consultaQuery} updateUrl={updateUrl} url={api_global} consulta={consulta}/> }</th>
              <th>{loading ? null : <Filter query='proyecto' datos={ data } consultaQuery={consultaQuery} updateUrl={updateUrl} url={api_global} consulta={consulta}/> }</th>
              <th>{loading ? null : <Filter query='contratista' datos={ data } consultaQuery={consultaQuery} updateUrl={updateUrl} url={api_global} consulta={consulta}/> }</th>
              <th>{loading ? null : <Filter query='especialidad' datos={ data } consultaQuery={consultaQuery} updateUrl={updateUrl} url={api_global} consulta={consulta}/> }</th>
              <th>{loading ? null : <Filter query='contratista_objeto' datos={ data } consultaQuery={consultaQuery} updateUrl={updateUrl} url={api_global} consulta={consulta}/> }</th>
              <th>{loading ? null : <Filter query='estatus' datos={ data } consultaQuery={consultaQuery} updateUrl={updateUrl} url={api_global} consulta={consulta}/> }</th>
              <th>{loading ? null : <Filter query='archivo' datos={ data } consultaQuery={consultaQuery} updateUrl={updateUrl} url={api_global} consulta={consulta}/> }</th>
            </tr>
          </thead>
          <tbody>
            <GetTrabajos trabajos={currentTrabajos} />
          </tbody>
        </table>
      </div>

      <section className='row mx-5 my-5'>
        <div className='col-md-5'>
          <select  className='form-select' style={{width: '5rem'}} onClick={optionHandler}>
            <option value='0'>All</option>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
        </div>

        <div className='col-md-2 align-self-center'>
          <Pagination  dataPerPage={datosPerPage} totalData={data.length} currentPage={page} paginate={paginate}/>            
        </div>
              
        <div className='col-md-5'>
          <p className='text-end'>Results {page} - {Math.ceil( data.length / datosPerPage )} of {Math.ceil( data.length / datosPerPage )}</p>
        </div>
      </section>
    </>
  )
}

export default React.memo(TrabajosExtra)
