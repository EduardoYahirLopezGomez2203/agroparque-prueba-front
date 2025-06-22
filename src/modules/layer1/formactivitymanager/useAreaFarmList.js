// src/hooks/useAreaList.js
import { useEffect, useState, useCallback } from "react";
import useServiceAuth from "../../../hooks/useServiceAuth";
import config from "../../../config";

const useAreaFarmList = () => {
  const { obtenerDatos, datos, error, cargando } = useServiceAuth();
  const [areas, setAreas] = useState([]);

  const handleList = useCallback(
    (filters = {}) => {
      setAreas([]); 
      const baseUrl = config[process.env.REACT_APP_ENV].API_URL_farm_detail_list;
      const fincaId = filters.id_finca;
      if (!fincaId) {
        return; 
      }
      const url = baseUrl.replace("?", fincaId);
      obtenerDatos("GET", url);
    },
    [obtenerDatos]
  );


  useEffect(() => {
    if (error) {
      console.error("Error cargando áreas:", error);
      setAreas([]);       
      return;
    }
    if (Array.isArray(datos?.data)) {
      
      const lista = datos.data.map(item => ({ id: item.area.id, nombre: item.area.nombre }));
      setAreas([...new Map(lista.map(a => [a.id, a])).values()]);
    } else {
      setAreas([]);
    }
  }, [datos, error]);


  return { handleList, areas, error, cargando };
};

export default useAreaFarmList;
