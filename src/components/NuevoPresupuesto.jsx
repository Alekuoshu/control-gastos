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

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (/^[1-9]\d*$/.test(inputValue)) {
            setPresupuesto(Number(inputValue));
        }else {
            // Si el valor no es válido, establece el presupuesto en 0
            setPresupuesto(0);
          }
    };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>
                <input 
                    type="tel" 
                    className="nuevo-presupuesto"
                    placeholder="Añade tu Presupuesto"
                    onChange={handleInputChange}
                
                />
            </div>
            <button type="submit" >Añadir</button>

        </form>
    </div>
  )
}

export default NuevoPresupuesto