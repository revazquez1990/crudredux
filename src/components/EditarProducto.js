import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  editarProductoAction } from '../actions/productoActions';
import { useHistory } from 'react-router-dom';

export default function EditarProducto() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio : ''
    });

    const productoeditar = useSelector(state => state.productos.productoeditar);

    // Llenar el state
    useEffect( () => {
        guardarProducto(productoeditar);
        
    }, [productoeditar]);

    const {nombre, precio} = producto;


    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value

        })
    }

    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch(editarProductoAction(producto));
        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>
                                    Nombre Producto
                                </label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    placeholder="Nombre del Producto" 
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label> Precio del Producto</label>
                                <input 
                                    type="number"
                                    className="form-control" 
                                    placeholder="Precio del Producto" 
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                GUARDAR CAMBIOS
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
