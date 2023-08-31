import { generateId } from "../helpers"
// iconos
import IconoAhorro from "../img/icono_ahorro.png"
import IconoNetflix from "../img/icono_netflix.png"
import IconoSpotify from "../img/icono_spotify.png"
import IconoInternet from "../img/icono_internet.png"
import IconoPospago from "../img/icono_pospago.png"
import IconoArriendo from "../img/icono_arriendo.png"
import IconoLuz from "../img/icono_luz.png"
import IconoAgua from "../img/icono_agua.png"
import IconoGas from "../img/icono_gas.png"
import IconoGasolina from "../img/icono_gaolina.png"

const ArraysIconos = [
    {'gasto' : 'Ahorros', 'img' : IconoAhorro, 'categoria' : 'ahorro'},
    {'gasto' : 'Pago Netflix', 'img' : IconoNetflix, 'categoria' : 'suscripciones'},
    {'gasto' : 'Pago Spotify', 'img' : IconoSpotify, 'categoria' : 'suscripciones'},
    {'gasto' : 'Pago Internet', 'img' : IconoInternet, 'categoria' : 'servicios'},
    {'gasto' : 'Pago renta pospago', 'img' : IconoPospago, 'categoria' : 'servicios'},
    {'gasto' : 'Pago Arriendo', 'img' : IconoArriendo, 'categoria' : 'casa'},
    {'gasto' : 'Pago Luz', 'img' : IconoLuz, 'categoria' : 'servicios'},
    {'gasto' : 'Pago Agua', 'img' : IconoAgua, 'categoria' : 'servicios'},
    {'gasto' : 'Pago Gas', 'img' : IconoGas, 'categoria' : 'servicios'},
    {'gasto' : 'Gasolina', 'img' : IconoGasolina, 'categoria' : 'gastos'}
]

const ModalGastoDefault = ({
    setModalAddDefault, 
    animar, 
    setAnimar, 
    setNombre, 
    setCategoria

}) => {

    // cierra el modal
    const closeModal = () => {

        setAnimar(false)

        setTimeout(function () {
            setModalAddDefault(false)
        }, 400);
    }

    // inserta gasto predefinido
    const handleInsertaGasto = item => {
        setNombre(item.gasto)
        setCategoria(item.categoria)
        closeModal()
        document.querySelector('#cantidad').focus();
    }

  return (
    <div className={`modal-add-default ${animar ? 'animar' : ''}`}>
        <div 
            className="btn-cerrar"
            onClick={closeModal}
        >
            <span className="equis-modal">X</span>
        </div>
        <h3>Seleccione gasto por defecto</h3>
        <div className="modal-container">
            {
                ArraysIconos.map( item => (
                    <div 
                        className="modal-item" 
                        key={generateId()}
                        onClick={() => handleInsertaGasto(item)}
                    >
                        <img 
                            src={item.img} 
                            alt={item.gasto} 
                            title={item.gasto}
                        />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ModalGastoDefault