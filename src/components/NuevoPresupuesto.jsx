import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto, Notification}) => {

    // valida e inicia un nuevo presupuesto
    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 0){
            Notification("danger", "¡Error!", "No es un presupuesto válido", 3000);
            return;
        }
        
        setIsValidPresupuesto(true)

    }
  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>
                <input 
                    type="tel" 
                    className="nuevo-presupuesto"
                    placeholder="Añade tu Presupuesto"
                    // min={0}
                    //value={presupuesto}
                    onChange={e => setPresupuesto(Number(e.target.value))}
                
                />
            </div>
            <button type="submit" >Añadir</button>

        </form>
    </div>
  )
}

export default NuevoPresupuesto