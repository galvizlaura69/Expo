import axios from "axios";
import { getAllSaints } from "../services/saintService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getAllSaints (async/await)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debería devolver una lista de caballeros correctamente", async () => {
    const mockSaints = [
      {
        id: "1",
        name: "Seiya",
        constellation: "Pegaso",
        armorType: "Bronce",
        powerLevel: 9000,
        guardianGod: "Atenea",
        imageUrl: "https://example.com/seiya.jpg",
      },
      {
        id: "2",
        name: "Shiryu",
        constellation: "Dragón",
        armorType: "Bronce",
        powerLevel: 8500,
        guardianGod: "Atenea",
        imageUrl: "https://example.com/shiryu.jpg",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockSaints });

    const result = await getAllSaints();

    expect(Array.isArray(result)).toBe(true);
    expect((result as any[]).length).toBe(2);
    expect((result as any[])[0].name).toBe("Seiya");
  });

  test("debería devolver error si no hay caballeros", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    const result = await getAllSaints();

    expect(result).toHaveProperty("error");
    expect((result as any).error).toMatch(/No se encontraron caballeros/);
  });

  test("debería manejar errores del servidor con mensaje específico", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { data: { message: "Error del servidor" } },
    });

    const result = await getAllSaints();

    expect(result).toHaveProperty("error");
    expect((result as any).error).toBe("Error del servidor");
  });

  test("debería manejar errores desconocidos correctamente", async () => {
    mockedAxios.get.mockRejectedValueOnce({});

    const result = await getAllSaints();

    expect(result).toHaveProperty("error");
    expect((result as any).error).toBe("Error desconocido al obtener los caballeros.");
  });
  
});
