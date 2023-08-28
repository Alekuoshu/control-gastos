import { useState, useEffect } from "react"
import { FormatearCantidad } from "../helpers"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    // calculos de totales, disponible, porcentaje
     useEffect( () => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        // calcular porcentaje gastado:
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);

        setTimeout(function () {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);

        setGastado(totalGastado)
        setDisponible(totalDisponible)

     }, [gastos])

    //  resetea la app
     const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar los gastos y presupuesto?');

        if(resultado) {
            setIsValidPresupuesto(false)
            setGastos([])
            setPresupuesto(0)
        }
     }


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                styles={buildStyles({
                    pathColor: disponible < 0 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: disponible < 0 ? '#DC2626' : '#3B82F6',
                })}
            />
        </div>

        <div className="contenido-presupuesto">

            <button className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{FormatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{FormatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado: </span>{FormatearCantidad(gastado)}
            </p>

        </div>
        
    </div>
  )
}

export default ControlPresupuesto