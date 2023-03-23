import { useState, useEffect } from "react";

export const FiltroFecha = ({ onSelectFecha }) => {
  const seleccionFecha = (event) => {
    const fechaSeleccionada = event.target.value;
    onSelectFecha(fechaSeleccionada);
  };

  return (
    <select onChange={seleccionFecha} className="select">
      <option value="" hidden>
        Selecciona una fecha
      </option>
      <option value="last7days">Últimos 7 Dias</option>
      <option value="last15days">Ultimos 15 Dias</option>
      <option value="last20days">Ultimos 20 Dias</option>
      <option value="last30days">Ultimos 30 Dias</option>
    </select>

    /* Filtros con botones */

    /* <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
<button name="semana" onClick={handleClick} className="buttonProducto"
            style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
  Hace 7 días
</button>
<button name="mes" onClick={handleClick} className="buttonProducto"
            style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
  Hace 30 días
</button>
<button name="tres_meses" onClick={handleClick} className="buttonProducto"
            style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
  Hace 3 meses
</button>
<button name="seis_meses" onClick={handleClick} className="buttonProducto"
            style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
  Últimos 6 meses
</button>
<button name="anio" onClick={handleClick} className="buttonProducto"
            style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
  Último año
</button>
</div> */
  );
};
