import { useState } from "react"
import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"
import ModalSettings from "./ModalSettings"
import IconoSettings from "../img/icono_settings.png"

const Header = ({
  gastos, 
  setGastos,
  presupuesto, 
  setPresupuesto, 
  isValidPresupuesto, 
  setIsValidPresupuesto,
  settings,
  setSettings,
  Notification,
  envioHabilitado,
  setEnvioHabilitado

}) => {

  const [modalSettings, setModalSettings] = useState(false)
  const [animarModalSettings, setAnimarModalSettings] = useState(false)

  const handleClickSettings = () => {

    setModalSettings(true)

    setEnvioHabilitado(true)

    setTimeout(function () {
      setAnimarModalSettings(true)
    }, 400);
    
  }

  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {isValidPresupuesto ? (
            <ControlPresupuesto
              gastos={gastos}
              setGastos={setGastos}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
              settings={settings}
              Notification={Notification}
            />
        ) : (
            <NuevoPresupuesto 
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                Notification={Notification}
            />
        )}

      <div className="icon-settings">
        <img 
          src={IconoSettings} 
          alt="Icono Settings" 
          title="Configuraciones"
          onClick={handleClickSettings}
        />
      </div>

      {modalSettings && <ModalSettings 
        setModalSettings={setModalSettings}
        animarModalSettings={animarModalSettings}
        setAnimarModalSettings={setAnimarModalSettings}
        settings={settings}
        setSettings={setSettings}
        Notification={Notification}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        envioHabilitado={envioHabilitado}
        setEnvioHabilitado={setEnvioHabilitado}
      />}
    </header>
  )
}

export default Header