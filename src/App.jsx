import { useState, useEffect } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import Header from './components/Header'
import Modal from './components/Modal'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import { generateId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import IconoNuevoOscuro from './img/nuevo-gasto-oscuro.png'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css'


function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  const [settings, setSettings] = useState(
    localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : {'tema':false, 'moneda':'usd'}
  )
  
  // Valida el tema oscuro o por defecto
  useEffect(() => {
    if (settings.tema === true) {

      document.body.classList.add('dark-theme');
      // Forzar un redibujado después de un pequeño retraso
      setTimeout(() => {
        window.scrollTo(0, 0); // Cambia la posición de desplazamiento
      }, 100);
        
    } else {

      document.body.classList.remove('dark-theme');
      // Forzar un redibujado después de un pequeño retraso
      setTimeout(() => {
        window.scrollTo(0, 0); // Cambia la posición de desplazamiento
      }, 100);

    }
  }, [settings.tema]);

  // se inicia el modal para la edición del gasto
  useEffect( () => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(function () {
        setAnimarModal(true)
      }, 400);
      
    }
  }, [gastoEditar])

  // guarda en localStorage settings
  useEffect( () => {
    localStorage.setItem('settings', JSON.stringify(settings) ?? {'tema':false, 'moneda':'usd'})
  }, [settings])

  // guarda en localStorage presupuesto
  useEffect( () => {
    localStorage.setItem('presupuesto', presupuesto)
  }, [presupuesto])

  // guarda en localStorage gastos
  useEffect( () => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  // realiza y setea el filtrado
  useEffect( () => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  // valida el presupuesto
  useEffect( () => {
    const presupuetoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuetoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  // sistema de notificaciones
  const Notification = (type, title, message, duration) => {

    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
        duration: duration,
        onScreen: true,
        pauseOnHover: true,
        // showIcon: true
        }
    })
  }

  // nuevo gasto
  const handleNuevoGasto = () => {
    setModal(true)

    setGastoEditar({})

    setTimeout(function () {
      setAnimarModal(true)
    }, 400);
  }

  // guarda gastos
  const guardarGastos = gasto => {
    if(gasto.id){
      // Edición
      const gastoActualizado = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastoActualizado);
      setGastoEditar({});

      // actualiza el filtrado
      if(filtro && gasto.categoria === filtro) {
        const gastoFiltradoActualizado = gastosFiltrados.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
        setGastosFiltrados(gastoFiltradoActualizado)
      }

      setTimeout(function () {
        Notification("default", "¡Info!", "Gasto editado con éxito", 2000);
      }, 400);

    }else{
      // Nuevo
      gasto.id = generateId();
      gasto.fecha = Date.now();
      setGastos([gasto, ...gastos])

      // actualiza el filtrado
      if(filtro && gasto.categoria === filtro) {
        setGastosFiltrados([gasto, ...gastosFiltrados])
      }

      setTimeout(function () {
        Notification("default", "¡Info!", "Gasto agregado con éxito", 2000);
      }, 400);

    }

    setAnimarModal(false)
    setTimeout(function () {
      setModal(false)
    }, 400);
    
  }

  // elimina un gasto
  const eliminarGasto = id => {
    const gastoActualizado = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastoActualizado);

    // actualiza el filtrado
    if(filtro) {
      const gastoFiltradoActualizado = gastosFiltrados.filter( gasto => gasto.id !== id);
      setGastosFiltrados(gastoFiltradoActualizado)
    }
  }

  return (
    <div className={modal ? 'fijar' : ''}>

      <ReactNotifications />

      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        settings={settings}
        setSettings={setSettings}
        Notification={Notification}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              settings={settings}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={settings.tema ? IconoNuevoOscuro : IconoNuevoGasto} 
              alt="Nuevo Gasto" 
              title='Nuevo Gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal 
        setModal={setModal} 
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGastos={guardarGastos}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
        Notification={Notification}
      />}

      
    </div>
  )
}

export default App;
