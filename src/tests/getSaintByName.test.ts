import { jest } from "@jest/globals";
import axios from "axios";
import { getSaintByName, SaintResponse } from "../services/saintService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getSaintByName", () => {
    const mockSaint: SaintResponse = {
        id: "1",
        name: "Seiya",
        constellation: "Pegaso",
        armorType: "Bronce",
        powerLevel: 8500,
        guardianGod: "Atenea",
        imageUrl: "https://example.com/seiya.png",
    };

    afterEach(() => {
        jest.clearAllMocks();
    });
    test("debe retornar los datos del caballero cuando la API responde 200", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            status: 200,
            data: mockSaint,
        });
        const result = await getSaintByName("Seiya");

        expect(result).toEqual(mockSaint);
        expect(mockedAxios.get).toHaveBeenCalledWith("https://apimobile-sjrq.onrender.com/api/saints/Seiya");
    });

    test("debe retornar un error cuando la API responde con 500", async () => {
        const axiosError = {
            isAxiosError: true,
            response: {
                status: 500,
                data: { message: "Error desconocido al obtener el caballero." },
            },
        };

        mockedAxios.get.mockRejectedValueOnce(axiosError);

        const result = await getSaintByName("Shiryu");

        expect(result).toEqual({ error: "Error desconocido al obtener el caballero." });
        expect(mockedAxios.get).toHaveBeenCalledWith(
            "https://apimobile-sjrq.onrender.com/api/saints/Shiryu"
        );
    });

    test("debe retornar un error cuando la API responde con 404", async () => {
        const axiosError = {
            isAxiosError: true,
            response: {
                status: 404,
                data: { message: "Caballero no encontrado." }
            },
        };

        mockedAxios.get.mockRejectedValueOnce(axiosError);

        const result = await getSaintByName("Shiryu");

        expect(result).toEqual({ error: "Caballero no encontrado." });
        expect(mockedAxios.get).toHaveBeenCalledWith(
            "https://apimobile-sjrq.onrender.com/api/saints/Shiryu"
        );
    });
    test("debe retornar error si no se encuentra información en la respuesta", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            status: 200,
            data: [],
        });

        const result = await getSaintByName("Ikki");

        expect(result).toEqual({
            error: "No se encontró información para ese caballero.",
        });
        expect(mockedAxios.get).toHaveBeenCalledWith(
            "https://apimobile-sjrq.onrender.com/api/saints/Ikki"
        );
    });

});
