import React from 'react';
import { useHistory } from 'react-router-dom';
import {  borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


export default function Producto({producto}) {

    const {nombre, precio, id} = producto;

    const history = useHistory();
    const dispatch = useDispatch();
    // Confirmar si desea eliminar el producto
    const confirmarEliminarProducto = id => {
        // preguntar al usuario
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancel: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                // pasarlo al action
                dispatch(borrarProductoAction(id));
              
            }
          })
        
    }

    // funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`)
    }
    return (
        <tr>
            <td>{nombre}</td>
            <td> <span className="font-weight-bold"> $ {precio}</span> </td>
            <td className="acciones">
                <button 
                    className="btn btn-primary mr-2"
                    type="button"
                    onClick={ ()=> redireccionarEdicion(producto)}    
                >
                    Editar
                </button>
                <button className="btn btn-danger" type="button" onClick={() => confirmarEliminarProducto(id)}>
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
