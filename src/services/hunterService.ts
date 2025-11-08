import axios from "axios";

const API_URL = "https://apimobile-sjrq.onrender.com/api/hunters";

export interface Hunter {
  _id?: string;
  nombre: string;
  edad: number;
  altura_cm: number;
  peso_kg: number;
  imagen: string;
  habilidad: string;
  tipoNen: string;
}

export const getAllHunters = async (): Promise<Hunter[]> => {
  try {
    const response = await axios.get<Hunter[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo todos los hunters:", error);
    throw error;
  }
};

export const getHunterByName = async (nombre: string): Promise<Hunter> => {
  try {
    const response = await axios.get<Hunter>(`${API_URL}/${nombre}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el hunter ${nombre}:`, error);
    throw error;
  }
};

export const createHunter = async (hunterData: Hunter): Promise<Hunter> => {
  try {
    const response = await axios.post<Hunter>(API_URL, hunterData);
    return response.data;
  } catch (error) {
    console.error("Error creando el hunter:", error);
    throw error;
  }
};

export const updateHunter = async (name: string, hunterData: Hunter): Promise<Hunter> => {
  try {
    const response = await axios.put<Hunter>(`${API_URL}/${name}`, hunterData);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando el hunter ${name}:`, error);
    throw error;
  }
};

export const deleteHunter = async (name: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(`${API_URL}/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando el hunter ${name}:`, error);
    throw error;
  }
};
