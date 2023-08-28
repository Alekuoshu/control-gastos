import { useState, useEffect } from 'react'
import Mensaje from "./Mensaje";
import CerraBtn from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGastos, 
    gastoEditar, 
    setGastoEditar

}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

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
            setMensaje('Todos los campos son obligatorios')

            setTimeout(function () {
                setMensaje('')
            }, 3000);

            return;
        }

        guardarGastos({nombre, cantidad, categoria, id, fecha})
        OcultarModal();
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
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                    type="text" 
                    id="nombre"
                    placeholder='Añade el Nombre del Gasto'
                    value={nombre}
                    onChange={e => {setNombre(e.target.value)}}
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    type="number" 
                    min={0}
                    id="cantidad"
                    placeholder='Añade la cantidad del gasto: ej. 300'
                    value={cantidad}
                    onChange={e => {setCantidad(Number(e.target.value))}}
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

            <button type='submit'>{gastoEditar.id ? 'Guardar Cambios' : 'Añadir Gasto'}</button>
        </form>
    </div>
  )
}

export default Modal