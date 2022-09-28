import React, { useState } from 'react'

export default function Filter ( {query, datos, consultaQuery, updateUrl, url, consulta} ) {
  let bandera = false
  const filtro = []
  datos.map( dato => filtro.push(dato[query]) )
  const dataArr = new Set(filtro);
  let result = [...dataArr]
  const [filter] = useState(result)
  // const [flag, setFlag] = useState(false)

  const button_label  = (query, consulta) => {
    let label = consulta[consulta.indexOf(query) + 1]
    if(query === 'estatus'){
      if( consulta[consulta.indexOf(query) + 1] <= 1 ) label = 'PENDIENTE'
      else if(consulta[consulta.indexOf(query) + 1] === '2') label = 'ACEPTADO'
      else label = 'RECHAZADO'
    }
    if(query === 'subcontrata'){
      if( consulta[consulta.indexOf(query) + 1] === '0' ) label = 'NO'
      else if(consulta[consulta.indexOf(query) + 1] === '1') label = 'SI'
    }
    if(query === 'registro_patronal'){
      if( consulta[consulta.indexOf(query) + 1] === 'NULL' ) label = 'No hay registro patronal'
      else label = consulta[consulta.indexOf(query) + 1]
    }
    if(query === 'recibido'){
      label = consulta[consulta.indexOf(query) + 1]
      label = `${label.slice(8,10)}/${label.slice(5,7)}/${label.slice(0,4)}`
    }
    if(query === 'monto_obra'){
      label = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(consulta[consulta.indexOf(query) + 1])
    }
    return label
  }

  const handlerClick = (event) => {
    if(typeof (consulta[consulta.indexOf(query) + 1]) === 'undefined' ) consulta[consulta.indexOf(query) + 1] = ''
    if(event.target.value === 'None'){
      consulta[consulta.indexOf(query) + 1] = ''
      for(let i = 0; i < consulta.length-1; i++){
        if( (i % 2) === 0 && consulta[i+1] !== '' && consulta[i+1] !== undefined ){
          bandera = true
        }
      }
      consultaQuery(consulta)
      if(!bandera){
        updateUrl(url)
      }else{
        let search = '' 
        for(let i = 0; i < consulta.length-1; i++){
          if( (i % 2) === 0 && consulta[i+1] !== '' && consulta[i+1] !== undefined ){
            search += `${consulta[i]},${consulta[i+1]},`
          }
        }
        updateUrl(`${url}/q=${search}`)
        consultaQuery(consulta)  
      } 
      // setFlag(bandera)
    }

    if(event.target.value !== 'None'){
      let search = '' 
      bandera = true
      consulta[consulta.indexOf(query) + 1] = event.target.value;
      for(let i = 0; i < consulta.length-1; i++){
        if( (i % 2) === 0 && consulta[i+1] !== '' && consulta[i+1] !== undefined ){
          search += `${consulta[i]},${consulta[i+1]},`
          // setFlag(bandera)
        }
      }
      updateUrl(`${url}/q=${search}`)
      consultaQuery(consulta)
    }
  }

  if (consulta.includes(undefined)) {
    consulta[consulta.indexOf(undefined)] = ''
  }
  //new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(data.total_materiales)
  return(
    <div>
      <select className='form-select form-select-sm p-0 mb-1 text-center rounded-2' id='select' onClick={handlerClick}>
        <option value='None'>None</option>
        {filter.map(element => (
          query === 'subcontrata' ? <option value={element}  key={Math.random() * (1000 - 1) + 1}>{element === 0 ? 'NO' : 'SI'}</option> 
          : query === 'estatus' ? <option value={element}  key={Math.random() * (1000 - 1) + 1}>{element <= 1 ? 'PENDIENTE' : element === '2' ? 'ACEPTADO' : 'RECHAZADO'}</option> 
          : query === 'registro_patronal' ? <option value={element}  key={Math.random() * (1000 - 1) + 1}>{element === 'NULL' ? 'No hay registro patronal' : element}</option>  
          : query === 'monto_obra' ? <option value={element}  key={Math.random() * (1000 - 1) + 1}>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(element)}</option> 
          : query === 'recibido' ? <option value={element}  key={Math.random() * (1000 - 1) + 1}>{`${element.slice(8,10)}/${element.slice(5,7)}/${element.slice(0,4)}`}</option> 
          : <option value={element}  key={Math.random() * (1000 - 1) + 1}>{element}</option> 
        ))}
      </select>
      {(consulta[consulta.indexOf(query) + 1] !== '' && typeof (consulta[consulta.indexOf(query) + 1]) !== 'undefined') ? <button className='filter-btn rounded-pill text-nowrap' value='None' onClick={handlerClick}>{button_label(query, consulta)} <i className='ms-1 bi bi-x-circle'></i></button> : <div></div>}      
    </div>
  )
}