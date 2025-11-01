import axios from "axios";

const API_URL = "https://api.thecatapi.com/v1/breeds/search?q=";
const API_URL_Me = "http://localhost:3001/animal/";

export interface AnimalResponse {
  name: string;
  temperament?: string;
  origin: string;
  life_span?: string;
  description: string;
  image?: string;
  reference_image_id?: string;
}

export const getAnimalByName = async (
  name: string,
  useMine: boolean
): Promise<AnimalResponse | { error: string }> => {
  try {
    const baseUrl = useMine ? API_URL_Me : API_URL;
    const response = await axios.get(`${baseUrl}${name}`);
    const data = Array.isArray(response.data)
      ? response.data[0]
      : response.data;

    if (!data) {
      return { error: "No se encontró información para ese animal." };
    }

    const imageUrl = useMine
      ? data.image
        ? `http://localhost:3001/images/${data.image}`
        : undefined
      : data.reference_image_id
        ? `https://cdn2.thecatapi.com/images/${data.reference_image_id}.jpg`
        : undefined;
    return {
      name: data.name,
      origin: data.origin,
      description: data.description,
      temperament: data.temperament,
      life_span: data.life_span,
      image: imageUrl,
    };
  } catch (error) {
    let errorMsg = "Error desconocido al obtener el animal.";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMsg = ` ${error.response.data?.message || "Sin mensaje"}`;
      } else if (error.request) {
        errorMsg = "No se recibió respuesta del servidor.";
      } else {
        errorMsg = `Error en la solicitud: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMsg = error.message;
    }
    return { error: errorMsg };
  }
};
