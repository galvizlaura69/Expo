import axios from "axios";
import { getAnimalByName } from "../services/animalService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getAnimalByName", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("devuelve los datos correctos desde la API pública (TheCatAPI)", async () => {
    const mockResponse = {
      data: [
        {
          name: "Bengal",
          origin: "United States",
          description: "Gato de aspecto salvaje.",
          temperament: "Activo, Inteligente",
          life_span: "12 - 16",
          reference_image_id: "abc123",
        },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);
    const result = await getAnimalByName("Bengal", false);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.thecatapi.com/v1/breeds/search?q=Bengal"
    );

    expect(result).toEqual({
      name: "Bengal",
      origin: "United States",
      description: "Gato de aspecto salvaje.",
      temperament: "Activo, Inteligente",
      life_span: "12 - 16",
      image: "https://cdn2.thecatapi.com/images/abc123.jpg",
    });
  });
  test("devuelve un error si la API pública no encuentra el animal (sin resultados)", async () => {
    const mockResponse = { data: [] };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await getAnimalByName("Desconocido", false);

    expect(result).toEqual({
      error: "No se encontró información para ese animal.",
    });
  });
  test("devuelve los datos correctos desde la API local (useMine = true)", async () => {
    const mockResponse = {
      data: {
        name: "Bengal",
        origin: "Asia",
        description: "Gran felino salvaje.",
        image: "Bengal1234.jpg",
        temperament: "Activo, Inteligente",
        life_span: "12 - 16",
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);
    const result = await getAnimalByName("Bengal", true);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:3001/animal/Bengal"
    );

    expect(result).toEqual({
      name: "Bengal",
      origin: "Asia",
      description: "Gran felino salvaje.",
      temperament: "Activo, Inteligente",
      life_span: "12 - 16",
      image: "http://localhost:3001/images/Bengal1234.jpg",
    });
  });
});
