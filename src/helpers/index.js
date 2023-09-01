export const generateId = () => {
  const random = Math.random().toString(36).substr(2);
  const fecha = Date.now().toString(36);

  return random + fecha;
};

export const formatearFecha = (fecha) => {
  const fechaNUeva = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric", // Añadir la hora
    minute: "numeric", // Añadir los minutos
    hour12: true, // Configurar para usar formato de 12 horas (am/pm)
  };

  return fechaNUeva.toLocaleDateString("es-ES", opciones);
};

export const FormatearCantidad = (cantidad, moneda) => {
  const opciones = {
    style: "currency",
    currency: moneda === "usd" ? moneda : "COP",
    minimumFractionDigits: 0, // Sin decimales
    maximumFractionDigits: 0, // Sin decimales
    useGrouping: true, // Para usar puntos en miles y millones
  };

  return cantidad.toLocaleString("en-US", opciones).replace(/,/g, ".");
};
