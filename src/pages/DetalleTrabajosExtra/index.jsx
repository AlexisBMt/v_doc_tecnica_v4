import Contrato from '../../components/Detalle_Trabajos/Contrato/index'
import Navegation from '../../components/Detalle_Trabajos/Navegation/index'
import Explosion from '../../components/Detalle_Trabajos/Explosion/index'
import Tabulador from '../../components/Detalle_Trabajos/Tabulador/index'
import Fasar from '../../components/Detalle_Trabajos/Fasar/index'
import { useDetalleT } from '../../hooks/useDetalleT'
import { url_detalle } from '../../helpers/docDetalle'
import { useGlobal } from '../../hooks/useGlobal'
import { Link } from 'wouter'

export default function TrabajosDetalle () {
  const {documento, setDocumento, identifier} = useGlobal()
  const {setUrl} = useDetalleT()
  setUrl(`${url_detalle}/${identifier}`)
  const updateDoc = (doc) => setDocumento(doc)

  return (
    <>
        <h1 className='paginas-titulo'>Detalle Documentación Trabajos Extra</h1>
        <nav aria-label='breadcrumb' style={{backgroundColor: '#e2e3e5'}}>
          <ol className='breadcrumb px-5 py-3'>
            <li className='breadcrumb-item'><Link className='text-decoration-none' to='/'>Home</Link></li>
            <li className='breadcrumb-item'><Link className='text-decoration-none' to='/documentacion-tecnica'>Documentacion Tecnica</Link></li>
            <li className='breadcrumb-item' aria-current='page'>Detalle Documentación Trabajos Extra</li>
          </ol>
        </nav>

        <div className='row mx-4 my-5'>
          <div className='col-2'> <Contrato documento={documento}/> </div>
          <div className='col-10'>
            <Navegation documento={documento} updateDoc={updateDoc} />
            {documento === 'explosion' || documento === 'Explosión de Insumos' ? <Explosion /> : documento === 'tabulador' || documento === 'Tabulador de Mano de Obra'  ? <Tabulador /> : <Fasar /> }
          </div>
        </div>
    </>
  )
}