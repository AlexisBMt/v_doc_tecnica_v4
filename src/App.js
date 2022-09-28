import { Route } from 'wouter';
import Home from './pages/Home/index'
import Documentacion from './pages/Documentacion';
import DocumentacionDetalle from './pages/DocumentacionDetalle/index';
import TrabajosDetalle from './pages/DetalleTrabajosExtra';
import { GlobalContextProvider } from './context/GlobalContext'
import { DetalleContextProvider } from './context/DetalleContext'
import { DetalleTContextProvider } from './context/DetalleTContext'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';

function App() {
  return (
    <GlobalContextProvider>
      <div>
        <Route component={ Home } path="/" />
        <Route component={ Documentacion } path= '/documentacion-tecnica' />
        <DetalleContextProvider>
          <Route component={ DocumentacionDetalle } path='/documentacion-tecnica/detalle' />
        </DetalleContextProvider>
        <DetalleTContextProvider>
          <Route component={ TrabajosDetalle } path='/documentacion-tecnica/detalle-trabajos-extra' />
        </DetalleTContextProvider>
      </div>
    </GlobalContextProvider> 
  );
}

export default App;
