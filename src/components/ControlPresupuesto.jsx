import { useState, useEffect } from "react"
import { FormatearCantidad } from "../helpers"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
    gastos, 
    setGastos, 
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto, 
    settings,
    Notification

}) => {

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

     }, [gastos, presupuesto])

    //  resetea la app
     const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar los gastos y presupuesto?');

        if(resultado) {
            setIsValidPresupuesto(false)
            setGastos([])
            setPresupuesto(0)
            Notification("default", "¡Info!", "Valores iniciales reseteados", 3000);
        }
     }


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            {settings.tema ? (

                <CircularProgressbar 
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                    styles={buildStyles({
                        pathColor: disponible < 0 ? '#DC2626' : '#555',
                        trailColor: '#F5F5F5',
                        textColor: disponible < 0 ? '#DC2626' : '#444',
                    })}
                />

            ) : (

                <CircularProgressbar 
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                    styles={buildStyles({
                        pathColor: disponible < 0 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: disponible < 0 ? '#DC2626' : '#3B82F6',
                    })}
                />
            )
                
            }
            
        </div>

        <div className="contenido-presupuesto">

            <button className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{FormatearCantidad(presupuesto, settings.moneda)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{FormatearCantidad(disponible, settings.moneda)}
            </p>

            <p>
                <span>Gastado: </span>{FormatearCantidad(gastado, settings.moneda)}
            </p>

        </div>
        
    </div>
  )
}

export default ControlPresupuesto