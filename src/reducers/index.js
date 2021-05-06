import { combineReducers } from 'redux';
import productosReducers from './productosReducer';
import alertaReducers from './alertaReducer';



export default combineReducers({
    productos: productosReducers,
    alerta: alertaReducers
});