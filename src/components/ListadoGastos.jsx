import { useState, useEffect } from "react"
import { FormatearCantidad } from "../helpers"
import Gasto from "./Gasto"

const ListadoGastos = ({
  gastos, 
  setGastoEditar, 
  eliminarGasto,
  filtro,
  gastosFiltrados,
  settings

}) => {
  const [gatadoFiltro, setGastadoFiltro] = useState(0)

  useEffect( () => {
    const totalGastadoFiltro = gastosFiltrados.reduce((total, gasto) => gasto.cantidad + total, 0)
    setGastadoFiltro(totalGastadoFiltro)
  }, [gastosFiltrados])

  return (
    <div className="listado-gastos contenedor">

      {
        filtro ? (
          <>
            <h2>{gastosFiltrados.length ? 'Gastos -> Total: ' + FormatearCantidad(gatadoFiltro, settings.moneda) : 'No hay gastos en esta categoría'}</h2>

            {gastosFiltrados.map( gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    settings={settings}
                />
            ))}
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>

            {gastos.map( gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    settings={settings}
                />
            ))}
          </>
        )
      }

    </div>
  )
}

export default ListadoGastos