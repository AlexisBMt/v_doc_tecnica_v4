import React, { useState } from 'react'
// import { url_detalle } from '../helpers/docDetalle'
const Context = React.createContext({})

export function DetalleContextProvider ({children}) {
  const [data, setData] = useState({})
  const [url, setUrl] = useState('')

  return(
    <Context.Provider value={{data, setData, url, setUrl}}>
      {children}
    </Context.Provider>
  )
}

export default Context