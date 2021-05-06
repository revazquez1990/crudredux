import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    DESCARGA_PRODUCTOS_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS, 
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR, 
    PRODUCTO_ELIMINADO_ERROR, 
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos Productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() );
        
        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto)
            // Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));
            // Alerta !!! 
            Swal.fire(
                'Correcto',
                'El producto se agrego corectamente !!!',
                'success'
            )
        } catch(error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error intente de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// Si el producto se guarda en la BD
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// Si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargaProductos() );

        try {
            setTimeout(async() => {
                const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data) );
            }, 500);
            
        } catch (error) {
            dispatch( descargaProductosError() )
        }
    }
    
}

const descargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
}); 

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            // Si se elimina, mostrar alerta
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
        } catch (error) {
            dispatch(eliminarProductoError());
        }
    }
}
const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});
const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// Colocar el producto en edicion
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) );
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la BD
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto());

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            
        }
    }
}
const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})