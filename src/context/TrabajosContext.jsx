import React, { useState } from 'react'
import { api_global } from '../helpers/data'
const Context = React.createContext({})

export function TrabajosContextProvider ({children}) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState(api_global)
  const [consulta, setConsulta] = useState(['recibido', '', 'zona', '', 'proyecto', '', 'contratista', '', 'especialidad', '', 'contratista_objeto', '', 'estatus', '', 'archivo', ''])
    return (
        <Context.Provider value={{data, setData, consulta, setConsulta, page, setPage, url, setUrl}}>
            {children}
        </Context.Provider>
    )
}

export default Context