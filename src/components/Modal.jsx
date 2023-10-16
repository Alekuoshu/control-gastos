import { useState, useEffect } from 'react'
import Mensaje from "./Mensaje";
import CerraBtn from '../img/cerrar.svg'
import ModalGastoDefault from './ModalGastoDefault';

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGastos, 
    gastoEditar, 
    setGastoEditar,
    Notification,
    envioHabilitado,
    setEnvioHabilitado

}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')
    const [modalAddDefault, setModalAddDefault] = useState(false)
    const [animar, setAnimar] = useState(false)

    // setea los inputs del formulario para la edición
    useEffect( () => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])

    // oculta el modal
    const OcultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(function () {
            setModal(false)
        }, 400);
    }

    // envia el formulario y realiza validaciones
    const handleSubmit = (e) => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')){
            Notification("danger", "Error!", "Todos los campos son obligatorios", 3000);
            return;
        }

        setEnvioHabilitado(false)

        guardarGastos({nombre, cantidad, categoria, id, fecha})
        OcultarModal();
    }

    const handleAddDefault = e => {
        e.preventDefault();

        setModalAddDefault(true)

        setTimeout(function () {
            setAnimar(true)
        }, 400);
        
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CerraBtn} 
                alt="Cerrar Modal" 
                onClick={OcultarModal}
            />
        </div>

        <form 
            className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            onSubmit={handleSubmit}
        >
            <legend>{gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                    type="text" 
                    id="nombre"
                    placeholder='Añade el Nombre del Gasto'
                    value={nombre}
                    onChange={e => {setNombre(e.target.value)}}
                />

                <a 
                    id="btn_add_default"
                    title='Añadir por defecto'
                    onClick={handleAddDefault}
                >+</a>
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    type="tel" 
                    // type="text" 
                    id="cantidad"
                    autoComplete='off'
                    placeholder='Añade la cantidad del gasto: ej. 300'
                    value={cantidad}
                    onChange={e => {setCantidad(Number(e.target.value.replace(/[^0-9]/g, "")))}}
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoría</label>

                <select 
                    id="categoria"
                    value={categoria}
                    onChange={e => {setCategoria(e.target.value)}}
                    
                >

                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="casa">Casa</option>
                    <option value="comida">Comida</option>
                    <option value="creditos">Créditos</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="servicios">Servicios</option>
                    <option value="suscripciones">Suscripciones</option>

                </select>
            </div>

            <button disabled={envioHabilitado ? false : true} type='submit'>{gastoEditar.id ? 'Guardar Cambios' : 'Añadir Gasto'}</button>
        </form>

        {modalAddDefault && <ModalGastoDefault 
            setModalAddDefault={setModalAddDefault}
            animar={animar}
            setAnimar={setAnimar}
            setNombre={setNombre}
            setCategoria={setCategoria}
        />}
    </div>
  )
}

export default Modal