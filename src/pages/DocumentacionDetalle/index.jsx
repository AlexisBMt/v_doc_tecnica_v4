import Contrato from "../../components/Detalle/Contrato"
import ExplosionDetalle from "../../components/Detalle/Explosion"
import TabuladorDetalle from "../../components/Detalle/Tabulador"
import FasarDetalle from "../../components/Detalle/Fasar"
import Navegation from "../../components/Detalle/Navegation"
import { useDetalle } from '../../hooks/useDetalle'
import { url_detalle } from '../../helpers/docDetalle'
import { useGlobal } from "../../hooks/useGlobal"
import { Link } from "wouter"

export default function DocumentacionDetalle () {
  const {documento, setDocumento, identifier} = useGlobal()
  const updateDoc = (doc) => setDocumento(doc)
  const {setUrl} = useDetalle()
  setUrl(`${url_detalle}/${identifier}`)

  return(
    <>
        <h1 className='paginas-titulo mt-5'>Detalle Autorización de Documentacion Técnica</h1>
        <nav aria-label='breadcrumb' style={{backgroundColor: '#e2e3e5'}}>
          <ol className='breadcrumb px-5 py-3'>
            <li className='breadcrumb-item'><Link className='text-decoration-none' to='/'>Home</Link></li>
            <li className='breadcrumb-item'><Link className='text-decoration-none' to='/documentacion-tecnica'>Documentacion Tecnica</Link></li>
            <li className='breadcrumb-item' aria-current='page'>Documentacion Tecnica Detalle</li>
          </ol>
        </nav>

        <div className='row mx-4 mt-5'>
          <div className='col-2'><Contrato documento={documento} /></div>
          <div className='col-10'> 
            <Navegation documento={documento} updateDoc={updateDoc} />
            {documento === 'explosion' || documento === 'Explosión de Insumos' ? <ExplosionDetalle /> : documento === 'tabulador' || documento === 'Tabulador de Mano de Obra'  ? <TabuladorDetalle /> : <FasarDetalle /> }
          </div>
        </div>
    </>
  )
}