import React from 'react'

export const Carrousel = () => {
  return (
    <div className="container-fluid">
    <div className="row">
        <div className="d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block col-lg-7 col-xl-8 p-0">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src='src\pages\Login\img\img1.jpg' className="d-block w-100" alt="..." width="930px" height="930px"/>
                    </div>
                    <div className="carousel-item">
                        <img src="src\pages\Login\img\img2.jpg" className="d-block w-100" alt="..." width="930px" height="930px"/>
                    </div>
                    <div className="carousel-item">
                        <img src="src\pages\Login\img\img3.jpg" className="d-block w-100" alt="..." width="930px" height="930px"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
    </div>
  )
}
