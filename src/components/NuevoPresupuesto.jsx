import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto, Notification}) => {

    // valida e inicia un nuevo presupuesto
    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 1){
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
                    onChange={e => {
                        const inputValue = e.target.value;
                        if (/^[1-9]\d*$/.test(inputValue)) {
                            setPresupuesto(Number(inputValue));
                        }
                    }}
                
                />
            </div>
            <button type="submit" >Añadir</button>

        </form>
    </div>
  )
}

export default NuevoPresupuesto