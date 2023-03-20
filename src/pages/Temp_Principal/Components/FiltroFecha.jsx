import { useState, useEffect } from "react";

export const FiltroFecha = (props) => {
    function handleClick(event) {
        const nuevaPeticion = event.target.name;
        const nuevaCantidadDeDias = {
          semana: false,
          mes: false,
          tres_meses: false,
          seis_meses: false,
          anio: false,
          [nuevaPeticion]: true,
        };
        props.actualizarCantidadDeDias(nuevaCantidadDeDias);
       
      }

      return (
        <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
          <button name="semana" onClick={handleClick} className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
            <span className="box">Hace 7 días</span>
          </button>
          <button name="mes" onClick={handleClick} className="buttonProducto" style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
          <span className="box">Hace 30 días</span>
          </button>
          <button name="tres_meses" onClick={handleClick} className="buttonProducto" style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
          <span className="box">Hace 3 meses</span>
          </button>
          <button name="seis_meses" onClick={handleClick} className="buttonProducto" style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
          <span className="box">Últimos 6 meses</span>
          </button>
          <button name="anio" onClick={handleClick} className="buttonProducto" style={{ color: "#f7f7f7", fontSize: "medium", margin: 'auto'}}>
          <span className="box">Últimos año</span>
          </button>
        </div>
      );
};
