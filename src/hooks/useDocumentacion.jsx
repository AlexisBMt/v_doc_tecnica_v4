import { useState, useContext, useEffect } from 'react'
import Context from '../context/DocumentacionContext'
import { getAllContratos } from '../services/fetching'
import { global_data } from '../helpers/data';

export function useDocumentacion( ){
  const { data, setData, consulta, setConsulta, page, setPage, url, setUrl } = useContext(Context);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setData(global_data)
    getAllContratos(url)
      .then(result => {
        setData(result)
        setLoading(false)
      })
  }, [setData, setUrl, url]);

  return { data, setData, consulta, setConsulta, page, setPage, url, setUrl, loading }
}