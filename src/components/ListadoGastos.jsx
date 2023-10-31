import { useState, useEffect } from "react"
import { FormatearCantidad } from "../helpers"
import Gasto from "./Gasto"

const ListadoGastos = ({
  gastos, 
  setGastoEditar, 
  eliminarGasto,
  filtro,
  gastosFiltrados,
  settings,
  setEnvioHabilitado

}) => {
  const [gatadoFiltro, setGastadoFiltro] = useState(0)

  useEffect( () => {
    const totalGastadoFiltro = gastosFiltrados.reduce((total, gasto) => gasto.cantidad + total, 0)
    setGastadoFiltro(totalGastadoFiltro)
  }, [gastosFiltrados])

  const displayedGastos = filtro ? gastosFiltrados : gastos;

  return (
    <div className="listado-gastos contenedor">

      <h2>
        {filtro ? gastosFiltrados.length 
          ? "Gastos -> Total: " + FormatearCantidad(gatadoFiltro, settings.moneda)
          : "No hay gastos en esta categoría"
          : gastos.length
          ? "Gastos"
          : "No hay gastos aún"
        }
      </h2>

        {displayedGastos.map( gasto => (
            <Gasto 
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                settings={settings}
                setEnvioHabilitado={setEnvioHabilitado}
            />
        ))}

    </div>
  )
}

export default ListadoGastos