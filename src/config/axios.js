import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://localhost:4002/'
})

export default clienteAxios;