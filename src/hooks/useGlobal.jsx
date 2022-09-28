import { useContext } from 'react'
import Context from '../context/GlobalContext'

export function useGlobal () {
  const { identifier, setIdentifier, documento, setDocumento } = useContext(Context)
  return { identifier, setIdentifier, documento, setDocumento }
}