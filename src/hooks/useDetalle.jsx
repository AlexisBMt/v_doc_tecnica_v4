import { useState, useContext, useEffect } from 'react'
import Context from '../context/DetalleContext'
import { getDetalleExplosion } from '../services/fetching'

export function useDetalle () {
  const {data, setData, url, setUrl} = useContext(Context)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    if(url !== ''){
      getDetalleExplosion(`${url}`)
        .then(result => setData(result))
      setLoading(false)
    }
  }, [setUrl, url, setData])

  return {data, setData, url, setUrl, loading}
}
