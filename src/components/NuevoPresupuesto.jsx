import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('')

    // valida e inicia un nuevo presupuesto
    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 0){
            setMensaje('No es un presupuesto válido')
            return;
        }
        
        setMensaje('')
        setIsValidPresupuesto(true)

    }
  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>
                <input 
                    type="number" 
                    className="nuevo-presupuesto"
                    placeholder="Añade tu Presupuesto"
                    min={0}
                    //value={presupuesto}
                    onChange={e => setPresupuesto(Number(e.target.value))}
                
                />
            </div>
            <button type="submit" >Añadir</button>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto