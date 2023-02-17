import React from 'react'

export const Form = () => {
  return (
    <div id="columna2" className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 p-0 d-flex flex-column justify-content-center align-items-center">
            <h1 className="mt-auto">Iniciar sesión</h1>
            <form action="" className="form-control w-75 m-4">
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" id="inputUser" placeholder="Ingrese su correo electrócnico"/>
                </div>
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <label  className="form-label">Contraseña</label>
                        <a href="#">¿Haz olvidado tu contraseña?</a>
                    </div>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Ingrese su contraseña"/>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <button className="btn btn-success ">Iniciar sesión</button>
                </div>
            </form>
           
        </div>
  )
}
