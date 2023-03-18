export function comprobarEdad(fecha) {
    const fechaActual = new Date();
    const fechaIngresada = new Date(fecha);
  
    // Verificar si la fecha es válida
    if (isNaN(fechaIngresada.getTime())) {
      return false;
    }
  
    // Verificar si la fecha es futura
    if (fechaIngresada.getTime() > fechaActual.getTime()) {
      return false;
    }
  
    return true;
}