import React, {useState} from 'react'
import { api_global } from '../helpers/data'
const Context = React.createContext({})

export function ContratosContextProvider ({children}) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState(api_global)
  const [consulta, setConsulta] = useState(['recibido', '', 'proyecto', '', 'contratista', '', 'especialidad', '', 'contratista_objeto', '', 
  'registro_patronal', '', 'num_aprox_trabajadores', '', 'monto_obra', '', 'fecha_inicio', '',
  'fecha_termino', '', 'subcontrata', '', 'comentarios', '', 'estatus', '', 'archivo', ''])
    return (
        <Context.Provider value={{data, setData, consulta, setConsulta, page, setPage, url, setUrl}} >
            {children}
        </Context.Provider>
    )
}

export default Context