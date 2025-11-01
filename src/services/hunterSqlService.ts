import axios from "axios";

const API_URL = "https://apimobile-sjrq.onrender.com/api/hunters-sql";

export interface HunterSql {
  id: number;
  nombre: string;
  edad: number;
  altura_cm: number;
  peso_kg: number;
  imagen: string;
  habilidad: string;
  tiponen: string;
}

export const getAllHuntersSql = async (): Promise<HunterSql[]> => {
  try {
    const response = await axios.get<HunterSql[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo todos los hunters SQL:", error);
    throw error;
  }
};

export const getHunterSqlByName = async (name: string): Promise<HunterSql> => {
  try {
    const response = await axios.get<HunterSql>(`${API_URL}/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el hunter SQL ${name}:`, error);
    throw error;
  }
};

export const createHunterSql = async (hunterData: HunterSql): Promise<HunterSql> => {
  try {
    const response = await axios.post<HunterSql>(API_URL, hunterData);
    return response.data;
  } catch (error) {
    console.error("Error creando el hunter SQL:", error);
    throw error;
  }
};

export const updateHunterSql = async (id: number, hunterData: HunterSql): Promise<HunterSql> => {
  try {
    const response = await axios.put<HunterSql>(`${API_URL}/${id}`, hunterData);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando el hunter SQL ${id}:`, error);
    throw error;
  }
};

export const deleteHunterSql = async (id: number): Promise<{ msg: string }> => {
  try {
    const response = await axios.delete<{ msg: string }>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando el hunter SQL ${id}:`, error);
    throw error;
  }
};
