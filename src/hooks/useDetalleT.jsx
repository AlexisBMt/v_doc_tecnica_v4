import { useState, useContext, useEffect } from 'react'
import Context from '../context/DetalleTContext'
import { getDetalleExplosion } from '../services/fetching'

export function useDetalleT () {
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
