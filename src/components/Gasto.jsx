import { 
    LeadingActions, 
    SwipeableList, 
    SwipeableListItem, 
    SwipeAction, 
    TrailingActions
 } from "react-swipeable-list"

import 'react-swipeable-list/dist/styles.css';

import { formatearFecha } from "../helpers"
import { FormatearCantidad } from "../helpers"

// iconos
import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoCreditos from "../img/icono_creditos.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoOcio from "../img/icono_ocio.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoServicios from "../img/icono_servicios.svg"
import IconoSuscripciones from "../img/icono_suscripciones.svg"

const dicionarioIconos = {
    ahorro : IconoAhorro,
    casa : IconoCasa,
    comida : IconoComida,
    creditos : IconoCreditos,
    gastos : IconoGastos,
    ocio : IconoOcio,
    salud : IconoSalud,
    servicios : IconoServicios,
    suscripciones : IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    const {categoria, nombre, cantidad, id, fecha} = gasto

    // react-swipeable component
    const leadingActions = () => (
        <LeadingActions>
          <SwipeAction onClick={() => setGastoEditar(gasto)}>
            Editar
          </SwipeAction>
        </LeadingActions>
    );
      
    const trailingActions = () => (
    <TrailingActions>
        <SwipeAction
        destructive={true}
        onClick={() => eliminarGasto(id)}
        >
        Eliminar
        </SwipeAction>
    </TrailingActions>
    );
    // react-swipeable component

  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
        <div className="gasto sombra">
            <div className="contenido-gasto">
                <img 
                    src={dicionarioIconos[categoria]} 
                    alt="Icono gasto" 
                />
                <div className="descripcion-gasto">
                    <p className="categoria">
                        {categoria}
                    </p>
                    <p className="nombre-gasto">{nombre}</p>
                    <p className="fecha-gasto">Agregado el: {''}<span>{formatearFecha(fecha)}</span></p>
                </div>
            </div>

            <p className="cantidad-gasto">{FormatearCantidad(cantidad)}</p>
        </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto