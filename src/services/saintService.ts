import axios from "axios";

const API_URL_ME = "https://apimobile-sjrq.onrender.com/api/saints";

export interface SaintResponse {
  id: string;
  name: string;
  constellation: string;
  armorType: string;
  powerLevel: number;
  guardianGod: string;
  imageUrl: string;
}

export const getSaintByName = async (
  name: string
): Promise<SaintResponse | { error: string }> => {
  try {
    const response = await axios.get(`${API_URL_ME}/${name}`);
    const data = Array.isArray(response.data)
      ? response.data[0]
      : response.data;

    if (!data) {
      return { error: "No se encontró información para ese caballero." };
    }
    return {
      id: data.id,
      name: data.name,
      constellation: data.constellation,
      armorType: data.armorType,
      powerLevel: data.powerLevel,
      guardianGod: data.guardianGod,
      imageUrl: data.imageUrl,
    };
  } catch (error: any) {
    let errorMsg = error.response.data.message
    return { error: errorMsg ? errorMsg : "Error desconocido al obtener el caballero." };
  }
};

export const getAllSaints = async (): Promise<SaintResponse[] | { error: string }> => {
  try {
    const response = await axios.get(API_URL_ME);
    const data = response.data;

    if (!data || data.length === 0) {
      return { error: "No se encontraron caballeros." };
    }

    return data.map((s: any) => ({
      id: s.id,
      name: s.name,
      constellation: s.constellation,
      armorType: s.armorType,
      powerLevel: s.powerLevel,
      guardianGod: s.guardianGod,
      imageUrl: s.imageUrl,
    }));
  } catch (error: any) {
    const errorMsg = error.response?.data?.message;
    return { error: errorMsg ? errorMsg : "Error desconocido al obtener los caballeros." };
  }
};
