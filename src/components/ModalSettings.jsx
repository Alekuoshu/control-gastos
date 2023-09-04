import { useState, useEffect } from "react";
import Switch from "react-switch";
import CerraBtn from '../img/cerrar.svg'

const ModalSettings = ({
    setModalSettings, 
    animarModalSettings, 
    setAnimarModalSettings,
    settings,
    setSettings,
    Notification,
    presupuesto, 
    setPresupuesto,
    isValidPresupuesto

}) => {

    const [tema, setTema] = useState(false);
    const [moneda, setMoneda] = useState('usd');
    const [presupuestoInicial, setPresupuestoInicial] = useState('');

    // carga los inpust del formulario
    useEffect( () => {
        if(Object.keys(settings).length > 0) {
            setTema(settings.tema)
            setMoneda(settings.moneda)
        }
    }, [])

    const handleChange = nextChecked => {
        setTema(nextChecked)
    };

    // oculta el modal
    const OcultarModal = () => {
        setAnimarModalSettings(false)

        setTimeout(function () {
            setModalSettings(false)
        }, 400);
    }

    // envia el formulario y guarda datos
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setSettings({
            'tema':tema,
            'moneda':moneda
        })

        OcultarModal();
        setTimeout(function () {
            Notification("success", "¡Success!", "Configuración guardada", 2000);
        }, 400);
    }
    
  return (
    <div className="modal-settings">
        <div className="cerrar-modal">
            <img 
                src={CerraBtn} 
                alt="Cerrar Modal" 
                onClick={OcultarModal}
            />
        </div>
        <div className="modal-settings-container">
            <form 
                className={`formulario ${animarModalSettings ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>Configuración del Sistema</legend>

                <div className="campo">
                    
                    <label className="switch">
                        <span>Tema Oscuro?</span>
                        <Switch
                            onChange={handleChange}
                            checked={tema}
                            className="input-switch"
                            onColor="#3b82f6"
                            onHandleColor="#3b82f6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={23}
                            width={48}
                            id="tema"
                        />
                    </label>

                </div>

                <div className="campo">
                    <label htmlFor="moneda">Moneda</label>

                    <select 
                        id="moneda"
                        value={moneda}
                        onChange={e => {setMoneda(e.target.value)}}
                        
                    >

                        <option value="usd">Dolar (USD)</option>
                        <option value="cop">Peso Colombiano (COP)</option>

                    </select>

                </div>
                {
                    isValidPresupuesto && (
                        <div className="campo">
                            <label htmlFor="presupuesto">Presupuesto Inicial</label>

                            <input 
                                id="presupuesto"
                                type="tel" 
                                value={presupuesto}
                                onChange={e => setPresupuesto(Number(e.target.value))}
                            />

                        </div>
                    )
                }

                <button type='submit'>Guardar Cambios</button>

            </form>
        </div>
    </div>
  )
}

export default ModalSettings;