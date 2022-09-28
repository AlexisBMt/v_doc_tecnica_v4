import React, { useState } from 'react'
const Context = React.createContext({})

export function GlobalContextProvider ({children}) {
  const [identifier, setIdentifier] = useState(0)
  const [documento, setDocumento] = useState('')
  return( 
    <Context.Provider value={{identifier, setIdentifier, documento, setDocumento}}>
      {children}
    </Context.Provider>
  )
}

export default Context