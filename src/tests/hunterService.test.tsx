import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createHunter, deleteHunter, getAllHunters, Hunter } from "../services/hunterService";

const mock = new MockAdapter(axios);

describe("hunterService", () => {
  const mockHunters: Hunter[] = [
    { nombre: "Gon", edad: 12, altura_cm: 154, peso_kg: 45, imagen: "", habilidad: "Adivinación", tipoNen: "Enhancer" },
    { nombre: "Killua", edad: 12, altura_cm: 150, peso_kg: 40, imagen: "", habilidad: "Electricidad", tipoNen: "Transmuter" },
  ];

  afterEach(() => {
    mock.reset();
  });

  xtest("debería obtener todos los hunters", async () => {
    mock.onGet("https://apimobile-sjrq.onrender.com/api/hunters")
      .reply(200, mockHunters);

    const hunters = await getAllHunters();
    expect(hunters).toHaveLength(2);
    expect(hunters[0].nombre).toBe("Gon");
  });

  test("debería crear un nuevo hunter", async () => {
    const newHunter: Hunter = {
      nombre: "Leorio",
      edad: 19,
      altura_cm: 180,
      peso_kg: 75,
      imagen: "",
      habilidad: "Medicina",
      tipoNen: "Emitter",
    };
    mock.onPost("https://apimobile-sjrq.onrender.com/api/hunters", newHunter)
      .reply(201, newHunter);

    const created = await createHunter(newHunter);

    expect(created.nombre).toBe("Leorio");
  });

  test("debería eliminar un hunter", async () => {
    mock.onDelete("https://apimobile-sjrq.onrender.com/api/hunters/1")
      .reply(200, { message: "Eliminado correctamente" });

    const res = await deleteHunter("1");
    expect(res.message).toBe("Eliminado correctamente");
  });
});
