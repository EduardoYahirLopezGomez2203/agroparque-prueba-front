import { useState } from 'react';
import { useCallback } from 'react';
import apiService from '../services/ApiService';

const useServiceAuth = () => {
	const [datos, setDatos] = useState(null);
	const [error, setError] = useState(null);
	const [cargando, setCargando] = useState(false);
	const [cargado, setCargado] = useState(false);

	//MODIFICACIÓN: Se realiza un memoizado con el fin de evitar que se recreen varias llamadas a la API y necesarias
	const obtenerDatos = useCallback(async (type, URL, params, headers = {}) => {
		//NOTA: Se tiene una llamada de useCallBack junto con un async con el fin de que la tarea de consumo se quede proceso de espera antes de seguir ejecutando
		try {
			setError(null)
			setCargando(true);
			const data = await apiService.consume(type, URL, params, headers);
			setDatos(data);
			setCargado(true);
		} catch (error) {
			setError(error.message);
		} finally {
			setCargando(false);
		}
	}, []);
	// MODIFICACIÓN: Dependencias vacías para que no se recree

	return { datos, error, cargando, obtenerDatos, cargado };
};

export default useServiceAuth;
