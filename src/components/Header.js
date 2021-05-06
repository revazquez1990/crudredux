import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary jusitify-content-between">
          <div className="container">
            <h1>
                <Link to={'/'} className="text-light">
                    CURD -React, Redux, REST API & Axios
                </Link>
            </h1>
          </div>

          <Link to={'/productos/nuevos'} className="btn btn-danger nuevo-post d-block d-md-inline-block">
              Agregar Producto +
          </Link>
      </nav>
    )
}
