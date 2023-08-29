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
  };

  return fechaNUeva.toLocaleDateString("es-ES", opciones);
};

export const FormatearCantidad = (cantidad) => {
  return cantidad.toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
  });
};