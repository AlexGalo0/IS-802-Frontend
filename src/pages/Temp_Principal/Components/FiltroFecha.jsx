import { useState, useEffect } from "react";

export const FiltroFecha = ({onSelectFecha}) => {

const seleccionFecha=(event)=>{
  const fechaSeleccionada = event.target.value
  onSelectFecha(fechaSeleccionada)
}

      return (
        <select onChange={seleccionFecha}>
          <option value="" hidden>Selecciona una fecha</option>
          <option value="last7days">Últimos 7 Dias</option>
          <option value="last15days">Ultimos 15 Dias</option>
          <option value="last20days">Ultimos 20 Dias</option>
          <option value="last30days">Ultimos 30 Dias</option>
        </select>
      );
};