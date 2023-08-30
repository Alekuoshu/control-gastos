import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import { generateId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

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

  // se inicia el modal para la edición del gasto
  useEffect( () => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(function () {
        setAnimarModal(true)
      }, 400);
      
    }
  }, [gastoEditar])

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

    }else{
      // Nuevo
      gasto.id = generateId();
      gasto.fecha = Date.now();
      setGastos([gasto, ...gastos])
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
  }

  return (
    <div className={modal ? 'fijar' : ''}>

      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
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
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
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
      />}

      
    </div>
  )
}

export default App
